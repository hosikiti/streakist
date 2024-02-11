import { useTaskContext } from '../task.context';
import { MemoTaskItem } from './TaskItem';
import { Task, TrackingType } from '../task.types';
import TaskForm, { AddTaskForm, convertAddFormValueToTask } from './TaskForm';
import { useForm } from 'react-hook-form';
import ConfirmDialogButton from '../../../components/Elements/Button/ConfirmDialogButton';
import { useMemo } from 'react';
import { parseDate } from '../../../utils/date';
import { useTrackableTasks } from '../../../hooks/useTrackableTasks';

const EDIT_MODAL_ID = 'edit_modal';

export default function TaskList() {
    const { tasks, currentDate, updateTask, deleteTask, toggleDone } =
        useTaskContext();
    const { register, handleSubmit, formState, setValue, watch, getValues } =
        useForm<AddTaskForm>();

    const openModal = () => {
        const modal = document.getElementById(EDIT_MODAL_ID) as HTMLFormElement;
        modal.showModal();
    };

    const closeModal = () => {
        const modal = document.getElementById(EDIT_MODAL_ID) as HTMLFormElement;
        modal.close();
    };

    const editTask = (task: Task) => {
        const weeklyTrackingFrequency = String(
            task.trackingOptions?.weeklyTrackingFrequency || 0
        );
        const dailyTrackingDays = (
            task.trackingOptions?.dailyTrackingDays || []
        ).map((day) => String(day));

        setValue('id', task.id);
        setValue('title', task.title);
        setValue('trackingType', task.trackingType);
        setValue('dailyTrackingDays', dailyTrackingDays);
        setValue('weeklyTrackingFrequency', weeklyTrackingFrequency);
        openModal();
    };

    // task list only displays daily tasks that should be tracked today
    const trackableTasks = useTrackableTasks(tasks, currentDate);

    const handleDelete = () => {
        const taskId = getValues('id');
        if (!taskId) {
            alert('unexpected error');
            return;
        }

        deleteTask(taskId);
        closeModal();
    };

    const onSubmit = handleSubmit((data) => {
        // Update the task with the new data while keeping the complete history
        const completeHistory =
            tasks.find((task) => task.id === data.id)?.completeHistory ?? [];
        const updatedTask = {
            ...convertAddFormValueToTask(data),
            completeHistory,
        };
        updateTask(updatedTask);
        closeModal();
    });

    return (
        <div className="p-4 w-full md:w-[60%] flex flex-col items-center gap-4">
            {trackableTasks.map((task) => {
                return (
                    <MemoTaskItem
                        key={task.id}
                        currentDate={currentDate}
                        task={task}
                        onClick={() => toggleDone(task.id)}
                        onClickEdit={() => editTask(task)}
                    />
                );
            })}

            {/* task edit modal */}
            <dialog id={EDIT_MODAL_ID} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg pb-4">EDIT TASK</h3>
                    <TaskForm
                        onSubmit={onSubmit}
                        register={register}
                        formState={formState}
                        formWatch={watch}
                    />
                    <div className="modal-action">
                        <form
                            method="dialog"
                            className="w-full flex flex-row justify-between gap-4"
                        >
                            <div>
                                <ConfirmDialogButton
                                    message="Are you sure you want to delete this task?"
                                    onSelectOK={handleDelete}
                                    render={(modalId) => (
                                        <label
                                            htmlFor={modalId}
                                            className="btn btn-outline btn-error"
                                        >
                                            Delete
                                        </label>
                                    )}
                                />
                            </div>
                            <div className="flex flex-row gap-2">
                                <button className="btn">Cancel</button>
                                <div
                                    className="btn btn-primary"
                                    onClick={onSubmit}
                                >
                                    Update
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}
