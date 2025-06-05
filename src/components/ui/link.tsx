import { cn } from '@/utils/cn';
import { Link as RouterLink, LinkProps } from 'react-router';
import { buttonVariants } from './button';
import { VariantProps } from 'class-variance-authority';

export const Link = ({ className, children, ...props }: LinkProps) => {
    return (
        <RouterLink className={className} {...props}>
            {children}
        </RouterLink>
    );
};

type ButtonLinkProps = LinkProps &
    VariantProps<typeof buttonVariants> & {
        className?: string;
    };
export const ButtonLink = ({
    className,
    children,
    variant,
    size,
    ...props
}: ButtonLinkProps) => {
    return (
        <RouterLink
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        >
            {children}
        </RouterLink>
    );
};
