import Dashboardlayout from "@/components/Layout/Dashboardlayout";
import React, { useState } from "react";
import Popup from "@/components/Popup";
import InventoryTable from "@/components/Table/InventoryTable";
import { useGetInventoryListQuery } from "@/lib/redux/services/admin/inventory-manage";
import { LoadingErrorState } from "@/components/Loading/LoadingErrorState";

export default function InventoryManage() {
  const [page, setPage] = useState(1);
  const { data, isFetching, isError } = useGetInventoryListQuery({
    page,
    limit: 10,
  });

  return (
    <>
      <Dashboardlayout heading={"Inventory Managerment"}>
        {isError ? (
          <LoadingErrorState isError={isError} />
        ) : isFetching ? (
          <LoadingErrorState isLoading={isFetching} />
        ) : (
          <div className="users-wrap space-y-6">
            <InventoryTable
              users={data?.data?.inventory || []}
              pagination={data?.data?.pagination}
              handlePageState={setPage}
            />
          </div>
        )}
      </Dashboardlayout>
    </>
  );
}
