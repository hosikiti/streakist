import { useMemo } from 'react';
import { Task, TrackingType } from '../task.types';
import { getDailyStreak, getWeeklyStreak } from '../../../utils/streak';

export const useStreak = (task: Task, currentDate: string) => {
    return useMemo(() => {
        const history = task.completeHistory;
        const dailyTrackingDays = task.trackingOptions.dailyTrackingDays || [];
        const weeklyTrackingFrequency =
            task.trackingOptions.weeklyTrackingFrequency || 0;

        if (task.trackingType === TrackingType.Daily) {
            return getDailyStreak(history, currentDate, dailyTrackingDays);
        } else {
            return getWeeklyStreak(
                history,
                currentDate,
                weeklyTrackingFrequency
            );
        }
    }, [task, currentDate]);
};
