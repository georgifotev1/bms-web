import * as React from 'react';

import { Head } from '../seo/head';

type ContentLayoutProps = {
    children: React.ReactNode;
    title: string;
    className?: string;
};

export const ContentLayout = ({
    children,
    title,
    className,
}: ContentLayoutProps) => {
    return (
        <div className={className}>
            <Head title={title} />
            <>{children}</>
        </div>
    );
};
