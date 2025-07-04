import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from '@/components/ui/sidebar';
import { H4 } from '@/components/typography';
import { NavMenu } from './nav-menu';
export const BrandSidebar = () => {
    return (
        <Sidebar className='border-r' collapsible='none'>
            <div className='fixed'>
                <SidebarHeader>
                    <H4>Brand Details</H4>
                </SidebarHeader>
                <SidebarContent>
                    <NavMenu />
                </SidebarContent>
            </div>
        </Sidebar>
    );
};
