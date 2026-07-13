"use client";

import React from "react";

const LiveStream = () => {
  return (
    <div className="col-span-1 lg:col-span-2 2xl:col-span-3 border-2">
      <video
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        controls
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default LiveStream;
