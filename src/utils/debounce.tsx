import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = (callback: any, delay: number = 300) => {
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    return React.useCallback(
        (...args: unknown[]) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );
};
