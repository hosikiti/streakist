import { FormEventHandler } from 'react';
import { FormState, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { DaysLabel, DaysOfWeek } from '../../../utils/date';
import { Task, TrackingType } from '../task.types';
import { generateUUID } from '../../../utils/uuid';

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

const FORM_FIELD_CLASS = 'flex flex-col gap-2';
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
            <div className={FORM_FIELD_CLASS}>
                <label>Title</label>
                <input
                    {...register('title', { required: true })}
                    className={FORM_INPUT_CLASS}
                    placeholder='e.g. "Read a book"'
                />
                {formState.errors.title && (
                    <span className="text-xs text-error">
                        Title is required
                    </span>
                )}
            </div>
            <div className={FORM_FIELD_CLASS}>
                <label>Tracking Type</label>
                <select
                    {...register('trackingType')}
                    className={FORM_SELECT_CLASS}
                >
                    <option value={TrackingType.Daily}>Daily</option>
                    <option value={TrackingType.Weekly}>Weekly</option>
                </select>
            </div>
            <div className={FORM_FIELD_CLASS}>
                <label>How often do you want to do it?</label>
                {watchTrackingType === TrackingType.Daily && (
                    <>
                        <div className="flex flex-wrap gap-4">
                            {DaysOfWeek.map((day) => {
                                return (
                                    <label
                                        className="flex flex-row items-center gap-2"
                                        key={day}
                                    >
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            {...register('dailyTrackingDays', {
                                                required: true,
                                            })}
                                            value={day}
                                        />
                                        <span className="label-text">
                                            {DaysLabel[day]}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                        {formState.errors.dailyTrackingDays && (
                            <span className="text-xs text-error">
                                Select at least one day
                            </span>
                        )}
                    </>
                )}
                {watchTrackingType === TrackingType.Weekly && (
                    <div className={FORM_FIELD_CLASS}>
                        <div className="flex flex-row gap-2 items-center">
                            <input
                                {...register('weeklyTrackingFrequency', {
                                    validate: (value) => {
                                        if (value === undefined) {
                                            return true;
                                        }
                                        const num = parseInt(value);
                                        return num >= 1 && num <= 7;
                                    },
                                })}
                                className={FORM_DAYS_INPUT_CLASS}
                                type="number"
                                min={1}
                                max={7}
                            />
                            <span>days a week</span>
                        </div>
                        {formState.errors.weeklyTrackingFrequency && (
                            <span className="text-xs text-error">
                                Valid value is between 1 and 7
                            </span>
                        )}
                    </div>
                )}
            </div>
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
