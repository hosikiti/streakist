import { useForm } from 'react-hook-form';
import TaskForm, { AddTaskForm } from '../components/TaskForm';

type UseTaskDialogProps = {
    modalId: string;
    title: string;
    submitButtonText: string;
    onSubmit(data: AddTaskForm): void;
    additionalButtons?: React.ReactNode;
    defaultValues?: AddTaskForm;
};

export const useTaskDialog = ({
    modalId,
    title,
    onSubmit,
    submitButtonText,
    additionalButtons,
    defaultValues,
}: UseTaskDialogProps) => {
    const {
        register,
        handleSubmit,
        formState,
        setValue,
        watch,
        getValues,
        reset,
    } = useForm<AddTaskForm>({ defaultValues });

    const openModal = () => {
        const modal = document.getElementById(modalId) as HTMLFormElement;
        modal.showModal();
    };

    const closeModal = () => {
        const modal = document.getElementById(modalId) as HTMLFormElement;
        modal.close();
    };

    const taskFormOnSubmit = handleSubmit(onSubmit);

    const Dialog = (
        <dialog id={modalId} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg pb-4">{title}</h3>
                <TaskForm
                    onSubmit={taskFormOnSubmit}
                    register={register}
                    formState={formState}
                    formWatch={watch}
                />
                <div className="modal-action">
                    <form
                        method="dialog"
                        className="w-full flex flex-row justify-between gap-4"
                    >
                        <div>{additionalButtons}</div>
                        <div className="flex flex-row gap-2">
                            <button className="btn">Cancel</button>
                            <div
                                className="btn btn-primary"
                                onClick={taskFormOnSubmit}
                            >
                                {submitButtonText}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );

    return {
        Dialog,
        handleSubmit,
        openModal,
        closeModal,
        setValue,
        getValues,
        reset,
    };
};
