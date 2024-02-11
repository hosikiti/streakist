import { useTaskContext } from '../task.context';
import { MemoTaskCard } from './TaskCard';
import { useEditTaskDialog } from '../hooks/useEditTaskDialog';
import EmptyState from './EmptyState';

export default function TaskList() {
    const { tasks, currentDate, toggleDone } = useTaskContext();
    const { Dialog, handleEditTask } = useEditTaskDialog();

    return (
        <div className="p-4 w-full md:w-[60%] flex flex-col items-center gap-4">
            {tasks.map((task) => {
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

            {/* task edit modal */}
            {Dialog}
        </div>
    );
}
