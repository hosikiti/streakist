import { FormEventHandler } from 'react';
import { FormState, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Task, TrackingType } from '../task.types';
import { generateUUID } from '../../../utils/uuid';
import FieldWrapper from '../../../components/Elements/Form/FieldWrapper';
import DaysCheckboxGroup from '../../../components/Elements/Form/DaysCheckboxGroup';
import FieldErrorLabel from '../../../components/Elements/Form/FieldErrorLabel';

export interface AddTaskForm {
    id?: string;
    title: string;
    trackingType: TrackingType;
    dailyTrackingDays: string[];
    weeklyTrackingFrequency: string;
}

type TaskFormProps = {
    onSubmit: FormEventHandler<HTMLFormElement>;
    register: UseFormRegister<AddTaskForm>;
    formState: FormState<AddTaskForm>;
    formWatch: UseFormWatch<AddTaskForm>;
};

const FORM_INPUT_CLASS = 'input input-bordered w-full';
const FORM_DAYS_INPUT_CLASS = 'input input-bordered w-16';
const FORM_SELECT_CLASS = 'select select-bordered w-full max-w-xs';

export default function TaskForm({
    onSubmit,
    register,
    formState,
    formWatch,
}: TaskFormProps) {
    const watchTrackingType = formWatch('trackingType', TrackingType.Daily);

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {/* show title input */}
            <FieldWrapper
                label="Title"
                fieldError={formState.errors.title}
                errorMessage="Title is required"
            >
                <input
                    {...register('title', { required: true })}
                    className={FORM_INPUT_CLASS}
                    placeholder='e.g. "Read a book"'
                />
            </FieldWrapper>
            {/* show tracking type select */}
            <FieldWrapper label="Tracking Type">
                <select
                    {...register('trackingType')}
                    className={FORM_SELECT_CLASS}
                >
                    <option value={TrackingType.Daily}>Daily</option>
                    <option value={TrackingType.Weekly}>Weekly</option>
                </select>
            </FieldWrapper>

            {/* show daily tracking days checkboxes */}
            {watchTrackingType === TrackingType.Daily && (
                <FieldWrapper label="How often do you want to do it?">
                    <DaysCheckboxGroup
                        registration={register('dailyTrackingDays', {
                            required: true,
                        })}
                    />
                    {formState.errors.dailyTrackingDays && (
                        <FieldErrorLabel message="Select at least one day" />
                    )}
                </FieldWrapper>
            )}

            {/* show weekly tracking frequency input */}
            {watchTrackingType === TrackingType.Weekly && (
                <FieldWrapper
                    label="How often do you want to do it?"
                    fieldError={formState.errors.weeklyTrackingFrequency}
                    errorMessage="Valid value is between 1 and 7"
                >
                    <div className="flex flex-row gap-2 items-center">
                        <input
                            {...register('weeklyTrackingFrequency', {
                                min: 1,
                                max: 7,
                                required: true,
                            })}
                            className={FORM_DAYS_INPUT_CLASS}
                            type="number"
                            min={1}
                            max={7}
                        />
                        <span>days a week</span>
                    </div>
                </FieldWrapper>
            )}
        </form>
    );
}

export const convertAddFormValueToTask = (data: AddTaskForm): Task => {
    const task: Task = {
        id: data.id ?? generateUUID(),
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
    return task;
};
