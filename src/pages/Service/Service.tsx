import React, { useState } from "react";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import { MdDeleteOutline, MdOutlineEdit, MdOutlineDone, MdMonitor, MdArrowBackIos, MdArrowForwardIos, MdLastPage, MdFirstPage, MdAdd } from "react-icons/md";
import StandardTypeForm from "./ServiceForms/ServiceTypeForm/ServiceTypeForm";
import StandardForm from "./ServiceForms/StandardForm/StandardForm";
const Service = () => {
    const serviceFormSection = ["L&T Service Type", "Standard Service"]
    const [activeSection, setActiveAction] = useState(0)
    // console.log(activeSection)
    return <div className=" h-[72vh] overflow-y-scroll bg-whiteColor p-4  overflow-hidden sm:p-8 w-[95%] m-auto border-[1px] border-borderColor border-solid rounded-xl shadow-smShadow ">
        <OutletLayoutHeader heading="Service Form">
            <BorderButton buttonText="add" icon={<MdAdd />} isIcon />
            <BorderButton buttonText="edit" icon={<MdOutlineEdit />} isIcon />
            <BorderButton buttonText="submit" icon={<MdOutlineDone />} isIcon />
            <BorderButton buttonText="delete" icon={<MdDeleteOutline />} isIcon />
            <BorderButton buttonText="previous" icon={<MdArrowBackIos />} isIcon />
            <BorderButton buttonText="next" icon={<MdArrowForwardIos />} isRightIcon />
            <BorderButton buttonText="main screen" icon={<MdMonitor />} isIcon />
            <BorderButton buttonText="first" icon={<MdFirstPage />} isIcon />
            <BorderButton buttonText="last" icon={<MdLastPage />} isRightIcon />
        </OutletLayoutHeader>
        {/* SECTIONS STARTS */}
        <div className="flex items-center  w-full  mt-10 border-b-[1px] border-b-solid border-b-borderColor" >
            {serviceFormSection?.map((data: string, id: number) => <p className={`ml-3 px-3 py-2 text-xs sm:text-sm font-medium rounded-t-lg cursor-pointer ${activeSection === id ? "bg-primaryColorLight text-whiteColor" : "bg-whiteColor"}`} onClick={() => setActiveAction(id)}>{data}</p>)}
        </div>
        {/* SECTIONS ENDS */}
        {/* SECTIONS FORM STARTS */}
        <div className="mt-10">
            {activeSection === 0 ? <StandardTypeForm /> : <StandardForm />}
        </div>
        {/* SECTIONS FORM ENDS */}
    </div>
}
export default Service