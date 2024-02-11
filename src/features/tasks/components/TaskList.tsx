import { useTaskContext } from '../task.context';
import TaskItem from './TaskListItem';

export default function TaskList() {
    const { tasks, currentDate, getStreak, toggleDone } = useTaskContext();

    return (
        <div className="p-4 w-full md:w-[60%] flex flex-col items-center gap-4">
            {tasks.map((task) => {
                const isDone = task.completeHistory.includes(currentDate);
                const streak = getStreak(task, currentDate);

                return (
                    <TaskItem
                        key={task.id}
                        currentDate={currentDate}
                        task={task}
                        isDone={isDone}
                        streak={streak}
                        onClick={() => toggleDone(task.id)}
                    />
                );
            })}
        </div>
    );
}
