import React from "react";
import TemplateOutlet from "../../TemplateOutlet";
import DataTable from "./DataTable/DataTable";
const LTExtraNameReport = () => {
    return <TemplateOutlet>
        <div className="w-full flex justify-center">
            <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase  ">L&T Extra Names Report</h1>
        </div>
       <DataTable/>
    </TemplateOutlet>
}

export default LTExtraNameReport