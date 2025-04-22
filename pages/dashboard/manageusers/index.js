import Dashboardlayout from "@/components/Layout/Dashboardlayout";
import { HiOutlineUser } from "react-icons/hi2";
import React, { useState } from "react";
import Popup from "@/components/Popup";
import UserTableLayout from "@/components/Table/UserTable";

export default function ManagerUsers() {
 

  return (
    <Dashboardlayout heading={'Managing Users'}>
      <div className="users-wrap space-y-6">
         

        <UserTableLayout />
      </div>

     
    </Dashboardlayout>
  );
}
