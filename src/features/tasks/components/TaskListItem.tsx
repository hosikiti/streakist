import { CheckCircleIcon, PencilIcon } from '@heroicons/react/24/solid';
import { Task, TrackingType } from '../task.types';
import { getCurrentWeekStreak } from '../../../utils/streak';
import { DaysShortLabel } from '../../../utils/date';
import { useMemo } from 'react';
import React from 'react';

type TaskItemProps = {
    task: Task;
    isDone: boolean;
    onClick: () => void;
    onClickEdit: () => void;
    streak: number;
    currentDate: string;
};

export default function TaskItem({
    task,
    isDone,
    onClick,
    onClickEdit,
    streak,
    currentDate,
}: TaskItemProps) {
    const showWeeklyProgress = task.trackingType === TrackingType.Weekly;
    const weeklyFrequency = task.trackingOptions?.weeklyTrackingFrequency || 0;
    const currentWeekStreak = showWeeklyProgress
        ? getCurrentWeekStreak(task.completeHistory, currentDate)
        : 0;
    const trackingDescription = useMemo(() => {
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
            return `${weeklyFrequency} times a week`;
        }
    }, [
        task.trackingType,
        task.trackingOptions?.dailyTrackingDays,
        weeklyFrequency,
    ]);

    return (
        <div className="card w-full glass">
            <div className="card-body flex flex-row justify-between items-center p-4">
                <div className="flex flex-col gap-2">
                    <span className="dark:text-white font-bold text-4xl">
                        {streak}
                    </span>
                    <div className="flex gap-1 w-[30px] flex-wrap">
                        {showWeeklyProgress &&
                            new Array(weeklyFrequency)
                                .fill(0)
                                .map((x, i) => (
                                    <div
                                        key={i}
                                        className={`rounded-full ${
                                            i < currentWeekStreak
                                                ? 'dark:bg-white bg-gray-900'
                                                : 'dark:bg-gray-400 bg-gray-300'
                                        } w-1 h-1`}
                                    ></div>
                                ))}
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
                                isDone ? 'text-green-500' : 'text-slate-300'
                            }`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export const MemoTaskItem = React.memo(TaskItem, (prevProps, nextProps) => {
    if (
        prevProps.task !== nextProps.task ||
        prevProps.currentDate !== nextProps.currentDate
    ) {
        return false;
    }
    return true;
});
