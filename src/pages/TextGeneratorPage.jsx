import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import TextGeneratorLayer from "../components/TextGeneratorLayer";
import NevverMasterLayout from "../masterLayout/NevverMasterLayout";


const TextGeneratorPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <NevverMasterLayout >

        {/* Breadcrumb */}
        <Breadcrumb title="Text Generator" />

        {/* TextGeneratorLayer */}
        <TextGeneratorLayer />

      </NevverMasterLayout>

    </>
  );
};

export default TextGeneratorPage; 
