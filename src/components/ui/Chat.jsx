"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Tooltip, Cell } from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Chart = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allUsers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      console.log(res.data.users);
      return res.data.users || [];
    },
  });

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Failed to load users.</p>;

  const adminCount = allUsers.filter((u) => u.role === "admin").length;
  const userCount = allUsers.filter((u) => u.role === "user").length;
  const subscriberCount = allUsers.filter(
    (u) => u.role === "subscriber"
  ).length;

  const chartData = [
    { role: "admin", value: adminCount, fill: "#FFA500" }, // orange
    { role: "user", value: userCount, fill: "#00BFFF" }, // blue
    { role: "subscriber", value: subscriberCount, fill: "#32CD32" }, // green
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>User Distribution</CardTitle>
        <CardDescription>By Role</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <PieChart width={250} height={250}>
          <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              value,
              index,
            }) => {
              const entry = chartData[index];
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="#fff"
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                  fontSize={12}
                  fontWeight="bold"
                >
                  {entry.value} ({entry.role})
                </text>
              );
            }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Total Users: {allUsers.length} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing distribution of admins, users & subscribers
        </div>
      </CardFooter>
    </Card>
  );
};
