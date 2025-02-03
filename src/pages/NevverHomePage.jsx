import React from "react";
import NevverMasterLayout from "../masterLayout/NevverMasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import DashBoardLayerOne from "../components/DashBoardLayerOne";

const HomePageOne = () => {
  return (
    <>
      {/* MasterLayout */}
      <NevverMasterLayout >
        {/* Breadcrumb */}
        <Breadcrumb title="AI" />


        {/* DashBoardLayerOne */}
        <DashBoardLayerOne />

      </NevverMasterLayout>
    </>
  );
};

export default HomePageOne;
