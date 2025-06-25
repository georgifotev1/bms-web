import { BriefcaseBusiness, Users } from 'lucide-react';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/utils/cn';
import { useLocation, useNavigate } from 'react-router';

export function NavMenu() {
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
            title: 'Your Brand',
            url: '/brand',
            icon: BriefcaseBusiness,
        },
        {
            title: 'Team',
            url: '/brand/team',
            icon: Users,
        },
    ];

    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map(item => (
                    <SidebarMenuItem
                        className={cn(item.title === 'Brand' && 'mb-4')}
                        key={item.title}
                    >
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
