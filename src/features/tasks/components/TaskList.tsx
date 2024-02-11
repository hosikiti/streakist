import { useTaskContext } from '../task.context';
import { MemoTaskCard } from './TaskCard';
import { useTrackableTasks } from '../hooks/useTrackableTasks';
import { useEditTaskDialog } from '../hooks/useEditTaskDialog';
import EmptyState from './EmptyState';
import NothingTodoState from './NothingToDoState';

export default function TaskList() {
    const { tasks, currentDate, toggleDone } = useTaskContext();
    const { Dialog, handleEditTask } = useEditTaskDialog();
    // task list only displays daily tasks that should be tracked today
    const trackableTasks = useTrackableTasks(tasks, currentDate);

    return (
        <div className="p-4 w-full md:w-[60%] flex flex-col items-center gap-4">
            {trackableTasks.map((task) => {
                return (
                    <MemoTaskCard
                        key={task.id}
                        currentDate={currentDate}
                        task={task}
                        onClick={() => toggleDone(task.id)}
                        onClickEdit={() => handleEditTask(task)}
                    />
                );
            })}
            {tasks.length === 0 && <EmptyState />}
            {tasks.length > 0 && trackableTasks.length === 0 && (
                <NothingTodoState />
            )}

            {/* task edit modal */}
            {Dialog}
        </div>
    );
}
