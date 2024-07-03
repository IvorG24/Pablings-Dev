import React from "react";
import AddBarber from "./addbarber";

import AddSchedule from "./addschedule";

const BarberList = async () => {
  return (
    <main>
      <div className="flex flex-wrap w-full gap-10">
        <AddBarber />
        <AddSchedule />
      </div>
    </main>
  );
};

export default BarberList;
