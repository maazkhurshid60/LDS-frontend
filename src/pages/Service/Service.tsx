import React, { useEffect, useState } from "react";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import { MdDeleteOutline, MdOutlineEdit, MdOutlineDone, MdMonitor, MdArrowBackIos, MdArrowForwardIos, MdLastPage, MdFirstPage, MdAdd } from "react-icons/md";
import StandardTypeForm from "./ServiceForms/ServiceTypeForm/ServiceTypeForm";
import StandardForm from "./ServiceForms/StandardForm/StandardForm";
import { useDispatch, useSelector } from "react-redux";
import { addNewFormAddReducer, getAllServiceFormThunk, getFirstServiceForm, getLastServiceForm, getNextServiceForm, getPreviousServiceForm } from "../../redux/slice/serviceForm";
import { RootState } from "../../redux/store";
import DeleteServiceFormModal from "../../components/Modal/DeleteServiceFormModal";
import { showModalReducer } from "../../redux/slice/showModal";
const Service = () => {
    const serviceFormSection = ["L&T Service Type", "Standard Service"]
    const [activeSection, setActiveAction] = useState( 0 ||localStorage.getItem("serviceFormActiveSection"))
    const isNewFormAdding = useSelector((state: RootState) => state.serviceForm.isNewFormAdd)
    const isDataSaved = useSelector((state: RootState) => state.serviceForm.isDataSaved)
    const LTData = useSelector((state: RootState) => state.serviceForm.savedLTFormData)
    const showModal = useSelector((state: RootState) => state?.showModal.isShowModal)
    const allServiceFormData = useSelector((state: RootState) => state.serviceForm.allServiceFormData)
    const serviceFormIndex = useSelector((state: RootState) => state.serviceForm.serviceFormIndex)
    console.log("service>>>>>>>>>>", allServiceFormData[serviceFormIndex])
    const dispatch = useDispatch()
    // console.log("isNewFormAdding",isNewFormAdding)

    // ADDING NEW FORM CHECKING 
    const addNewFormFunction = () => {
        dispatch(addNewFormAddReducer(true))
    }
    // CANCEL ADDING FORM CHECKING IT SHOULD BE TRUE
    const cancelAddingFormFunction = () => {
        dispatch(addNewFormAddReducer(false))

    }
    // ADDING DATA OF SERVICE DATA
    const addServiceFormFunction = () => {
        console.log(LTData)
    }
    // DELETE SERVICE FORM
    const deleteServiceForm = () => {
        dispatch(showModalReducer(true))
    }
    const sotringActiveSectionFunction = (id) => {

        localStorage.setItem("serviceFormActiveSection", id)
        const activeSectionString = localStorage.getItem("serviceFormActiveSection")
        // if (activeSectionNo !== null && typeof activeSectionNo === 'number') {
        //     console.log("active section<><><><><>",activeSectionNo)
        const activeSectionNumber =activeSectionString && parseInt(activeSectionString)
        setActiveAction(activeSectionString);
        // }
    }
    
    




    return <> {showModal ? <DeleteServiceFormModal id={allServiceFormData[serviceFormIndex]?._id} /> : <div className="bg-whiteColor p-4  overflow-hidden sm:p-8 w-[95%] m-auto border-[1px] border-borderColor border-solid rounded-xl shadow-smShadow ">
        <OutletLayoutHeader heading="Service Form">
            {isNewFormAdding ?
                <>
                    {isDataSaved && <BorderButton buttonText="add" icon={<MdAdd />} isIcon onClick={addServiceFormFunction} />}
                    <BorderButton buttonText="cancel" onClick={cancelAddingFormFunction} />
                </>
                :
                <>
                    <BorderButton buttonText="add" icon={<MdAdd />} isIcon onClick={addNewFormFunction} />
                    {/* <BorderButton buttonText="edit" icon={<MdOutlineEdit />} isIcon />
                    <BorderButton buttonText="submit" icon={<MdOutlineDone />} isIcon /> */}
                    <BorderButton buttonText="delete" icon={<MdDeleteOutline />} isIcon onClick={deleteServiceForm} />
                    <BorderButton buttonText="previous" icon={<MdArrowBackIos />} isIcon onClick={() => dispatch(getPreviousServiceForm())} />
                    <BorderButton buttonText="next" icon={<MdArrowForwardIos />} isRightIcon onClick={() => dispatch(getNextServiceForm())} />
                    {/* <BorderButton buttonText="main screen" icon={<MdMonitor />} isIcon /> */}
                    <BorderButton buttonText="first" icon={<MdFirstPage />} isIcon onClick={() => dispatch(getFirstServiceForm())} />
                    <BorderButton buttonText="last" icon={<MdLastPage />} isRightIcon onClick={() => dispatch(getLastServiceForm())} /></>}

        </OutletLayoutHeader>
        {/* SECTIONS STARTS */}
        <div className="flex items-center  w-full  mt-10 border-b-[1px] border-b-solid border-b-borderColor" >
            {serviceFormSection?.map((data: string, id: number) => <p className={`ml-3 px-3 py-2 text-xs sm:text-sm font-medium rounded-t-lg cursor-pointer ${activeSection === JSON.stringify(id) ? "bg-primaryColorLight text-whiteColor" : "bg-whiteColor"}`} onClick={() => sotringActiveSectionFunction(id)}>{data}</p>)}
        </div>
        {/* SECTIONS ENDS */}
        {/* SECTIONS FORM STARTS */}
        <div className="mt-10">
            {activeSection === "0" ? <StandardTypeForm /> : <StandardForm />}
        </div>
        {/* SECTIONS FORM ENDS */}
    </div>}
    </>
}
export default Service