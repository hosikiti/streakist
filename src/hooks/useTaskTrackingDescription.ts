import { useMemo } from 'react';
import { Task, TrackingType } from '../features/tasks/task.types';
import { DaysShortLabel } from '../utils/date';

export const useTaskTrackingDescription = (task: Task) => {
    return useMemo(() => {
        const weeklyFrequency =
            task.trackingOptions?.weeklyTrackingFrequency || 0;
        if (task.trackingType === TrackingType.Daily) {
            const trackingDays = task.trackingOptions.dailyTrackingDays || [];

            if (trackingDays.length === 7) {
                return 'on Everyday';
            }

            const trackingDayLabels = trackingDays.map(
                (day) => DaysShortLabel[day]
            );

            return `on ${trackingDayLabels.join(', ')}`;
        } else {
            return `${weeklyFrequency} ${
                weeklyFrequency === 1 ? 'time' : 'times'
            } a week`;
        }
    }, [task]);
};
