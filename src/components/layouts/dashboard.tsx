import { AppSidebar } from '@/components/app-sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardProvider } from '@/context/dashboard';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <DashboardProvider>
                <AppSidebar />
                <main className='w-full'>{children}</main>
            </DashboardProvider>
        </SidebarProvider>
    );
}
