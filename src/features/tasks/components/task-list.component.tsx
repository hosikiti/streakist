import { useTaskContext } from '../task.context';

export default function TaskList() {
    const { tasks, toggleDone, currentDate } = useTaskContext();

    return (
        <div className="p-4 w-full md:w-[60%] flex flex-col items-start gap-4">
            {tasks.map((task) => {
                const isDone = task.completeHistory.includes(currentDate);

                return (
                    <div className="w-full flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <span>{task.title}</span>
                            <span>{task.completeHistory.join(',')}</span>
                        </div>
                        <button
                            className={`btn btn-circle btn-accent ${
                                isDone ? 'btn-active' : 'btn-outline'
                            }`}
                            onClick={() => toggleDone(task.id)}
                        >
                            DONE
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
