import { useMemo } from 'react';
import { parseDate } from '../../../utils/date';
import { Task, TrackingType } from '../task.types';

export const useIsTrackableDay = (task: Task, currentDate: string) => {
    return useMemo(() => {
        const currentDay = parseDate(currentDate).getDay();
        if (task.trackingType === TrackingType.Weekly) {
            return true;
        }
        return task.trackingOptions.dailyTrackingDays?.includes(currentDay);
    }, [
        currentDate,
        task.trackingType,
        task.trackingOptions.dailyTrackingDays,
    ]);
};
