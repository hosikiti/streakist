import { parseDate } from '../../../utils/date';
import { useTaskContext } from '../task.context';
import * as datefns from 'date-fns';

export default function CurrentDateSelect() {
    const { currentDate, setCurrentDate } = useTaskContext();

    const setPreviousDate = () => {
        const previousDate = datefns.subDays(parseDate(currentDate), 1);
        setCurrentDate(previousDate);
    };

    const setNextDate = () => {
        const nextDate = datefns.addDays(parseDate(currentDate), 1);
        setCurrentDate(nextDate);
    };

    return (
        <div className="flex flex-row gap-8 justify-center">
            <button onClick={setPreviousDate}>Prev</button>
            <span className="text-3xl">{currentDate}</span>
            <button onClick={setNextDate}>Next</button>
        </div>
    );
}
