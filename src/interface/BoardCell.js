import React from "react";

export const BoardCell = ({ children, ...rest }) => (
  <div className="board__cell" {...rest}>
    {children}
  </div>
);
