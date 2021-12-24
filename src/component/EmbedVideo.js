import {React, useState} from "react";
import ReactPlayer from 'react-player'
import {EyeIcon, EyeOffIcon, PauseIcon, PlayIcon, VolumeOffIcon, VolumeUpIcon} from "@heroicons/react/outline";

// This expects props.channel to be the channelName
export default function VideoPlayer(prop) {
  const [state, setState] = useState({
    url: "https://www.twitch.tv/"+ prop.channel,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.5,
    muted: prop.isMuted,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    width: '100%',
    height: '100%'
  })
  // remember inline styles are passed via the style prop in ReactPlayer see Docs
  // how will I globally pass mute up to this component?
// TODO: On Hover show name of button
//=========================================================
//   const handleVolumeChange = e => {
//     setState(state, { volume: parseFloat(e.target.value) })
//   }

// FIGURE OUT HOW TO DO GLOBAL MUTE
//

  const MuteButton = () => {
    const handleToggleMuted = () => {
      setState(prevState => ({...prevState, muted: !prevState.muted}))
        prop.isMutedCallback(prop.channel)
    }
    return (
        <button onClick={handleToggleMuted}>
          {state.muted
              ? <VolumeOffIcon className="h-10 w-10 text"/>
              : <VolumeUpIcon className="h-10 w-10 text-red-600"/>
          }
        </button>
    )
  }
  const PlayButton = () => {
      const handlePlayPause = () => {
        setState(prevState => ({...prevState, playing: !prevState.playing}))
      }
    return (
        <div>
          <button onClick={handlePlayPause}>
            {state.playing
                ? <PlayIcon className="h-10 w-10 text" />
                : <PauseIcon className="h-10 w-10 text" />
            }
          </button>
        </div>
    );
  };
  // HideButton (maybe pause on hide // play on unHide) need to see how to do this now with reactPlayer
  const HideButton = (props) => {
    const toggleView = () => {
      setState(state, {isVisible: !state.isVisible})
    }
    return (
        <div>
          <button onClick={toggleView}>
            {state.isVisible
                ? <EyeIcon className="h-10 w-10 text" />
                : <EyeOffIcon className="h-10 w-10 text" />
            }
          </button>
        </div>
    );
  };
//=========================================================

  //   if offline do something
  return (
      <>
        {/* this might not be doing what i think it is */}
        <ReactPlayer {...state}/>
        <MuteButton />
        <PlayButton />
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => setState(prevState => ({...prevState, url: null}))}>NULL it</button>
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => setState(prevState => ({...prevState, url: "https://www.twitch.tv/"+ prop.channel}))}>Load it</button>
          <h1>{prop.isMuted.toString()}</h1>
      </>
  );
}