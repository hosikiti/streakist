import * as datefns from 'date-fns';

const DATE_FORMAT = 'yyyyMMdd';

export enum Days {
    Sunday = 0,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}

export const DaysOfWeek = [
    Days.Sunday,
    Days.Monday,
    Days.Tuesday,
    Days.Wednesday,
    Days.Thursday,
    Days.Friday,
    Days.Saturday,
];

export const DaysLabel = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

export const DaysShortLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const getCurrentDate = () => {
    return datefns.format(new Date(), DATE_FORMAT);
};

export const parseDate = (date: string) => {
    return datefns.parse(date, DATE_FORMAT, new Date());
};

export const formatDate = (date: Date) => {
    return datefns.format(date, DATE_FORMAT);
};
