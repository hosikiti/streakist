import { convertAddFormValueToTask } from '../components/TaskForm';
import { Task } from '../task.types';
import ConfirmDialogButton from '../../../components/Elements/Button/ConfirmDialogButton';
import { useTaskContext } from '../task.context';
import { useTaskDialog } from './useTaskDialog';

const EDIT_MODAL_ID = 'edit_modal';

export const useEditTaskDialog = () => {
    const { tasks, deleteTask, updateTask } = useTaskContext();
    const handleDelete = () => {
        const taskId = getValues('id');
        if (!taskId) {
            alert('unexpected error');
            return;
        }

        deleteTask(taskId);
        closeModal();
    };
    const { Dialog, closeModal, openModal, setValue, getValues } =
        useTaskDialog({
            modalId: EDIT_MODAL_ID,
            title: 'EDIT TASK',
            submitButtonText: 'Update',
            additionalButtons: (
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
            ),
            onSubmit: (data) => {
                // Update the task with the new data while keeping the complete history
                const completeHistory =
                    tasks.find((task) => task.id === data.id)
                        ?.completeHistory ?? [];
                const updatedTask = {
                    ...convertAddFormValueToTask(data),
                    completeHistory,
                };
                updateTask(updatedTask);
                closeModal();
            },
        });

    const handleEditTask = (task: Task) => {
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

    return { Dialog, handleEditTask, closeModal };
};
