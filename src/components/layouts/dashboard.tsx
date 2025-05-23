import { AppSidebar } from '@/features/app-sidebar/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className='w-full relative'>{children}</main>
        </SidebarProvider>
    );
}
