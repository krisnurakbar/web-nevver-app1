import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import NevverMasterLayout from "../masterLayout/NevverMasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import TextGeneratorNewLayer from "../components/TextGeneratorNewLayer";

const TextGeneratorNewPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <NevverMasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Text Generator" />

        {/* TextGeneratorNewLayer */}
        <TextGeneratorNewLayer />

      </NevverMasterLayout>

    </>
  );
};

export default TextGeneratorNewPage; 
