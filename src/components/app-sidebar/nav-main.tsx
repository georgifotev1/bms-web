import { Calendar, ListTree, Settings2, Smile } from 'lucide-react';

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useNavigate } from 'react-router';

export function NavMain() {
    const navigate = useNavigate();
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
            icon: Settings2,
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
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            isActive={item.url === window.location.pathname}
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
