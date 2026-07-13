"use client";

import React from "react";
import { TrendingDown, Trophy, Sparkles } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

const iconMap = {
  outbid: TrendingDown,
  won: Trophy,
  new: Sparkles,
};

const bgMap = {
  outbid: "bg-red-100 text-red-500",
  won: "bg-green-100 text-green-500",
  new: "bg-blue-100 text-blue-500",
};

const OverviewRecentActivity = () => {
  const { recentActivity, loading } = useAppSelector((state) => state.overview);

  if (loading) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 w-36 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gray-200" />
              <div className="flex-1 space-y-1">
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-1/2 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
        {recentActivity.map((activity) => {
          const Icon = iconMap[activity.type];
          const bg = bgMap[activity.type];

          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 ${bg}`}
              >
                <Icon className="w-4 h-4" />
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
          );
        })}
      </div>
    </div>
  );
};

export default OverviewRecentActivity;
