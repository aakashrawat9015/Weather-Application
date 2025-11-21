// InfoCard.jsx
import React from 'react';

const InfoCard = ({ label, value, unit, color = "text-white" }) => {
  return (
    <div className="flex flex-col items-center justify-center 
                    w-32 h-24 p-3 rounded-lg shadow-md
                    bg-linear-to-br from-gray-700 via-indigo-950 to-gray-900">
      <p className="text-sm font-semibold text-gray-300">{label}</p>
      <p className={`text-lg font-bold ${color}`}>
        {value !== null && value !== undefined ? `${value}${unit || ""}` : "N/A"}
      </p>
    </div>
  );
};

export default InfoCard;