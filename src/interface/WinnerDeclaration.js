import React, { useMemo } from "react";


export const WinnerDeclaration = ({ winner, onClose, enter }) => {
  
  //const lastWinner = winner === null ? lastWinner : winner;

  return (
    <div className={`alert ${enter ? "alert_enter" : ""}`} onClick={onClose}>
      {winner && <>{winner.name} won!</>}
    </div>
  );
};
