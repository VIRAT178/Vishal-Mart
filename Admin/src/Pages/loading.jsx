import React from "react";

const Loading = ({
  label = "Loading...",
  colorClass = "text-blue-500",
  size = "h-12 w-12",
}) => (
  <div className="flex flex-col justify-center items-center min-h-[150px] gap-2">
    <div
      className={`inline-block ${size} animate-spin rounded-full border-4 border-solid border-current border-r-transparent ${colorClass}`}
      role="status"
      aria-label={label}
    />
    <span className="text-sm font-medium text-gray-500">{label}</span>
  </div>
);

export default Loading;
