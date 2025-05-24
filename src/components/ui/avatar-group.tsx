/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneElement, Children, forwardRef, useMemo } from 'react';

import { cn } from '@/utils/cn';

import type {
    ElementRef,
    HTMLAttributes,
    ReactElement,
    CSSProperties,
} from 'react';

type TAvatarGroupRef = ElementRef<'div'>;
type TAvatarGroupProps = HTMLAttributes<HTMLDivElement> & {
    max?: number;
    spacing?: number;
};

const AvatarGroup = forwardRef<TAvatarGroupRef, TAvatarGroupProps>(
    ({ className, children, max = 3, spacing = 10, ...props }, ref) => {
        const avatarItems = Children.toArray(children).filter(
            (child): child is ReactElement =>
                typeof child === 'object' && child !== null && 'type' in child
        );

        const renderContent = useMemo(() => {
            return (
                <>
                    {avatarItems.slice(0, max).map((child, index) => {
                        const childProps = child.props as {
                            className?: string;
                            style?: CSSProperties;
                            [key: string]: any;
                        };

                        return cloneElement(child, {
                            key: child.key || index,
                            ...childProps,
                            className: cn(
                                childProps.className,
                                'border-2 border-background'
                            ),
                            style: {
                                marginLeft: index === 0 ? 0 : -spacing,
                                ...childProps.style,
                            },
                        } as any);
                    })}

                    {avatarItems.length > max && (
                        <div
                            key='overflow-indicator'
                            className={cn(
                                'relative flex items-center justify-center rounded-full border-2 border-background bg-muted',
                                avatarItems[0]
                                    ? (
                                          avatarItems[0].props as {
                                              className?: string;
                                          }
                                      ).className
                                    : ''
                            )}
                            style={{ marginLeft: -spacing }}
                        >
                            <p>+{avatarItems.length - max}</p>
                        </div>
                    )}
                </>
            );
        }, [avatarItems, max, spacing]);

        return (
            <div
                ref={ref}
                className={cn('relative flex', className)}
                {...props}
            >
                {renderContent}
            </div>
        );
    }
);

AvatarGroup.displayName = 'AvatarGroup';

export { AvatarGroup };
