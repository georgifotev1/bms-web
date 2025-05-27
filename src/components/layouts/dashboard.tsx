import { AppSidebar } from '@/components/app-sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useBrandContext } from '@/context/brand';
import { DashboardProvider } from '@/context/dashboard';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { id } = useBrandContext();

    return (
        <SidebarProvider>
            <DashboardProvider brandId={id}>
                <AppSidebar />
                <main className='w-full relative'>{children}</main>
            </DashboardProvider>
        </SidebarProvider>
    );
}
