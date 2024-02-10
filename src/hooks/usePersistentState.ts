import { useEffect, useState } from 'react';

// useState with localStorage persistence
export const usePersistentState = <T>(key: string, defaultValue: T) => {
    const [state, setState] = useState<T>(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue
            ? {
                  ...defaultValue,
                  ...JSON.parse(storedValue),
              }
            : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState] as const;
};
