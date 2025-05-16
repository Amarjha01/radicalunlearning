// components/VimeoPlayer.js
import React, { useEffect, useRef } from "react";
import Player from "@vimeo/player";

const VimeoPlayer = () => {
  const containerRef = useRef(null);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_#00f2fe50] border border-[#1e2a48] backdrop-blur-md">
      <div
        ref={containerRef}
        className="w-full aspect-video rounded-2xl"
      />
    </div>
  );
};

export default VimeoPlayer;
