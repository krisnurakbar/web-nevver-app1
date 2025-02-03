import React from "react";
import NevverMasterLayout from "../masterLayout/NevverMasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import UsersGridLayer from "../components/UsersGridLayer";


const UsersGridPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <NevverMasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Users List" />

        {/* UsersGridLayer */}
        <UsersGridLayer />

      </NevverMasterLayout>

    </>
  );
};

export default UsersGridPage; 
