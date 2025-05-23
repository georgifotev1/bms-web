import * as React from 'react';

import { Head } from '../seo/head';
import { H3 } from '../typography';

type ContentLayoutProps = {
    children: React.ReactNode;
    title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
    return (
        <>
            <Head title={title} />
            <div className='absolute w-full h-screen overflow-hidden'>
                <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                    <div className='flex items-center gap-2'>
                        <H3>{title}</H3>
                    </div>
                </header>
                {children}
            </div>
        </>
    );
};
