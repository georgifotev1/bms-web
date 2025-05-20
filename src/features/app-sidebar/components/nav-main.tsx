import { Calendar, ListTree, Settings2, Smile } from 'lucide-react';

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from '../../../components/ui/link';

export function NavMain() {
    const items = [
        {
            title: 'Calendar',
            url: '#',
            icon: Calendar,
            isActive: true,
        },
        {
            title: 'Services',
            url: '#',
            icon: ListTree,
        },
        {
            title: 'Customers',
            url: '#',
            icon: Smile,
        },
        {
            title: 'Settings',
            url: '#',
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
                        <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon />}
                            <Link to={item.url}>{item.title}</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
