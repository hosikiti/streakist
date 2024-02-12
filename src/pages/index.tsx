import React from 'react';
import AddTaskButton from '../features/tasks/components/AddTaskButton';
import CurrentDateSelect from '../features/tasks/components/CurrentDateSelect';
import TaskList from '../features/tasks/components/TaskList';
import { useTaskContext } from '../features/tasks/task.context';

const MemoCurrentDateSelect = React.memo(
    CurrentDateSelect,
    (prev, next) => prev.currentDate === next.currentDate
);

export default function IndexPage() {
    const { currentDate, setCurrentDate } = useTaskContext();

    return (
        <div className="py-8 w-full flex flex-col items-center">
            <div className="flex flex-col pb-8 items-center">
                <span className="text-sm pb-2">Today</span>
                <MemoCurrentDateSelect
                    currentDate={currentDate}
                    setCurrentDate={setCurrentDate}
                />
            </div>
            <AddTaskButton />
            <TaskList />
        </div>
    );
}
