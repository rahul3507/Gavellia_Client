/** @format */
import React from "react";
import { TrendingDown, Trophy, Sparkles } from "lucide-react";
import Link from "next/link";

interface Activity {
  id: number;
  icon: React.ElementType;
  iconBg: string;
  title: string;
  detail: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: 1,
    icon: TrendingDown,
    iconBg: "bg-red-100 text-red-500",
    title: "You were outbid on Vintage Rolex",
    detail: "Current bid £2,100",
    time: "2 hr ago",
  },
  {
    id: 2,
    icon: Trophy,
    iconBg: "bg-green-100 text-green-500",
    title: "You won Abstract Painting",
    detail: "Final bid £2,100",
    time: "2 hr ago",
  },
  {
    id: 3,
    icon: Sparkles,
    iconBg: "bg-blue-100 text-blue-500",
    title: "New item matching your interests",
    detail: "Omega Seamaster",
    time: "2 hr ago",
  },
];

const OverviewRecentActivity = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-primary">
          Recent Activity
        </h3>
        <Link
          href="#"
          className="text-xs font-semibold text-primary hover:underline uppercase tracking-wide"
        >
          VIEW ALL
        </Link>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 ${activity.iconBg}`}
            >
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary truncate">
                {activity.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {activity.detail} &bull; {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewRecentActivity;
