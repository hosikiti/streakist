import { useForm } from 'react-hook-form';
import { DaysOfWeek } from '../../../utils/date';
import { useTaskContext } from '../task.context';
import TaskForm, { AddTaskForm } from './TaskForm';
import { Task, TrackingType } from '../task.types';
import { generateUUID } from '../../../utils/uuid';
import { PlusIcon } from '@heroicons/react/24/solid';

const ADD_MODAL_ID = 'add_modal';

const addTaskDefaultValues: AddTaskForm = {
    title: '',
    trackingType: TrackingType.Daily,
    dailyTrackingDays: DaysOfWeek.map((day) => day.toString()),
    weeklyTrackingFrequency: '3',
};

export default function AddTaskButton() {
    const { register, handleSubmit, formState, reset } = useForm<AddTaskForm>({
        defaultValues: addTaskDefaultValues,
    });
    const taskContext = useTaskContext();

    const openModal = () => {
        const modal = document.getElementById(ADD_MODAL_ID) as HTMLFormElement;
        modal.showModal();
    };

    const closeModal = () => {
        const modal = document.getElementById(ADD_MODAL_ID) as HTMLFormElement;
        modal.close();
    };

    const onSubmit = handleSubmit((data) => {
        const newTask: Task = {
            id: generateUUID(),
            title: data.title,
            completeHistory: [],
            trackingType: data.trackingType,
            trackingOptions: {
                dailyTrackingDays: data.dailyTrackingDays
                    ? data.dailyTrackingDays.map((day) => +day)
                    : undefined,
                weeklyTrackingFrequency: data.weeklyTrackingFrequency
                    ? +data.weeklyTrackingFrequency
                    : undefined,
            },
        };
        console.log(newTask);
        taskContext.addTask(newTask);
        closeModal();
        reset();
    });

    const handleAddClick = () => {
        onSubmit();
    };

    return (
        <>
            <button className="btn btn-primary" onClick={openModal}>
                <PlusIcon className="w-6 h-6" />
                ADD TASK
            </button>
            <dialog id={ADD_MODAL_ID} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg pb-4">NEW TASK</h3>
                    <TaskForm
                        onSubmit={onSubmit}
                        register={register}
                        formState={formState}
                    />
                    <div className="modal-action">
                        <form method="dialog" className="flex flex-row gap-4">
                            <button className="btn">Cancel</button>
                            <div
                                className="btn btn-primary"
                                onClick={handleAddClick}
                            >
                                Add
                            </div>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
