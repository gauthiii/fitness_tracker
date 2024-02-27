import React, { useState } from "react";
import PoseNet from "react-posenet";

export default function App() {
  const [video, setVideo] = useState(new Image());
  return (
    <div>
      <video
        muted
        crossOrigin="anonymous"
        src="https://i.imgur.com/PAtL4cd.mp4"
        ref={v => {
          if (v) {
            v.onloadedmetadata = () => {
              setVideo(v);
              setTimeout(() => v.play(), 3000);
            };
          }
        }}
      />
      <PoseNet input={video} />
    </div>
  );
}
