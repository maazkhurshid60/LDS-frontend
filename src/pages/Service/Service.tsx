// import React, { useEffect, useState } from "react";
// import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
// import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
// import { MdDeleteOutline, MdOutlineEdit, MdOutlineDone, MdMonitor, MdArrowBackIos, MdArrowForwardIos, MdLastPage, MdFirstPage, MdAdd } from "react-icons/md";
// import StandardTypeForm from "./ServiceForms/ServiceTypeForm/ServiceTypeForm";
// import StandardForm from "./ServiceForms/StandardForm/StandardForm";
// import { useDispatch, useSelector } from "react-redux";
// import { addNewFormAddReducer, getAllServiceFormThunk, getFirstServiceForm, getLastServiceForm, getNextServiceForm, getPreviousServiceForm, moveToStandardFormReducer, savedLTFormDataReducer } from "../../redux/slice/serviceForm";
// import { RootState } from "../../redux/store";
// import DeleteServiceFormModal from "../../components/Modal/DeleteServiceFormModal";
// import { showModalReducer } from "../../redux/slice/showModal";
// import { toast } from "react-toastify";

// const Service = () => {
//     const serviceFormSection = ["L&T Service Type", "Standard Service"];
//     const [activeSection, setActiveAction] = useState(0);  // Default to 0

//     const isNewFormAdding = useSelector((state: RootState) => state.serviceForm.isNewFormAdd);
//     const isDataSaved = useSelector((state: RootState) => state.serviceForm.isDataSaved);
//     const LTData = useSelector((state: RootState) => state.serviceForm.savedLTFormData);
//     const showModal = useSelector((state: RootState) => state?.showModal.isShowModal);
//     const allServiceFormData = useSelector((state: RootState) => state.serviceForm);
//     const serviceFormIndex = useSelector((state: RootState) => state.serviceForm.serviceFormIndex);
//     const moveToStandardForm = useSelector((state: RootState) => state.serviceForm.isMoveToStandardForm);
//     console.log("mv to standard form", moveToStandardForm)
//     const dispatch = useDispatch();

//     const addNewFormFunction = () => {
//         dispatch(addNewFormAddReducer(true));
//     };

//     const cancelAddingFormFunction = () => {
//         localStorage.setItem("serviceFormActiveSection", "0");
//         setActiveAction(0)
//         dispatch(getLastServiceForm())
//         dispatch(savedLTFormDataReducer(""))
//         dispatch(moveToStandardFormReducer(""))
//         dispatch(addNewFormAddReducer(false));
//         window.location.reload();
//     };

//     const addServiceFormFunction = () => {
//         console.log(LTData);
//     };

//     const deleteServiceForm = () => {
//         dispatch(showModalReducer(true));
//     };

//     const sotringActiveSectionFunction = (id: number) => {
//         if (id === 0 && !isDataSaved) {

//             const userConfirmed = window.confirm("Please ensure You made saved changes. If you leave now, your data may be lost if you didnot ensure to make data save. Are you sure you want to continue?");
//             if (userConfirmed) {
//                 setActiveAction(id);
//                 dispatch(moveToStandardFormReducer(""))

//                 localStorage.setItem("serviceFormActiveSection", id.toString());
//             }
//         } else {
//             setActiveAction(id);
//             localStorage.setItem("serviceFormActiveSection", id.toString());
//         }
//     };

//     useEffect(() => {
//         // alert(",.,")
//         // toast.success("moving to standard for")
//         if (moveToStandardForm === "Standard") {
//             setActiveAction(1);
//             localStorage.setItem("serviceFormActiveSection", "1");
//         }
//     }, [moveToStandardForm])
// console.log("all service",allServiceFormData?.allServiceFormData?.length ===0 && !isNewFormAdding)
// console.log("all servicedata",allServiceFormData?.allServiceFormData , !isNewFormAdding)

//     return (
//         <>
//             {showModal ? (
//                 <DeleteServiceFormModal id={allServiceFormData?.allServiceFormData[serviceFormIndex]?._id} />
//             ) : (
//                 <div className="bg-whiteColor p-4 overflow-hidden sm:p-8 w-[95%] m-auto border-[1px] border-borderColor border-solid rounded-xl shadow-smShadow">
//                     <OutletLayoutHeader heading="Service Form">
//                         {isNewFormAdding ? (
//                             <>
//                                 {isDataSaved && <BorderButton buttonText="add" icon={<MdAdd />} isIcon onClick={addServiceFormFunction} />}
//                                 <BorderButton buttonText="cancel" onClick={cancelAddingFormFunction} />
//                             </>
//                         ) : (
//                             <>
//                                 <BorderButton buttonText="add" icon={<MdAdd />} isIcon onClick={addNewFormFunction} />
//                                 <BorderButton buttonText="delete" icon={<MdDeleteOutline />} isIcon onClick={deleteServiceForm} />
//                                 <BorderButton buttonText="previous" icon={<MdArrowBackIos />} isIcon onClick={() => dispatch(getPreviousServiceForm())} />
//                                 <BorderButton buttonText="next" icon={<MdArrowForwardIos />} isRightIcon onClick={() => dispatch(getNextServiceForm())} />
//                                 <BorderButton buttonText="first" icon={<MdFirstPage />} isIcon onClick={() => dispatch(getFirstServiceForm())} />
//                                 <BorderButton buttonText="last" icon={<MdLastPage />} isRightIcon onClick={() => dispatch(getLastServiceForm())} />
//                             </>
//                         )}
//                     </OutletLayoutHeader>
//                         {allServiceFormData?.allServiceFormData?.length === 0 && !isNewFormAdding ? <p>Service Form is empty</p> : <>
//                             <div className="flex items-center w-full mt-10 border-b-[1px] border-b-solid border-b-borderColor">
//                         {serviceFormSection.map((data: string, id: number) => (
//                             <p
//                                 key={id}
//                                 className={`ml-3 px-3 py-2 text-xs sm:text-sm font-medium rounded-t-lg cursor-pointer ${activeSection === id ? "bg-primaryColorLight text-whiteColor" : "bg-whiteColor"
//                                     }`}
//                                 onClick={() => sotringActiveSectionFunction(id)}
//                             >
//                                 {data}
//                             </p>
//                         ))}
//                     </div>
//                     <div className="mt-10">
//                         {activeSection === 0 ? <StandardTypeForm /> : <StandardForm />}
//                     </div>
//                     </>}

//                 </div>
//             )}
//         </>
//     );
// };

// export default Service;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import { MdDeleteOutline, MdOutlineEdit, MdOutlineDone, MdMonitor, MdArrowBackIos, MdArrowForwardIos, MdLastPage, MdFirstPage, MdAdd } from "react-icons/md";
import StandardTypeForm from "./ServiceForms/ServiceTypeForm/ServiceTypeForm";
import StandardForm from "./ServiceForms/StandardForm/StandardForm";
import { addNewFormAddReducer, getAllServiceFormThunk, getCancelIsSearchServiceForm, getFirstServiceForm, getLastServiceForm, getNextServiceForm, getPreviousServiceForm, moveToStandardFormReducer, savedLTFormDataReducer } from "../../redux/slice/serviceForm";
import { RootState } from "../../redux/store";
import DeleteServiceFormModal from "../../components/Modal/DeleteServiceFormModal";
import { showModalReducer } from "../../redux/slice/showModal";
import { toast } from "react-toastify";

const Service = () => {
    const serviceFormSection = ["L&T Service Type", "Standard Service"];
    const [activeSection, setActiveSection] = useState(0);  // Default to 0

    const dispatch = useDispatch();

    const allServiceFormData = useSelector((state: RootState) => state.serviceForm.allServiceFormData);
    const isNewFormAdding = useSelector((state: RootState) => state.serviceForm.isNewFormAdd);
    const isDataSaved = useSelector((state: RootState) => state.serviceForm.isDataSaved);
    const LTData = useSelector((state: RootState) => state.serviceForm.savedLTFormData);
    const showModal = useSelector((state: RootState) => state?.showModal.isShowModal);
    const serviceFormIndex = useSelector((state: RootState) => state.serviceForm.serviceFormIndex);
    const moveToStandardForm = useSelector((state: RootState) => state.serviceForm.isMoveToStandardForm);
    const selectedSearchServiceFormData = useSelector((state: RootState) => state.serviceForm.selectedSearchServicetData)
    const isSearchServiceForm = useSelector((state: RootState) => state.serviceForm.isSearchServiceForm)

    console.log("All Service Form Data:", allServiceFormData);

    // useEffect(() => {
    //     dispatch(getAllServiceFormThunk()); // Fetch data on component mount
    // }, [dispatch]);

    useEffect(() => {
        if (moveToStandardForm === "Standard") {
            console.log("moved to standard form")
            setActiveSection(1);
            localStorage.setItem("serviceFormActiveSection", "1");
        }
    }, [moveToStandardForm]);

    const addNewFormFunction = () => {
        dispatch(addNewFormAddReducer(true));
    };

    const cancelAddingFormFunction = () => {
        localStorage.setItem("serviceFormActiveSection", "0");
        setActiveSection(0);
        dispatch(getLastServiceForm());
        dispatch(savedLTFormDataReducer(""));
        dispatch(moveToStandardFormReducer(""));
        dispatch(addNewFormAddReducer(false));
        window.location.reload(); // This should be used carefully
    };

    const addServiceFormFunction = () => {
        console.log(LTData);
    };

    const deleteServiceForm = () => {
        dispatch(showModalReducer(true));

    };

    const cancelSearchFormFunction = () => {
        dispatch(getCancelIsSearchServiceForm())
        window.location.reload();
    }

    const sortingActiveSectionFunction = (id: number) => {
        if (id === 0 && !isDataSaved) {
            const userConfirmed = window.confirm("Please ensure you have saved changes. If you leave now, your data may be lost. Are you sure you want to continue?");
            if (userConfirmed) {
                setActiveSection(id);
                dispatch(moveToStandardFormReducer(""));
                localStorage.setItem("serviceFormActiveSection", id.toString());
            }
        } else {
            setActiveSection(id);
            localStorage.setItem("serviceFormActiveSection", id.toString());
        }
    };


    useEffect(() => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<____________________", localStorage.getItem("accessToken"))
        dispatch(getAllServiceFormThunk())
    }, [])

    return (
        <>
            {showModal ? (
                <DeleteServiceFormModal id={allServiceFormData[serviceFormIndex]?._id} />
            ) : (
                <div className="bg-whiteColor p-4 overflow-hidden sm:p-8 w-[95%] m-auto border-[1px] border-borderColor border-solid rounded-xl shadow-smShadow">
                    <OutletLayoutHeader heading="Service Form">
                        {isNewFormAdding ? (
                            <>
                                {isDataSaved && <BorderButton buttonText="add" icon={<MdAdd />} isIcon onClick={addServiceFormFunction} />}
                                <BorderButton buttonText="cancel" onClick={cancelAddingFormFunction} />
                            </>
                        ) : isSearchServiceForm || selectedSearchServiceFormData?.length > 0 ?
                            (<BorderButton buttonText="cancel" onClick={cancelSearchFormFunction} />)
                            : (
                                <>
                                    <BorderButton buttonText="add" icon={<MdAdd />} isIcon onClick={addNewFormFunction} />
                                    <BorderButton buttonText="delete" icon={<MdDeleteOutline />} isIcon onClick={deleteServiceForm} />
                                    <BorderButton buttonText="previous" icon={<MdArrowBackIos />} isIcon onClick={() => dispatch(getPreviousServiceForm())} />
                                    <BorderButton buttonText="next" icon={<MdArrowForwardIos />} isRightIcon onClick={() => dispatch(getNextServiceForm())} />
                                    <BorderButton buttonText="first" icon={<MdFirstPage />} isIcon onClick={() => dispatch(getFirstServiceForm())} />
                                    <BorderButton buttonText="last" icon={<MdLastPage />} isRightIcon onClick={() => dispatch(getLastServiceForm())} />
                                </>
                            )}
                    </OutletLayoutHeader>

                    {(!allServiceFormData?.length && !isNewFormAdding) ? (
                        <p className="mt-10 text-center">Service Form is empty</p>
                    ) : (
                        <>
                            <div className="flex items-center w-full mt-10 border-b-[1px] border-b-solid border-b-borderColor">
                                {serviceFormSection.map((data: string, id: number) => (
                                    <p
                                        key={id}
                                        className={`ml-3 px-3 py-2 text-xs sm:text-sm font-medium rounded-t-lg cursor-pointer ${activeSection === id ? "bg-primaryColorLight text-whiteColor" : "bg-whiteColor"
                                            }`}
                                        onClick={() => sortingActiveSectionFunction(id)}
                                    >
                                        {data}
                                    </p>
                                ))}
                            </div>
                            <div className="mt-10">
                                {activeSection === 0 ? <StandardTypeForm /> : <StandardForm />}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default Service;

