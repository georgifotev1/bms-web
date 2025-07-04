import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from '@/components/ui/sidebar';
import { useBrandContext } from '@/context/brand';
import { BrandProfile } from '@/types/api';

export function BrandInfo() {
    const { open, isMobile } = useSidebar();
    const brand = useBrandContext();

    return (
        <SidebarMenu>
            <SidebarMenuItem className='flex items-center gap-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-12 text-sm group-data-[collapsible=icon]:p-0!'>
                {open && <NavHeader brand={brand} />}
                {isMobile && <NavHeader brand={brand} />}
                {!isMobile && <SidebarTrigger />}
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

const NavHeader = ({ brand }: { brand: BrandProfile }) => (
    <>
        <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-full'>
            <img
                src={brand.logoUrl ? brand.logoUrl : '/logo.png'}
                alt={brand.name}
            />
        </div>
        <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-medium'>{brand.name}</span>
            <span className='truncate text-xs'>{brand.address}</span>
        </div>
    </>
);
