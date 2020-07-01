import React from "react";
export const DrawDeclaration = ({ onClose, enter }) => {
  return (
    <div className={`alert ${enter ? "alert_enter" : ""}`} onClick={onClose}>
      That's a draw!
    </div>
  );
};
