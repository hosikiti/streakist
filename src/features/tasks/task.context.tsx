import React, { useState } from 'react';
import { createContext, useContext } from 'react';
import { Task } from './task.types';
import { getCurrentDate } from '../../utils/date';

export interface TaskStore {
    currentDate: string;
    tasks: Task[];
    addTask: (task: Task) => void;
    toggleDone: (taskId: string) => void;
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
            },
            {
                id: '2',
                title: 'HackerRank',
                completeHistory: [],
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
    };

    const [taskStore, setTaskStore] = useState<TaskStore>(defaultTaskStore);

    return (
        <TaskContext.Provider value={taskStore}>
            {children}
        </TaskContext.Provider>
    );
};
