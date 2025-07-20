import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';

export interface ActionsProps {
    actions: {
        label: string;
        fn: () => void;
    }[];
}
export function ActionsButton({ actions }: ActionsProps) {
    if (actions.length < 1) return;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon' className='border-0'>
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                {actions.map((action, index) => (
                    <DropdownMenuItem
                        key={action.label + index}
                        onClick={action.fn}
                    >
                        {action.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
