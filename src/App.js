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

// TODO: Get buttons on cards to look nice
// TODO: Get VideoPlayer wired up
//        - Play working
//        - Mute working
// TODO: When dragged to the right pause play
// TODO: Button to pause and remove from main view
// TODO: Box Size slider??????
// TODO: Volume slider
// TODO: error handling
// If I get to this TODO then I can refactor or if I hit over 500 lines which ever comes first

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
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={toggleGlobalMute}><VolumeOffIcon className="h-10 w-10 text" /> Mute All</button>
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
      <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={ResetView}>        
        <EyeIcon className="h-10 w-10 text" />          
        Reset View
      </button>
    );
  };
//=========================================================

// TODO: On Hover show name of button
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
            ? <VolumeOffIcon className="h-10 w-10 text" />
            : <VolumeUpIcon className="h-10 w-10 text-red-600" />
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
            ? <PlayIcon className="h-10 w-10 text" />          
            : <PauseIcon className="h-10 w-10 text" />
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
            ? <EyeIcon className="h-10 w-10 text" />          
            : <EyeOffIcon className="h-10 w-10 text" />
        }
        </button>
      </div>
    );
  };
//=========================================================

  return (
    <div className="min-w-screen min-h-screen bg-gray-100">
      <div className="bg-blue-400 py-4 px-4"> 
        {/* TODO: DRESS UP SEARCH BAR AND BUTTON  
              If length > 3 min the search bar 
        
        */}
        <form className="flex flex-row" onSubmit={handleSubmit(addChannel)}>
          <input
            className="w-full rounded-tl-full rounded-bl-full py-4 px-4"
            placeholder="Channel Name"
            {...register("channelName", {
              required: true,
              maxLength: 25,
              minLength: 4,
              pattern: /^[a-zA-Z0-9_]{4,25}$/,
            })}
          />
          <input className="bg-yellow-400 rounded-tr-full rounded-br-full hover:bg-red-300 py-4 px-4" type="submit" value="+ Add" />
        </form>
      </div>
      <div className="flex flex-row">
        <ResetViewButton />
        <GlobalMuteButton />
      </div>
      <div className="grid grid-col-6 grid-flow-col gap-x-2">
        {channelArray.map((channel) => (
// Card Container ==========================================================================================
          <div
            className={"transition duration-300 ease-in-out max-w-md py-4 px-8 bg-white rounded-lg my-5 shadow-sm transform hover:-translate-y-1 hover:shadow-xl " + (channel.isMuted ? '' : 'outline-double outline-offset-2 outline-blue-500')}
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
{/* VIDEO PLAYER DIV  */}
            <div 
              className={(channel.isVisable ? 'show' : 'hidden')}
            >
              <img src="https://static-cdn.jtvnw.net/previews-ttv/live_user_nickmercs-440x248.jpg" alt="Apex Legends"/>
            </div>
            <div className="flex flex-row justify-between">
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
