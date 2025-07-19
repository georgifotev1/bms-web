import { BriefcaseBusiness, Clock, Users } from 'lucide-react';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/utils/cn';
import { useNavigate } from 'react-router';
import { paths } from '@/config/paths';

export function NavMenu() {
    const navigate = useNavigate();

    const items = [
        {
            title: 'Your Brand',
            url: paths.app.brand.path,
            icon: BriefcaseBusiness,
        },
        {
            title: 'Working Hours',
            url: paths.app.brand.workingHours,
            icon: Clock,
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
                            isActive={location.pathname === item.url}
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
