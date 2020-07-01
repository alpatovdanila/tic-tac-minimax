import React, { useState, useEffect } from "react";

export const StoneO = () => {
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    setEnter(true);
    return () => {
      setEnter(false);
    };
  }, []);

  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      className={`stone stone_o ${enter ? " stone_enter" : ""}`}
    >
      <path d="M40 0C62.0914 0 80 17.9086 80 40C80 57.5969 68.6371 72.5399 52.8484 77.8918C50.3893 78.7253 48 76.772 48 74.1756V74.1756C48 72.3017 49.2802 70.6913 51.0391 70.0449C63.2729 65.5485 72 53.7934 72 40C72 22.3269 57.6731 8 40 8C22.3269 8 8.00001 22.3269 8.00001 40C8.00001 53.7934 16.7271 65.5485 28.9609 70.0449C30.7198 70.6913 32 72.3017 32 74.1756V74.1756C32 76.772 29.6107 78.7254 27.1516 77.8918C11.3629 72.5399 -2.16192e-06 57.5969 0 40C0 17.9086 17.9086 -2.7141e-06 40 0Z" />
    </svg>
  );
};
