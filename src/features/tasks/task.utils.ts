import { getDailyStreak, getWeeklyStreak } from '../../utils/streak';
import { Task, TrackingType } from './task.types';

export const getStreak = (task: Task, currentDate: string) => {
    const history = task.completeHistory;
    const dailyTrackingDays = task.trackingOptions.dailyTrackingDays || [];
    const weeklyTrackingFrequency =
        task.trackingOptions.weeklyTrackingFrequency || 0;

    if (task.trackingType === TrackingType.Daily) {
        return getDailyStreak(history, currentDate, dailyTrackingDays);
    } else {
        return getWeeklyStreak(history, currentDate, weeklyTrackingFrequency);
    }
};
