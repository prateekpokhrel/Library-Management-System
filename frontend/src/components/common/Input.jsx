import React from "react";

const Input = ({ label, ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm text-gray-300">
          {label}
        </label>
      )}

      <input
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none text-white"
        {...props}
      />
    </div>
  );
};

export default Input;