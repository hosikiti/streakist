import { useMemo } from 'react';
import { getStreak } from '../task.utils';
import { Task } from '../task.types';

export const useStreak = (task: Task, currentDate: string) => {
    return useMemo(() => getStreak(task, currentDate), [task, currentDate]);
};
