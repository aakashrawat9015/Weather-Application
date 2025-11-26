import CurrentTemp from "./components/card/CurrentTemp.jsx";
import HourlyForecast from "./components/card/HourlyForecast.jsx";
import DailyForecast from "./components/card/DailyForecast.jsx";
import { Suspense } from "react";
import DailySkeleton from "./components/skeleton/DailySkeleton.jsx";
import CurrentSkeleton from "./components/skeleton/CurrentSkeleton.jsx";
import HourlySkeleton from "./components/skeleton/HourlySkeleton.jsx";
import AdditionalInfo from "./components/card/AdditionalInfo.jsx";


function WeatherContent({ coords }) {

  return (
    <>
      <Suspense fallback={<CurrentSkeleton />}>
        <CurrentTemp coords={coords} />
      </Suspense>

      {/* <Suspense fallback={<HourlySkeleton />}>
      </Suspense> */}
      <AdditionalInfo coords={coords} />

      <Suspense fallback={<HourlySkeleton />}>
        <HourlyForecast coords={coords} />
      </Suspense>
      <Suspense fallback={<DailySkeleton />}>
        <DailyForecast coords={coords} />
      </Suspense>
    </>
  );
}
export default WeatherContent;