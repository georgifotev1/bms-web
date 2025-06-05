import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

import { cn } from '@/utils/cn';
import { getInitials } from '@/utils/helpers';
import { User } from '@/types/api';

function Avatar({
    className,
    ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
    return (
        <AvatarPrimitive.Root
            data-slot='avatar'
            className={cn(
                'relative flex size-8 shrink-0 overflow-hidden rounded-full',
                className
            )}
            {...props}
        />
    );
}

function AvatarImage({
    className,
    ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
    return (
        <AvatarPrimitive.Image
            data-slot='avatar-image'
            className={cn('aspect-square size-full', className)}
            {...props}
        />
    );
}

function AvatarFallback({
    className,
    ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
    return (
        <AvatarPrimitive.Fallback
            data-slot='avatar-fallback'
            className={cn(
                'bg-muted flex size-full items-center justify-center rounded-full',
                className
            )}
            {...props}
        />
    );
}

const AvatarComponent = ({ user }: { user: User }) => {
    return (
        <Avatar className='h-8 w-8 rounded-full'>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className='rounded-lg'>
                {getInitials(user.name)}
            </AvatarFallback>
        </Avatar>
    );
};

export { Avatar, AvatarFallback, AvatarImage, AvatarComponent };
