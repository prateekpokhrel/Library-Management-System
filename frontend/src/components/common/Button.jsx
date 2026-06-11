import React from "react";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-primary hover:bg-indigo-500 text-white shadow-xl hover:scale-105",
    secondary:
      "bg-secondary hover:bg-purple-500 text-white shadow-xl hover:scale-105",
    outline:
      "border border-white/20 bg-white/5 hover:bg-white/10 text-white",
  };

  return (
    <button
      className={`px-6 py-3 rounded-2xl transition-all duration-300 font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;