import { React, useState } from "react";
import { useForm } from "react-hook-form";
import {
  TrashIcon,
  VolumeUpIcon,
  VolumeOffIcon,
} from "@heroicons/react/outline";
import "./App.css";
// import Video from "./component/VideoPlayer";

// TODO: each video comp needs to have an unmute & Stop/start button
// TODO: mute all button
// TODO: highlight unmuted screen
// TODO: When dragged to the right pause play
// TODO: Button to pause and remove from main view
// TODO: reset button
// TODO: error handling

function App() {
  const { register, handleSubmit } = useForm();
  const [channelArray, setChannelArray] = useState([
    { channelName: "channel1", id: 0, isMuted: true, isPlaying: true },
    { channelName: "channel2", id: 1, isMuted: true, isPlaying: true },
    { channelName: "channel3", id: 2, isMuted: true, isPlaying: true },
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
          id: channelArray.length,
          isMuted: true,
          isPlaying: true,
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
  const updateChannelArray = (muteValue, channelID) => {
    const newState = [...channelArray];
    let obj = newState[channelID];
    obj = { ...obj, isMuted: muteValue };
    setChannelArray([...newState]);
    console.log(obj);
  };

  // CONDITIONAL RENDERING
  const Muted = (props) => {
    const channel = props.channel;
    const unMute_button = () => {
      updateChannelArray("isMuted", false, channel.id);
    };
    const mute_button = () => {
      setChannelArray((prevState) => {
        return prevState.map((i) => {
          if (channel.id === i.id) {
            i.isMuted = true;
            console.log(i);
          }
          return i;
        });
      });
    };
    return (
      <div>
        <button className="px-2" onClick={mute_button}>
          Mute Button
        </button>
        <button onClick={unMute_button}>UnMute Button</button>
      </div>
    );
  };

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
      </div>
      <div className="grid grid-rows-4 grid-flow-col gap-x-2">
        {channelArray.map((channel, idx) => (
          // Card Container
          <div
            className="transition duration-300 ease-in-out max-w-md py-4 px-8 bg-white rounded-lg my-5 shadow-sm transform hover:-translate-y-1 hover:shadow-xl"
            key={idx}
          >
            <div className="flex flex-row justify-between">
              <p className="text-gray-800 text-xl font-semibold">
                {channel.channelName}
              </p>
              <Muted channel={channel} />

              <button
                className="right-0 top-0 text-xl font-medium text-indigo-500"
                onClick={removeChannel.bind(this, channel.id)}
              >
                <TrashIcon className="h-5 w-5 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
