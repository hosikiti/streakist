import { FormEventHandler } from 'react';
import { FormState, UseFormRegister } from 'react-hook-form';
import { Days, DaysLabel, DaysOfWeek } from '../../../utils/date';
import { TrackingType } from '../task.types';

export interface AddTaskForm {
    title: string;
    trackingType: TrackingType;
    dailyTrackingDays: string[];
    weeklyTrackingFrequency: string;
}

type TaskFormProps = {
    onSubmit: FormEventHandler<HTMLFormElement>;
    register: UseFormRegister<AddTaskForm>;
    formState: FormState<AddTaskForm>;
};

const FORM_FIELD_CLASS = 'flex flex-col gap-2';
const FORM_INPUT_CLASS = 'input input-bordered w-full';
const FORM_SELECT_CLASS = 'select select-bordered w-full max-w-xs';

export default function TaskForm({
    onSubmit,
    register,
    formState,
}: TaskFormProps) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className={FORM_FIELD_CLASS}>
                <label>Title</label>
                <input
                    {...register('title', { required: true })}
                    className={FORM_INPUT_CLASS}
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
                                    {...register('dailyTrackingDays')}
                                    value={day}
                                />
                                <span className="label-text">
                                    {DaysLabel[day]}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>
        </form>
    );
}
