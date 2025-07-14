import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export default function NotificationPanel() {
  const [open, setOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      message: "Your order #1234 has shipped!",
      time: "5 min ago",
      read: false,
    },
    {
      id: 2,
      message: "New message from John Doe.",
      time: "15 min ago",
      read: false,
    },
    {
      id: 3,
      message: "Your subscription is expiring soon.",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 4,
      message: "A new update is available for your app.",
      time: "Yesterday",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full relative bg-transparent"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
          <span className="sr-only">View notifications</span>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-[360px] p-0 rounded-md border shadow-lg max-h-[70vh] overflow-y-auto bg-background backdrop-blur z-[100]
"
        style={{
          position: "fixed",
          right: "1rem",
          top: "4rem", // adjust for navbar height
        }}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-1">Notifications</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {unreadCount} unread message(s)
          </p>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span
                className={`flex h-2 w-2 translate-y-1.5 rounded-full ${
                  notification.read ? "bg-gray-300" : "bg-blue-500"
                }`}
              />
              <div className="grid gap-1">
                <p className="text-sm font-medium">{notification.message}</p>
                <p className="text-sm text-muted-foreground">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
