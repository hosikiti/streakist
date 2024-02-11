import { useTaskContext } from '../task.context';
import TaskItem from './TaskListItem';
import { Task } from '../task.types';
import TaskForm, { AddTaskForm, convertAddFormValueToTask } from './TaskForm';
import { useForm } from 'react-hook-form';

const EDIT_MODAL_ID = 'edit_modal';

export default function TaskList() {
    const { tasks, currentDate, getStreak, updateTask, toggleDone } =
        useTaskContext();
    const { register, handleSubmit, formState, setValue, watch } =
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
                        <form method="dialog" className="flex flex-row gap-4">
                            <button className="btn">Cancel</button>
                            <div
                                className="btn btn-primary"
                                onClick={() => onSubmit()}
                            >
                                Update
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
