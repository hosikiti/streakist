import { getCurrentWeekStreak } from '../../../utils/streak';
import { Task } from '../task.types';

type WeeklyProgressProps = {
    task: Task;
    currentDate: string;
};

export default function WeeklyProgress({
    task,
    currentDate,
}: WeeklyProgressProps) {
    const weeklyFrequency = task.trackingOptions?.weeklyTrackingFrequency || 0;
    const currentWeekStreak = getCurrentWeekStreak(
        task.completeHistory,
        currentDate
    );

    return (
        <>
            {new Array(weeklyFrequency).fill(0).map((x, i) => (
                <div
                    key={i}
                    className={`rounded-full ${
                        i < currentWeekStreak
                            ? 'dark:bg-white bg-primary'
                            : 'dark:bg-gray-400 bg-gray-300'
                    } w-1 h-1`}
                ></div>
            ))}
        </>
    );
}
