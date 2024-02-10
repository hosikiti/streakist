import { Task } from '../task.types';

type TaskItemProps = {
    task: Task;
    isDone: boolean;
    onClick: () => void;
    streak: number;
};

export default function TaskItem({
    task,
    isDone,
    onClick,
    streak,
}: TaskItemProps) {
    return (
        <div className="w-full flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <span>{task.title}</span>
                <span className="text-sm text-slate-500">
                    {task.completeHistory.join(',')}
                </span>
            </div>
            <div>
                <span>Current Streak: {streak}</span>
            </div>
            <button
                className={`btn btn-circle btn-accent ${
                    isDone ? 'btn-active' : 'btn-outline'
                }`}
                onClick={onClick}
            >
                DONE
            </button>
        </div>
    );
}
