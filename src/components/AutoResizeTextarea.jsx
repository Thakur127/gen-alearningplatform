import React from "react";
import TextareaAutosize from "react-textarea-autosize";

const AutoResizeTextarea = (rest) => {
  return (
    <div>
      <TextareaAutosize
        {...rest}
        minRows={3}
        className="text-sm w-full p-2 rounded-md text-zinc-800 outline-none focus:border-zinc-800/20 hover:border-zinc-800/25 border bg-transparent"
      />
    </div>
  );
};

export default AutoResizeTextarea;
