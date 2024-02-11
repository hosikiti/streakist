import { PlusIcon } from '@heroicons/react/24/solid';
import { useAddTaskDialog } from '../hooks/useAddTaskDialog';

export default function AddTaskButton() {
    const { Dialog, openModal } = useAddTaskDialog();

    return (
        <>
            <button className="btn btn-primary" onClick={openModal}>
                <PlusIcon className="w-6 h-6" />
                ADD TASK
            </button>

            {/* task add modal */}
            {Dialog}
        </>
    );
}
