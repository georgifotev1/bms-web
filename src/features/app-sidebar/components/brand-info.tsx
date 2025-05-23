import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from '@/components/ui/sidebar';
import { useBrandContext } from '@/features/brand/context';
import { Smile } from 'lucide-react';

export function BrandInfo() {
    const { open } = useSidebar();
    const brand = useBrandContext();

    return (
        <SidebarMenu>
            <SidebarMenuItem className='flex cursor-pointer items-center gap-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-12 text-sm group-data-[collapsible=icon]:p-0!'>
                {open && (
                    <>
                        <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                            <Smile />
                        </div>
                        <div className='grid flex-1 text-left text-sm leading-tight'>
                            <span className='truncate font-medium'>
                                {brand.name}
                            </span>
                            <span className='truncate text-xs'>
                                {brand.address}
                            </span>
                        </div>
                    </>
                )}
                <SidebarTrigger />
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
