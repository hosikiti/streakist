import { Days, formatDate, parseDate } from './date';
import * as datefns from 'date-fns';

// it can be useful to customize the start of the week as a user preference
const WEEK_START_DAY = Days.Monday;

export const getDailyStreak = (
    history: string[],
    currentDate: string,
    dailyTrackingDays: Days[]
) => {
    if (history.length === 0) return 0;

    const firstDate = parseDate(history[0]);
    let dt = datefns.subDays(parseDate(currentDate), 1); // start from yesterday

    // use a set for faster lookup
    const historySet = new Set(history);
    let streak = 0;

    while (datefns.isAfter(dt, firstDate) || datefns.isSameDay(dt, firstDate)) {
        const day = datefns.getDay(dt);
        // use linear search here because the array is small (7 elements at most)
        if (!dailyTrackingDays.includes(day)) {
            dt = datefns.subDays(dt, 1);
            continue;
        }

        if (!historySet.has(formatDate(dt))) {
            break;
        } else {
            streak++;
        }
        dt = datefns.subDays(dt, 1);
    }

    // if task is done today, add 1 to the streak
    const currentDay = datefns.getDay(parseDate(currentDate));
    if (dailyTrackingDays.includes(currentDay) && historySet.has(currentDate)) {
        streak++;
    }

    return streak;
};

export const getWeeklyStreak = (
    history: string[],
    currentDate: string,
    frequency: number
): number => {
    if (history.length === 0) {
        return 0;
    }

    // count the streak from the last week
    const firstDate = parseDate(history[0]);
    const weekStartDay = datefns.startOfWeek(parseDate(currentDate), {
        weekStartsOn: WEEK_START_DAY,
    });
    let dt = datefns.subDays(weekStartDay, 1); // Start from last week end
    const historySet = new Set(history);
    let streak = 0;

    let currentWeekStreak = 0;
    while (datefns.isAfter(dt, firstDate) || datefns.isSameDay(dt, firstDate)) {
        const day = datefns.getDay(dt);
        currentWeekStreak += historySet.has(formatDate(dt)) ? 1 : 0;
        if (day === WEEK_START_DAY) {
            if (currentWeekStreak >= frequency) {
                streak += currentWeekStreak;
                currentWeekStreak = 0;
            } else {
                break;
            }
        }
        dt = datefns.subDays(dt, 1);
    }
    if (currentWeekStreak >= frequency) {
        streak += currentWeekStreak;
    }

    // count the streak for the current week
    dt = weekStartDay;
    currentWeekStreak = 0;
    let parsedCurrentDate = parseDate(currentDate);
    while (
        datefns.isBefore(dt, parsedCurrentDate) ||
        datefns.isSameDay(dt, parsedCurrentDate)
    ) {
        currentWeekStreak += historySet.has(formatDate(dt)) ? 1 : 0;
        dt = datefns.addDays(dt, 1);
    }

    // if current week streak is greater than or equal to the frequency, add it to the streak
    if (currentWeekStreak >= frequency) {
        streak += currentWeekStreak;
    }

    return streak;
};

export const getCurrentWeekStreak = (
    history: string[],
    currentDate: string
) => {
    const weekStartDay = datefns.startOfWeek(parseDate(currentDate), {
        weekStartsOn: WEEK_START_DAY,
    });
    const historySet = new Set(history);
    const parsedCurrentDate = parseDate(currentDate);
    let dt = weekStartDay;
    let currentWeekStreak = 0;
    while (
        datefns.isBefore(dt, parsedCurrentDate) ||
        datefns.isSameDay(dt, parsedCurrentDate)
    ) {
        currentWeekStreak += historySet.has(formatDate(dt)) ? 1 : 0;
        dt = datefns.addDays(dt, 1);
    }
    return currentWeekStreak;
};
