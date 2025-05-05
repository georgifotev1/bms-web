import { cn } from '@/utils/cn';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
}

export const H1 = ({ children, className, ...props }: TypographyProps) => {
    return (
        <h1
            className={cn(
                'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
                className
            )}
            {...props}
        >
            {children}
        </h1>
    );
};

export const H2 = ({ children, className, ...props }: TypographyProps) => {
    return (
        <h2
            className={cn(
                'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
                className
            )}
            {...props}
        >
            {children}
        </h2>
    );
};

export const H3 = ({ children, className, ...props }: TypographyProps) => {
    return (
        <h3
            className={cn(
                'scroll-m-20 text-2xl font-semibold tracking-tight',
                className
            )}
            {...props}
        >
            {children}
        </h3>
    );
};

export const H4 = ({ children, className, ...props }: TypographyProps) => {
    return (
        <h4
            className={cn(
                'scroll-m-20 text-xl font-semibold tracking-tight',
                className
            )}
            {...props}
        >
            {children}
        </h4>
    );
};

export const Paragraph = ({
    children,
    className,
    ...props
}: TypographyProps) => {
    return (
        <p
            className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
            {...props}
        >
            {children}
        </p>
    );
};

export const Blockquote = ({
    children,
    className,
    ...props
}: TypographyProps) => {
    return (
        <blockquote
            className={cn(
                'mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 dark:border-slate-600 dark:text-slate-200',
                className
            )}
            {...props}
        >
            {children}
        </blockquote>
    );
};

export const Lead = ({ children, className, ...props }: TypographyProps) => {
    return (
        <p
            className={cn(
                'text-xl text-slate-700 dark:text-slate-300',
                className
            )}
            {...props}
        >
            {children}
        </p>
    );
};

export const LargeText = ({
    children,
    className,
    ...props
}: TypographyProps) => {
    return (
        <div className={cn('text-lg font-semibold', className)} {...props}>
            {children}
        </div>
    );
};

export const SmallText = ({
    children,
    className,
    ...props
}: TypographyProps) => {
    return (
        <small
            className={cn('text-sm font-medium leading-none', className)}
            {...props}
        >
            {children}
        </small>
    );
};

export const Muted = ({ children, className, ...props }: TypographyProps) => {
    return (
        <p
            className={cn(
                'text-sm text-slate-500 dark:text-slate-400',
                className
            )}
            {...props}
        >
            {children}
        </p>
    );
};
