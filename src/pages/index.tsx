import AddTaskButton from '../features/tasks/components/add-task-button.component';
import CurrentDateSelect from '../features/tasks/components/current-date-select.component';
import TaskList from '../features/tasks/components/task-list.component';

export default function IndexPage() {
    return (
        <div className="py-8 w-full flex flex-col items-center">
            <div className="text-4xl py-8">Streakist</div>
            <CurrentDateSelect />
            <AddTaskButton />
            <TaskList />
        </div>
    );
}
