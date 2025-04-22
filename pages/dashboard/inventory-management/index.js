import Dashboardlayout from "@/components/Layout/Dashboardlayout";
import React, { useState } from "react";
import Popup from "@/components/Popup";
import InventoryTable from "@/components/Table/InventoryTable";


export default function InventoryManage() {

  return (
    <Dashboardlayout heading={'Inventory Managerment'}>
      <div className="users-wrap space-y-6">
         

        <InventoryTable />
      </div>

       
    </Dashboardlayout>
  );
}
