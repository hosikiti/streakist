import { CheckCircleIcon, PencilIcon } from '@heroicons/react/24/solid';
import { Task, TrackingType } from '../task.types';
import { getCurrentWeekStreak } from '../../../utils/streak';
import { DaysShortLabel } from '../../../utils/date';
import { useMemo } from 'react';

type TaskItemProps = {
    task: Task;
    isDone: boolean;
    onClick: () => void;
    streak: number;
    currentDate: string;
};

export default function TaskItem({
    task,
    isDone,
    onClick,
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
                    <span className="text-white font-bold text-6xl">
                        {streak}
                    </span>
                    <div className="flex flex-row gap-1">
                        {showWeeklyProgress &&
                            new Array(weeklyFrequency)
                                .fill(0)
                                .map((x, i) => (
                                    <div
                                        key={i}
                                        className={`rounded-full ${
                                            i < currentWeekStreak
                                                ? 'bg-white'
                                                : 'bg-gray-400'
                                        } w-1 h-1`}
                                    ></div>
                                ))}
                    </div>
                </div>
                <div className="card-title text-white flex flex-col items-start w-[40%]">
                    <span>{task.title}</span>
                    {/* show tracking type info */}
                    <span className="text-xs font-thin">
                        {trackingDescription}
                    </span>
                </div>
                <div className="flex flex-row gap-4">
                    <button
                        onClick={() => {
                            alert('hey');
                        }}
                    >
                        <PencilIcon className="h-4 w-4 text-slate-300" />
                    </button>
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
