/** @format */
"use client";

import React from "react";
import Link from "next/link";

const QuickActions: React.FC = () => (
  <div className="bg-white border border-gray-100 rounded-xl p-5">
    <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
      QUICK ACTION
    </h3>
    <div className="flex flex-col gap-3">
      <Link
        href="/create-lot"
        className="flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3 px-4 rounded-md hover:bg-primary/90 transition"
      >
        + NEW LISTING
      </Link>
      <button className="flex items-center justify-center gap-2 bg-red-500 text-white text-sm font-semibold py-3 px-4 rounded-md hover:bg-red-600 transition">
        ▷ GO LIVE
      </button>
    </div>
  </div>
);

export default QuickActions;
