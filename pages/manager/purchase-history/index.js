import Dashboardlayout from "@/components/Layout/Dashboardlayout";
import PurchaseHistoryTable from "@/components/Table/PurchaseHistoryTable";
import React, { useState } from "react";


export default function PurchaseHistory() {
  
  return (
    <Dashboardlayout heading={"Purchase History"}>
      <div className="users-wrap space-y-6">
        <PurchaseHistoryTable />
      </div>
      
    </Dashboardlayout>
  );
}
