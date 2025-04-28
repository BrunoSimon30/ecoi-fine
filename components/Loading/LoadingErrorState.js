// components/LoadingErrorState.js
import React from "react";

export const LoadingErrorState = ({ isLoading, isError, logoSrc }) => {
  if (isLoading) {
    return (
      <div className="main-bg flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <img
            src={logoSrc}
            alt="Logo"
            width={222}
            height={84}
            className="animate-pulse" // This will add a simple pulse effect to the logo while loading
          />
          <p className="text-lg font-semibold text-gray-600">Loading ......</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="main-bg flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-600">Error loading!</p>
      </div>
    );
  }

  return null;
};
