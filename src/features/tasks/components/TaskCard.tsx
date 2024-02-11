import { CheckCircleIcon, PencilIcon } from '@heroicons/react/24/solid';
import { Task, TrackingType } from '../task.types';
import { useMemo } from 'react';
import React from 'react';
import { getStreak } from '../task.utils';
import { useTaskTrackingDescription } from '../hooks/useTaskTrackingDescription';
import WeeklyProgress from './WeeklyProgress';

type TaskCardProps = {
    task: Task;
    onClick: () => void;
    onClickEdit: () => void;
    currentDate: string;
};

export default function TaskCard({
    task,
    onClick,
    onClickEdit,
    currentDate,
}: TaskCardProps) {
    const isDone = task.completeHistory.includes(currentDate);
    const streak = useMemo(
        () => getStreak(task, currentDate),
        [task, currentDate]
    );
    const showWeeklyProgress = task.trackingType === TrackingType.Weekly;
    const trackingDescription = useTaskTrackingDescription(task);

    return (
        <div className="card w-full glass">
            <div className="card-body flex flex-row justify-between items-center p-4">
                <div className="flex flex-col gap-2">
                    <span className="dark:text-white font-bold text-4xl">
                        {streak}
                    </span>
                    <div className="flex gap-1 w-[30px] flex-wrap">
                        {showWeeklyProgress && (
                            <WeeklyProgress
                                task={task}
                                currentDate={currentDate}
                            />
                        )}
                    </div>
                </div>
                <div className="card-title dark:text-white flex flex-col items-start w-[35%] md:w-[40%]">
                    <span className="line-clamp-2">{task.title}</span>
                    {/* show tracking type info */}
                    <span className="text-xs font-thin">
                        {trackingDescription}
                    </span>
                </div>
                <div className="flex flex-row gap-4">
                    {/* show edit button */}
                    <button onClick={onClickEdit}>
                        <PencilIcon className="h-4 w-4 dark:text-slate-300" />
                    </button>
                    {/* show done button */}
                    <button onClick={onClick}>
                        <CheckCircleIcon
                            className={`h-12 w-12 ${
                                isDone ? 'text-primary' : 'text-slate-300'
                            }`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export const MemoTaskCard = React.memo(TaskCard, (prevProps, nextProps) => {
    if (
        prevProps.task !== nextProps.task ||
        prevProps.currentDate !== nextProps.currentDate
    ) {
        return false;
    }
    return true;
});
