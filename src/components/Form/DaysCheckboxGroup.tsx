import { UseFormRegisterReturn } from 'react-hook-form';
import { DaysLabel, DaysOfWeek } from '../../utils/date';

type DaysCheckboxGroupProps = {
    registration: UseFormRegisterReturn;
};

export default function DaysCheckboxGroup({
    registration,
}: DaysCheckboxGroupProps) {
    return (
        <div className="flex flex-wrap gap-4">
            {DaysOfWeek.map((day) => (
                <label className="flex flex-row items-center gap-2" key={day}>
                    <input
                        type="checkbox"
                        className="checkbox"
                        {...registration}
                        value={day}
                    />
                    <span className="label-text">{DaysLabel[day]}</span>
                </label>
            ))}
        </div>
    );
}
