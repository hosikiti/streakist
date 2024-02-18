import { renderHook } from '@testing-library/react';
import { useTaskTrackingDescription } from './useTaskTrackingDescription';
import { Task, TrackingType } from '../task.types';
import { Days } from '../../../utils/date';

describe('useTaskTrackingDescription', () => {
    const executeHook = (task: Task) => {
        return renderHook(() => useTaskTrackingDescription(task)).result;
    };

    it('should return the correct description for a task to do once a week', () => {
        const task: Task = {
            id: '1',
            title: 'Test task',
            trackingType: TrackingType.Weekly,
            trackingOptions: {
                weeklyTrackingFrequency: 1,
            },
            completeHistory: [],
        };

        const result = executeHook(task);

        expect(result.current).toBe('Once a week');
    });

    it('should return the correct description for a task to do more than once a week', () => {
        const task: Task = {
            id: '1',
            title: 'Test task',
            trackingType: TrackingType.Weekly,
            trackingOptions: {
                weeklyTrackingFrequency: 3,
            },
            completeHistory: [],
        };

        const result = executeHook(task);

        expect(result.current).toBe('3 times a week');
    });

    it('should return the correct description for a task to do every day', () => {
        const task: Task = {
            id: '1',
            title: 'Test task',
            trackingType: TrackingType.Daily,
            trackingOptions: {
                dailyTrackingDays: [
                    Days.Monday,
                    Days.Tuesday,
                    Days.Wednesday,
                    Days.Thursday,
                    Days.Friday,
                    Days.Saturday,
                    Days.Sunday,
                ],
            },
            completeHistory: [],
        };

        const result = executeHook(task);

        expect(result.current).toBe('Every day');
    });

    it('should return the correct description for a task to do on specific days', () => {
        const task: Task = {
            id: '1',
            title: 'Test task',
            trackingType: TrackingType.Daily,
            trackingOptions: {
                dailyTrackingDays: [Days.Sunday, Days.Tuesday, Days.Thursday],
            },
            completeHistory: [],
        };

        const result = executeHook(task);

        expect(result.current).toBe('on Sun, Tue, Thu');
    });
});
