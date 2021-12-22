import React from "react";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
export default function Video() {
  let muted = false;
  let channel = "ninja";
  let height = 200;
  let width = 200;

  //   if offline do something
  return (
    <ReactTwitchEmbedVideo
      channel={channel}
      layout="video"
      autoplay="true"
      muted={muted}
      height={height}
      width={width}
    />
  );
}
