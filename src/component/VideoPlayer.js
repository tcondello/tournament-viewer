import React from "react";

export default function Video(props) {
  return (
    <>
      <div className="grid grid-rows-4 grid-flow-col">
        {props.channels.map((channel) => (
          <div className="flex flex-col transition duration-300 ease-in-out max-w-md py-4 px-8 bg-white rounded-lg my-5 shadow-sm transform hover:-translate-y-1 hover:shadow-xl">
            {channel}
            <div className="flex justify-end mt-4 align-text-bottom ">
              <p className="text-xl font-medium text-indigo-500">Mute</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
