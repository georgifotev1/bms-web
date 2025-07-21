import { useEffect, useState, useCallback } from 'react';
import { useBlocker } from 'react-router';

interface UseUnsavedChangesWithRouterProps {
    hasUnsavedChanges: boolean;
    message?: string;
    onNavigateAway?: () => void;
}

export const useUnsavedChangesWithRouter = ({
    hasUnsavedChanges,
    message = 'You have unsaved changes. Are you sure you want to leave?',
    onNavigateAway,
}: UseUnsavedChangesWithRouterProps) => {
    const [showModal, setShowModal] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [blockedNavigation, setBlockedNavigation] = useState<any>(null);

    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            hasUnsavedChanges &&
            currentLocation.pathname !== nextLocation.pathname
    );

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = message;
                return message;
            }
        };

        if (hasUnsavedChanges) {
            window.addEventListener('beforeunload', handleBeforeUnload);
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasUnsavedChanges, message]);

    useEffect(() => {
        if (blocker.state === 'blocked') {
            setBlockedNavigation(blocker);
            setShowModal(true);
        }
    }, [blocker]);

    const handleConfirmLeave = useCallback(() => {
        setShowModal(false);
        if (blockedNavigation) {
            blockedNavigation.proceed();
            setBlockedNavigation(null);
        }
        onNavigateAway?.();
    }, [blockedNavigation, onNavigateAway]);

    const handleCancelLeave = useCallback(() => {
        setShowModal(false);
        if (blockedNavigation) {
            blockedNavigation.reset();
            setBlockedNavigation(null);
        }
    }, [blockedNavigation]);

    return {
        showModal,
        handleConfirmLeave,
        handleCancelLeave,
        hasUnsavedChanges,
        isBlocked: blocker.state === 'blocked',
    };
};
