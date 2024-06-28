import React from "react";
import RecordTable from "./recordtable";
import prisma from "@/lib/prisma";

const RecordList = async () => {
  return (
    <main>
      <RecordTable />
    </main>
  );
};

export default RecordList;
