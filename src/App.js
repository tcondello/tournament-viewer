import { React, useState } from "react";
import { useForm } from "react-hook-form";
import {
  TrashIcon,
  VolumeUpIcon,
  VolumeOffIcon,
  PlayIcon,
  PauseIcon,
  EyeIcon,
  EyeOffIcon
} from "@heroicons/react/outline";
import "./App.css";
// import Video from "./component/VideoPlayer";


// TODO: highlight unmuted screen
// TODO: When dragged to the right pause play
// TODO: Button to pause and remove from main view
// TODO: reset button
// TODO: error handling

function App() {
  const { register, handleSubmit } = useForm();
  const [channelArray, setChannelArray] = useState([
    { channelName: "channel1", id: 0, isMuted: true, isPlaying: true, isVisable: true },
    { channelName: "channel2", id: 1, isMuted: true, isPlaying: true, isVisable: true },
    { channelName: "channel3", id: 2, isMuted: true, isPlaying: true, isVisable: true },
  ]);

  // STATE FUNCTIONS
  const addChannel = (data, e) => {
    if (
      !channelArray.some(
        (doesExist) => doesExist.channelName === data["channelName"]
      )
    ) {
      setChannelArray([
        ...channelArray,
        {
          channelName: data["channelName"],
          // look at the id might need to be length - 1
          id: channelArray.length,
          isMuted: true,
          isPlaying: true,
          isVisable: true
        },
      ]);
      // reset form
      e.target.reset();
    }
  };
  const removeChannel = (channelID) => {
    const newChannel = channelArray.filter(
      (channel) => channel.id !== channelID
    );
    setChannelArray([...newChannel]);
  };

//=========================================================
  // GlobalMuteButton
  const GlobalMuteButton = () => {
    const toggleGlobalMute = () => {
      setChannelArray(prev => prev.map(c => {
      let updatedChannel = {...c};
        updatedChannel.isMuted = true;      
      return updatedChannel
    }))}
    return (
      <div>
        <button onClick={toggleGlobalMute}>Mute All <VolumeOffIcon className="h-5 w-5 text" /></button>
      </div>
    );
  };
  // ResetViewButton
  const ResetViewButton = () => {
    const ResetView = () => {
      setChannelArray(prev => prev.map(c => {
      let updatedChannel = {...c};
        updatedChannel.isVisable = true;
      return updatedChannel
    }))}
    return (
      <div>
        <button onClick={ResetView}>
        Reset View
        <EyeIcon className="h-5 w-5 text" />          
        </button>
      </div>
    );
  };
//=========================================================

// TODO: On Hover show name of button
// TODO: 

//=========================================================
  // MuteButton
  const MuteButton = (props) => {
    const toggleMuted = () => {
      setChannelArray(prev => prev.map(c => {
      let updatedChannel = {...c};
      if (updatedChannel.id === props.channel.id) {
        updatedChannel.isMuted = updatedChannel.isMuted === false ? true : false;
      }
      return updatedChannel
    }))}
    return (
      <div>
        <button onClick={toggleMuted}>
          {props.channel.isMuted 
            ? <VolumeOffIcon className="h-5 w-5 text" />
            : <VolumeUpIcon className="h-5 w-5 text-red-600" />
          }
        </button>
      </div>
    );
  };
  // Playbutton
  const PlayButton = (props) => {
    const togglePlay = () => {
      setChannelArray(prev => prev.map(c => {
      let updatedChannel = {...c};
      if (updatedChannel.id === props.channel.id) {
        updatedChannel.isPlaying = updatedChannel.isPlaying === false ? true : false;
      }
      return updatedChannel
    }))}
    return (
      <div>
        <button onClick={togglePlay}>
          {props.channel.isPlaying
            ? <PlayIcon className="h-5 w-5 text" />          
            : <PauseIcon className="h-5 w-5 text" />
          }
        </button>
      </div>
    );
  };
  // HideButton (maybe pause on hide // play on unHide)
  const HideButton = (props) => {
    const toggleView = () => {
      setChannelArray(prev => prev.map(c => {
      let updatedChannel = {...c};
      if (updatedChannel.id === props.channel.id) {
        updatedChannel.isVisable = updatedChannel.isVisable === false ? true : false;
      }
      return updatedChannel
    }))}
    return (
      <div>
        <button onClick={toggleView}>
        {props.channel.isVisable
            ? <EyeIcon className="h-5 w-5 text" />          
            : <EyeOffIcon className="h-5 w-5 text" />
        }
        </button>
      </div>
    );
  };
//=========================================================

  return (
    <div className="min-w-screen min-h-screen bg-gray-100">
      <div className="bg-blue-200 py-6 flex items-center justify-center min-w-screen px-4">
        {/* TODO: DRESS UP SEARCH BAR AND BUTTON  */}
        <form onSubmit={handleSubmit(addChannel)}>
          <input
            placeholder="Channel Name"
            {...register("channelName", {
              required: true,
              maxLength: 25,
              minLength: 4,
              pattern: /^[a-zA-Z0-9_]{4,25}$/,
            })}
          />
          <input type="submit" value="+ Add" />
        </form>
        <div>
          <ResetViewButton />
          <GlobalMuteButton />
        </div>
      </div>
      <div className="grid grid-rows-4 grid-flow-col gap-x-2">
        {channelArray.map((channel) => (
          // Card Container
          <div
            className={"transition duration-300 ease-in-out max-w-md py-4 px-8 bg-white rounded-lg my-5 shadow-sm transform hover:-translate-y-1 hover:shadow-xl " + (channel.isMuted ? '' : 'outline outline-offset-2 outline-blue-500')}
            // outline outline-offset-2 outline-blue-500
            key={channel.id}
          >
            <div className="flex flex-row justify-between">
              <p className="text-gray-800 text-xl font-semibold">
                {channel.channelName}
              </p>
              <button
                className="right-0 top-0 text-xl font-medium text-indigo-500"
                onClick={removeChannel.bind(this, channel.id)}
              >
                <TrashIcon className="h-5 w-5 text-red-600" />
              </button>
            </div>
            <div>
              THIS HOLDS THE VIDEO
            </div>
            <div>
                <MuteButton channel={channel} />
                <PlayButton channel={channel} />
                <HideButton channel={channel} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
