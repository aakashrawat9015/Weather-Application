const InfoCard = ({ label, value, unit, color = "text-white", children }) => {
  return (
    <div className="flex flex-col items-center justify-center 
                    px-4 py-3 mx-w-xs p-3 rounded-lg shadow-md
                    bg-linear-to-br from-gray-800 via-gray-900 to-gray-900">
      <p className="text-sm font-semibold text-gray-300">{label}</p>
      <p className={`text-lg font-bold ${color}`}>
        {value !== null && value !== undefined ? `${value}${unit || ""}` : "N/A"}
      </p>
      {children}
    </div>
  );
};
export default InfoCard;