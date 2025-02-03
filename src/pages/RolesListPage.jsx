import React from "react";
import NevverMasterLayout from "../masterLayout/NevverMasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import RolesListLayer from "../components/RolesListLayer";


const RolesListPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <NevverMasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Roles List" />

        {/* RolesListLayer */}
        <RolesListLayer />

      </NevverMasterLayout>

    </>
  );
};

export default RolesListPage; 
