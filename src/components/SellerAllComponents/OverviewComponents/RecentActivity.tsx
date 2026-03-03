/** @format */
"use client";

import React from "react";

interface Activity {
  icon: string;
  color: string;
  text: string;
  time: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-5">
    <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
      RECENT ACTIVITY
    </h3>
    <div className="flex flex-col gap-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${activity.color}`}
          >
            {activity.icon}
          </div>
          <div className="min-w-0">
            <p className="text-sm text-primary leading-snug">{activity.text}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentActivity;
