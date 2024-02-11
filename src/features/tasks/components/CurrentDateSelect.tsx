import { parseDate } from '../../../utils/date';
import * as datefns from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

type CurrentDateSelectProps = {
    currentDate: string;
    setCurrentDate: (date: Date) => void;
};

export default function CurrentDateSelect({
    currentDate,
    setCurrentDate,
}: CurrentDateSelectProps) {
    const setPreviousDate = () => {
        const previousDate = datefns.subDays(parseDate(currentDate), 1);
        setCurrentDate(previousDate);
    };

    const setNextDate = () => {
        const nextDate = datefns.addDays(parseDate(currentDate), 1);
        setCurrentDate(nextDate);
    };

    const formattedDate = datefns.format(parseDate(currentDate), 'P EEE');

    return (
        <div className="flex flex-row gap-8 justify-center">
            <button onClick={setPreviousDate}>
                <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <span className="text-3xl">{formattedDate}</span>
            <button onClick={setNextDate}>
                <ChevronRightIcon className="w-6 h-6" />
            </button>
        </div>
    );
}
