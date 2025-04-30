// ManagerUsers.js
import Dashboardlayout from "@/components/Layout/Dashboardlayout";
import React, { useState } from "react";
import UserTableLayout from "@/components/Table/UserTable";
import { useGetUserListQuery } from "@/lib/redux/services/admin/user-manage.api";
import { LoadingErrorState } from "@/components/Loading/LoadingErrorState";

export default function ManagerUsers() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetUserListQuery({
    page,
    limit: 10,
  });

  return (
    <>
      <Dashboardlayout heading={"Managing Users"}>
        {isError ? (
          <LoadingErrorState isError={isError} />
        ) : isLoading ? (
          <LoadingErrorState isLoading={isLoading} />
        ) : (
          <div className="users-wrap space-y-6">
            <UserTableLayout
              users={data?.data?.users || []}
              pagination={data?.data?.pagination}
              handlePageState={setPage}
            />
          </div>
        )}
      </Dashboardlayout>
    </>
  );
}
