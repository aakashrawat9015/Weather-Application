const InfoCard = ({ label, value, unit, color = "text-card-foreground", children }) => {
  return (
    <div className="flex flex-col items-center justify-center 
                    px-3 sm:px-4 py-2 sm:py-3 mx-w-xs rounded-lg shadow-md
                    bg-muted border border-border
                    min-w-[100px] sm:min-w-[120px]">
      <p className="text-xs sm:text-sm font-semibold text-muted-foreground">{label}</p>
      <p className={`text-base sm:text-lg font-bold ${color}`}>
        {value !== null && value !== undefined ? `${value}${unit || ""}` : "N/A"}
      </p>
      {children}
    </div>
  );
};
export default InfoCard;