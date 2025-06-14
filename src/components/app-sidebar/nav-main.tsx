import { Calendar, ListTree, Settings, Smile } from 'lucide-react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useLocation, useNavigate } from 'react-router';

export function NavMain() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (itemUrl: string) => {
        if (itemUrl === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(itemUrl);
    };
    const items = [
        {
            title: 'Calendar',
            url: '/',
            icon: Calendar,
        },
        {
            title: 'Services',
            url: '/services',
            icon: ListTree,
        },
        {
            title: 'Customers',
            url: '/customers',
            icon: Smile,
        },
        {
            title: 'Settings',
            url: '/settings',
            icon: Settings,
            items: [
                {
                    title: 'General',
                    url: '#',
                },
                {
                    title: 'Team',
                    url: '#',
                },
                {
                    title: 'Billing',
                    url: '#',
                },
                {
                    title: 'Limits',
                    url: '#',
                },
            ],
        },
    ];

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map(item => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            isActive={isActive(item.url)}
                            tooltip={item.title}
                            onClick={() => navigate(item.url)}
                        >
                            {item.icon && <item.icon />}
                            {item.title}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
