import React, { useState, useEffect } from "react";

export const StoneX = () => {
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    setEnter(true);
  }, []);

  return (
    <svg
      width="72"
      height="72"
      viewBox="-4 -4 80 80"
      xmlns="http://www.w3.org/2000/svg"
      className={`stone stone_x ${enter ? " stone_enter" : ""}`}
    >
      <path d="M1.17157 69.0538C2.73367 70.6159 5.26633 70.6159 6.82843 69.0538L69.0538 6.82843C70.6159 5.26633 70.6159 2.73367 69.0538 1.17157C67.4917 -0.390522 64.9591 -0.390519 63.397 1.17158L1.17157 63.397C-0.390523 64.9591 -0.390523 67.4917 1.17157 69.0538ZM1.17157 6.82855C-0.390525 5.26645 -0.390525 2.73378 1.17157 1.17169C2.73367 -0.390407 5.26633 -0.390407 6.82843 1.17169L32.2842 26.6275L26.6274 32.2843L1.17157 6.82855ZM37.9411 43.598L43.5979 37.9412L69.0538 63.3971C70.6159 64.9592 70.6159 67.4918 69.0538 69.0539C67.4917 70.616 64.9591 70.616 63.397 69.0539L37.9411 43.598Z" />
    </svg>
  );
};
