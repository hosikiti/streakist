import { useMemo } from 'react';
import { Task, TrackingType } from '../task.types';
import { DaysShortLabel } from '../../../utils/date';

export const useTaskTrackingDescription = (task: Task) => {
    return useMemo(() => {
        const weeklyFrequency =
            task.trackingOptions?.weeklyTrackingFrequency || 0;
        if (task.trackingType === TrackingType.Daily) {
            const trackingDays = task.trackingOptions.dailyTrackingDays || [];

            if (trackingDays.length === 7) {
                return 'Every day';
            }

            const trackingDayLabels = trackingDays.map(
                (day) => DaysShortLabel[day]
            );

            return `on ${trackingDayLabels.join(', ')}`;
        } else {
            return weeklyFrequency === 1
                ? 'Once a week'
                : `${weeklyFrequency} times a week`;
        }
    }, [task]);
};
