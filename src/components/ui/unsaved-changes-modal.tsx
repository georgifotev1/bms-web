import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { AlertTriangle } from 'lucide-react';
import { Button } from './button';

interface UnsavedChangesModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message?: string;
}

export const UnsavedChangesModal: React.FC<UnsavedChangesModalProps> = ({
    isOpen,
    onConfirm,
    onCancel,
    message = 'You have unsaved changes. Are you sure you want to leave?',
}) => {
    return (
        <Dialog open={isOpen}>
            <DialogContent>
                <DialogHeader>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center justify-center w-8 h-8 rounded-full'>
                            <AlertTriangle />
                        </div>
                        <div>
                            <DialogTitle>Unsaved Changes</DialogTitle>
                        </div>
                    </div>
                    <DialogDescription className='pt-2'>
                        {message}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant='outline' onClick={onCancel}>
                        Stay on Page
                    </Button>
                    <Button onClick={onConfirm}>Leave Page</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
