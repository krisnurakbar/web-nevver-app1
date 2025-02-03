import React from "react";
import NevverMasterLayout from "../masterLayout/NevverMasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import PagesListLayer from "../components/PagesListLayer";


const PagesListPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <NevverMasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Pages List" />

        {/* PagesListLayer */}
        <PagesListLayer />

      </NevverMasterLayout>

    </>
  );
};

export default PagesListPage; 
