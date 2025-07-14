import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, MessageCircle, AlertTriangle, UserPlus } from "lucide-react";


export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
           <Bell />
        </Button>
      </DropdownMenuTrigger>
   <DropdownMenuContent className="w-80 max-h-[400px] overflow-y-auto" align="end">
  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
  <DropdownMenuSeparator />

  <DropdownMenuGroup>
    <DropdownMenuItem>
      <div className="flex items-start gap-3">
        <Bell className="h-5 w-5 text-blue-500 mt-1" />
        <div>
          <p className="text-sm font-medium">New order placed</p>
          <p className="text-xs text-muted-foreground">Order #12345 was placed 2 minutes ago.</p>
        </div>
      </div>
    </DropdownMenuItem>

    <DropdownMenuItem>
      <div className="flex items-start gap-3">
        <MessageCircle className="h-5 w-5 text-green-500 mt-1" />
        <div>
          <p className="text-sm font-medium">New message</p>
          <p className="text-xs text-muted-foreground">You have a new message from John.</p>
        </div>
      </div>
    </DropdownMenuItem>

    <DropdownMenuItem>
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
        <div>
          <p className="text-sm font-medium">Server alert</p>
          <p className="text-xs text-muted-foreground">High memory usage detected.</p>
        </div>
      </div>
    </DropdownMenuItem>

    <DropdownMenuItem>
      <div className="flex items-start gap-3">
        <UserPlus className="h-5 w-5 text-purple-500 mt-1" />
        <div>
          <p className="text-sm font-medium">New user registered</p>
          <p className="text-xs text-muted-foreground">Anna signed up 10 minutes ago.</p>
        </div>
      </div>
    </DropdownMenuItem>
  </DropdownMenuGroup>

  <DropdownMenuSeparator />

  <DropdownMenuItem className="justify-center text-sm font-medium text-primary hover:underline cursor-pointer">
    View all notifications
  </DropdownMenuItem>
</DropdownMenuContent>

    </DropdownMenu>
  );
}
