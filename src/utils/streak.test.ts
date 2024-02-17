import { Days, DaysOfWeek, formatDate, parseDate } from './date';
import {
    getCurrentWeekStreak,
    getDailyStreak,
    getWeeklyStreak,
} from './streak';
import * as datefns from 'date-fns';

const baseDate = parseDate('20240204'); // Sunday
const {
    lastSunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    nextMonday,
} = {
    lastSunday: formatDate(baseDate),
    monday: formatDate(datefns.addDays(baseDate, 1)),
    tuesday: formatDate(datefns.addDays(baseDate, 2)),
    wednesday: formatDate(datefns.addDays(baseDate, 3)),
    thursday: formatDate(datefns.addDays(baseDate, 4)),
    friday: formatDate(datefns.addDays(baseDate, 5)),
    saturday: formatDate(datefns.addDays(baseDate, 6)),
    sunday: formatDate(datefns.addDays(baseDate, 7)),
    nextMonday: formatDate(datefns.addDays(baseDate, 8)),
};

describe('daily streak', () => {
    const trackAllDays = DaysOfWeek;
    const trackWeekends = [Days.Saturday, Days.Sunday];
    const trackMondayWednesdayFriday = [
        Days.Monday,
        Days.Wednesday,
        Days.Friday,
    ];

    test('returns 0 for empty history', () => {
        expect(getDailyStreak([], saturday, trackAllDays)).toBe(0);
    });

    test('does not count history that is after today', () => {
        expect(getDailyStreak([thursday, friday], monday, trackAllDays)).toBe(
            0
        );
    });

    test('returns 1 for 1 day streak', () => {
        expect(getDailyStreak([friday], saturday, trackAllDays)).toBe(1);
    });

    test('returns 1 for 1 day streak done today', () => {
        expect(getDailyStreak([saturday], saturday, trackAllDays)).toBe(1);
    });

    test('returns 2 for 2 days streak', () => {
        expect(getDailyStreak([friday, saturday], sunday, trackAllDays)).toBe(
            2
        );
    });

    test('returns 0 for 0 days streak', () => {
        expect(
            getDailyStreak([friday, saturday], nextMonday, trackAllDays)
        ).toBe(0);
    });

    test('returns 2 for 2 days streak when tracking weekends', () => {
        expect(getDailyStreak([saturday, sunday], sunday, trackWeekends)).toBe(
            2
        );
    });

    test('returns 3 for 3 days streak when tracking monday wednesday friday', () => {
        expect(
            getDailyStreak(
                [monday, wednesday, friday],
                saturday,
                trackMondayWednesdayFriday
            )
        ).toBe(3);
    });

    test('returns 1 for 1 day streak when tracking monday wednesday friday', () => {
        expect(
            getDailyStreak([monday], wednesday, trackMondayWednesdayFriday)
        ).toBe(1);
    });

    test('returns 0 for 0 day streak when tracking monday wednesday friday', () => {
        expect(
            getDailyStreak(
                [tuesday, thursday],
                saturday,
                trackMondayWednesdayFriday
            )
        ).toBe(0);
    });
});

describe('weekly streak', () => {
    test('returns 0 for empty history', () => {
        expect(getWeeklyStreak([], monday, 2)).toBe(0);
    });

    test('does not count history that is after today', () => {
        expect(getWeeklyStreak([thursday, friday], monday, 2)).toBe(0);
    });

    test('returns 2 for 2 days streak when you complete them in the same week', () => {
        expect(getWeeklyStreak([monday, wednesday], friday, 2)).toBe(2);
    });

    test('returns 2 for 2 days streak when you complete them in the same week with one done today', () => {
        expect(getWeeklyStreak([monday, friday], friday, 2)).toBe(2);
    });

    test('returns 0 for 0 days streak when you complete one in the last last week and not in the last week', () => {
        expect(getWeeklyStreak([lastSunday], nextMonday, 1)).toBe(0);
    });

    test('returns 1 for 1 day streak when you complete one in the last week', () => {
        expect(getWeeklyStreak([lastSunday], monday, 1)).toBe(1);
    });

    test('returns 2 for 2 days streak when you complete one in the last week and one in this week', () => {
        expect(getWeeklyStreak([lastSunday, monday], monday, 1)).toBe(2);
    });

    test('increases streaks when you exceed the target frequency', () => {
        expect(getWeeklyStreak([monday, wednesday, friday], sunday, 2)).toBe(3);
    });
});

describe('current week streak', () => {
    test('returns 0 for empty history', () => {
        expect(getCurrentWeekStreak([], monday)).toBe(0);
    });

    test('returns 1 for 1 day streak this week', () => {
        expect(getCurrentWeekStreak([monday], monday)).toBe(1);
    });

    test('returns 3 for 3 days streak this week', () => {
        expect(getCurrentWeekStreak([monday, tuesday, friday], saturday)).toBe(
            3
        );
    });

    test('returns 2 for 2 days streak this week', () => {
        expect(
            getCurrentWeekStreak([lastSunday, tuesday, friday], saturday)
        ).toBe(2);
    });
});
