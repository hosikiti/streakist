import { AddTaskForm, convertAddFormValueToTask } from '../components/TaskForm';
import { TrackingType } from '../task.types';
import { useTaskContext } from '../task.context';
import { useTaskDialog } from './useTaskDialog';
import { DaysOfWeek } from '../../../utils/date';

const ADD_MODAL_ID = 'add_modal';

const addTaskDefaultValues: AddTaskForm = {
    title: '',
    trackingType: TrackingType.Daily,
    dailyTrackingDays: DaysOfWeek.map((day) => day.toString()),
    weeklyTrackingFrequency: '3',
};

export const useAddTaskDialog = () => {
    const { addTask } = useTaskContext();
    const { Dialog, closeModal, openModal, reset } = useTaskDialog({
        modalId: ADD_MODAL_ID,
        defaultValues: addTaskDefaultValues,
        title: 'NEW TASK',
        submitButtonText: 'Add',
        onSubmit: (data) => {
            const newTask = convertAddFormValueToTask(data);
            addTask(newTask);
            closeModal();
            reset();
        },
    });

    return { Dialog, openModal, closeModal };
};
