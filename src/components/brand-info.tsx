
import {
    DropdownMenu
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { Smile } from "lucide-react"

export function BrandInfo() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                            <Smile />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">BRAND NAME</span>
                            <span className="truncate text-xs">PLAN</span>
                        </div>
                    </SidebarMenuButton>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
