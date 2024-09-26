import React, { useEffect } from "react";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import { MdDeleteOutline, MdOutlineEdit, MdOutlineDone, MdArrowBackIos, MdArrowForwardIos, MdLastPage, MdFirstPage, MdMonitor, MdAdd } from "react-icons/md";
import Hints from "./Hints/Hints";
import ResultForm from "./ResultForm/ResultForm";
import { useDispatch, useSelector } from "react-redux";
import { addNewResultFormAddReducer, deleteResultFormThunk, emptySearchResultFormDataAddReducer, emptySelectedSearchResultFormAddReducer, getCancelIsSearchServiceForm, getFirstResultFormReducer, getLastResultFormReducer, getNextResultFormReducer, getPreviousResultFormReducer } from "../../redux/slice/resultForm";
import { setMainMenuName, setSubMenuName } from "../../redux/slice/navbarTracking";
import { RootState } from "../../redux/store";
import { deleteServiceFormThunk, getFirstServiceForm, getLastServiceForm, getNextServiceForm, getPreviousServiceForm } from "../../redux/slice/serviceForm";
const Result = () => {
    const allResultForm = useSelector((state: RootState) => state.serviceForm.allServiceFormData)
    const resultFormIndex = useSelector((state: RootState) => state.serviceForm.serviceFormIndex)
    const isNewResultFormAdding = useSelector((state: RootState) => state.resultForm.isNewResultFormAdd)
    const isSearchResultForm = useSelector((state: RootState) => state.resultForm.isSearchResultForm)


    const dispatch = useDispatch()

    const cancelAddingFormFunction = () => {
        dispatch(addNewResultFormAddReducer(false))
    }
    const cancelSearchFormFunction = () => {

        dispatch(getCancelIsSearchServiceForm())
        window.location.reload();
    }
    // USE EFFECT WILL BE CALLED ON PRESSING F10 KEY
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                cancelSearchFormFunction();

            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [cancelSearchFormFunction])
    return <div className=" bg-whiteColor p-2 sm:p-8 w-[95%] m-auto border-[1px] border-borderColor border-solid rounded-xl shadow-smShadow">
        <OutletLayoutHeader heading="Result Form">
            {isNewResultFormAdding ? <BorderButton buttonText="cancel" onClick={cancelAddingFormFunction} />

                : isSearchResultForm ?
                    (<BorderButton buttonText="cancel" onClick={cancelSearchFormFunction} />)
                    :
                    <>

                        <BorderButton buttonText="delete" icon={<MdDeleteOutline />} isIcon onClick={() => dispatch(deleteServiceFormThunk(allResultForm[resultFormIndex]?._id))} />
                        <BorderButton buttonText="previous" icon={<MdArrowBackIos />} isIcon onClick={() => { dispatch(getPreviousServiceForm()), dispatch(emptySelectedSearchResultFormAddReducer()), dispatch(emptySearchResultFormDataAddReducer()) }} />
                        <BorderButton buttonText="next" icon={<MdArrowForwardIos />} isRightIcon onClick={() => { dispatch(getNextServiceForm()), dispatch(emptySelectedSearchResultFormAddReducer()), dispatch(emptySearchResultFormDataAddReducer()) }} />
                        <BorderButton buttonText="main screen" icon={<MdMonitor />} isIcon to="/" onClick={() => { dispatch(setMainMenuName("Operations")), dispatch(setSubMenuName("Service")), dispatch(emptySelectedSearchResultFormAddReducer()), dispatch(emptySearchResultFormDataAddReducer()) }} />
                        <BorderButton buttonText="first" icon={<MdFirstPage />} isIcon onClick={() => { dispatch(getFirstServiceForm()), dispatch(emptySelectedSearchResultFormAddReducer()), dispatch(emptySearchResultFormDataAddReducer()) }} />
                        <BorderButton buttonText="last" icon={<MdLastPage />} isRightIcon onClick={() => { dispatch(getLastServiceForm()), dispatch(emptySelectedSearchResultFormAddReducer()), dispatch(emptySearchResultFormDataAddReducer()) }} />
                    </>
            }

        </OutletLayoutHeader>
        <div className="mt-8">
            <div>
                <h1 className="  font-semibold text-base
                md:text-md
                lg:text-xl">Hints</h1>
                <div className="flex flex-row gap-x-4 mt-2 flex-wrap gap-y-4">
                    <Hints keyName="Esc" label="Cancel" />
                    <Hints keyName="f7 " label="Find" />
                    <Hints keyName="f10" label="Save" />

                </div>
            </div>
            {/* RESULT FORM */}
            <ResultForm />

        </div>
    </div>
}
export default Result