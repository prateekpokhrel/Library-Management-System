import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`glass rounded-3xl p-6 shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;