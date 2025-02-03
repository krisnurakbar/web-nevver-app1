import React from "react";
import NevverMasterLayout from "../masterLayout/NevverMasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import UsersListLayer from "../components/UsersListLayer";


const UsersListPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <NevverMasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Users List" />

        {/* UsersListLayer */}
        <UsersListLayer />

      </NevverMasterLayout>

    </>
  );
};

export default UsersListPage; 
