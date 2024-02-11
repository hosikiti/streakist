import { useMemo } from 'react';
import { Task, TrackingType } from '../features/tasks/task.types';
import { parseDate } from '../utils/date';

export const useTrackableTasks = (tasks: Task[], currentDate: string) => {
    return useMemo(() => {
        return tasks.filter((task) => {
            if (task.trackingType === TrackingType.Weekly) {
                return true;
            }
            const currentDay = parseDate(currentDate).getDay();
            const isTrackingDay =
                task.trackingOptions.dailyTrackingDays?.includes(currentDay);
            return isTrackingDay;
        });
    }, [tasks, currentDate]);
};
