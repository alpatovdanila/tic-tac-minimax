import React from "react";
import { saveAs } from "file-saver";
export const Debug = ({ solver }) => {
  const download = () => {
    const cache = JSON.stringify(solver.minimaxCache);
    const blob = new Blob([cache], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "minimax-cache.json");
  };
  return (
    <div
      style={{
        color: "white",
        position: "absolute",
        top: 0,
        left: 0,
        padding: "25px",
        border: `1px solid red`
      }}
    >
      minimax cache length: {Object.keys(solver.minimaxCache).length}
      <br />
      <button onClick={download}>Download minimax cache</button>
    </div>
  );
};
