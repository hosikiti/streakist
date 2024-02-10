import * as datefns from 'date-fns';

export const getCurrentDate = () => {
    return datefns.format(new Date(), 'yyyyMMdd');
};
