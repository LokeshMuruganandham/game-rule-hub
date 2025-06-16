
import React from "react";

interface RequestBannerProps {
  gameName: string;
}

const RequestBanner = ({ gameName }: RequestBannerProps) => {
  return (
    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <p className="text-blue-800 text-sm">
        <strong>Requesting:</strong> {gameName}
      </p>
    </div>
  );
};

export default RequestBanner;
