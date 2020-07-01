import React from "react";

export const ScoresCounter = ({ scores }) => {
  const [player, enemy] = scores;
  return (
    <div className={"scores"}>
      {Array.from({ length: player }, (_, i) => i).map(i => (
        <div className={"scores__score scores__score_x"} key={i}/>
      ))}
      {Array.from({ length: enemy }, (_, i) => i).map(i => (
        <div className={"scores__score scores__score_o"}  key={i}/>
      ))}
    </div>
  );
};
