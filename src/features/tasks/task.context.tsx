import React, { useState } from 'react';
import { createContext, useContext } from 'react';
import { Task, TrackingType } from './task.types';
import { Days, formatDate, getCurrentDate } from '../../utils/date';
import { getDailyStreak, getWeeklyStreak } from '../../utils/streak';

export interface TaskStore {
    currentDate: string;
    tasks: Task[];
    addTask: (task: Task) => void;
    toggleDone: (taskId: string) => void;
    setCurrentDate: (date: Date) => void;
    getStreak: (task: Task, currentDate: string) => number;
}

export const TaskContext = createContext<TaskStore | undefined>(undefined);

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};

type TaskContextProviderProps = {
    children: React.ReactNode;
};

export const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
    const defaultTaskStore: TaskStore = {
        currentDate: getCurrentDate(),
        tasks: [
            {
                id: '1',
                title: 'LeetCode',
                completeHistory: [],
                trackingType: TrackingType.Daily,
                trackingOptions: {
                    dailyTrackingDays: [
                        Days.Monday,
                        Days.Wednesday,
                        Days.Friday,
                    ],
                },
            },
            {
                id: '2',
                title: 'HackerRank',
                completeHistory: [],
                trackingType: TrackingType.Weekly,
                trackingOptions: {
                    weeklyTrackingFrequency: 2,
                },
            },
        ],
        addTask: (task: Task) => {
            setTaskStore((prev) => ({
                ...prev,
                tasks: [...prev.tasks, task],
            }));
        },
        toggleDone: (taskId: string) => {
            setTaskStore((prev) => ({
                ...prev,
                tasks: prev.tasks.map((task) => {
                    if (task.id !== taskId) return task;

                    const doneDate = prev.currentDate;
                    const isDone = task.completeHistory.includes(doneDate);
                    if (isDone) {
                        // Remove the date from the complete history
                        return {
                            ...task,
                            completeHistory: task.completeHistory.filter(
                                (date) => date !== doneDate
                            ),
                        };
                    } else {
                        // Add the date to the complete history
                        const newHistory = [...task.completeHistory, doneDate];
                        newHistory.sort(); // Sort the history to make it easier to check streaks
                        return {
                            ...task,
                            completeHistory: newHistory,
                        };
                    }
                }),
            }));
        },
        setCurrentDate: (date: Date) => {
            setTaskStore((prev) => ({
                ...prev,
                currentDate: formatDate(date),
            }));
        },
        getStreak: (task: Task, currentDate: string) => {
            const history = task.completeHistory;
            if (
                history.length === 0 ||
                !task.trackingOptions.dailyTrackingDays ||
                !task.trackingOptions.weeklyTrackingFrequency
            )
                return 0;

            if (task.trackingType === TrackingType.Daily) {
                return getDailyStreak(
                    history,
                    currentDate,
                    task.trackingOptions.dailyTrackingDays
                );
            } else {
                return getWeeklyStreak(
                    history,
                    currentDate,
                    task.trackingOptions.weeklyTrackingFrequency
                );
            }
        },
    };

    const [taskStore, setTaskStore] = useState<TaskStore>(defaultTaskStore);

    return (
        <TaskContext.Provider value={taskStore}>
            {children}
        </TaskContext.Provider>
    );
};
