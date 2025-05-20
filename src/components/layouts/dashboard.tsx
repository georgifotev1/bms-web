import { AppSidebar } from '@/features/app-sidebar/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                    <div className='flex items-center gap-2 px-4'></div>
                </header>
                <main className='flex flex-1 flex-col gap-4 p-4 pt-0'>
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
