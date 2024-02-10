import TaskList from '../features/tasks/components/task-list.component';
import { useTaskContext } from '../features/tasks/task.context';

export default function IndexPage() {
    const taskContext = useTaskContext();

    const addTask = () => {
        taskContext.addTask({
            id: Math.random().toString(),
            title: 'New Task' + Math.random(),
            completeHistory: [],
        });
    };

    return (
        <div className="py-8 w-full flex flex-col items-center">
            <div className="text-4xl py-8">Streakist</div>
            <button className="btn btn-primary" onClick={addTask}>
                ADD TASK
            </button>
            <TaskList />
        </div>
    );
}
