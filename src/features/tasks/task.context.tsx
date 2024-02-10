import React from 'react';
import { createContext, useContext } from 'react';
import { Task, TrackingType } from './task.types';
import { formatDate, getCurrentDate } from '../../utils/date';
import { getDailyStreak, getWeeklyStreak } from '../../utils/streak';
import { usePersistentState } from '../../hooks/usePersistentState';

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
        tasks: [],
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
            const dailyTrackingDays =
                task.trackingOptions.dailyTrackingDays || [];
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
        },
    };

    const [taskStore, setTaskStore] = usePersistentState<TaskStore>(
        'task',
        defaultTaskStore
    );

    return (
        <TaskContext.Provider value={taskStore}>
            {children}
        </TaskContext.Provider>
    );
};
