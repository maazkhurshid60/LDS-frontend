import React from "react";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import { MdDeleteOutline, MdOutlineEdit, MdOutlineDone, MdArrowBackIos, MdArrowForwardIos, MdLastPage, MdFirstPage, MdMonitor, MdAdd } from "react-icons/md";
import Hints from "./Hints/Hints";
import ResultForm from "./ResultForm/ResultForm";
import { useDispatch, useSelector } from "react-redux";
import { addNewResultFormAddReducer, deleteResultFormThunk, getFirstResultFormReducer, getLastResultFormReducer, getNextResultFormReducer, getPreviousResultFormReducer } from "../../redux/slice/resultForm";
import { setMainMenuName, setSubMenuName } from "../../redux/slice/navbarTracking";
import { RootState } from "../../redux/store";
const Result = () => {
    const allResultForm = useSelector((state: RootState) => state.resultForm.allResultFormData)
    const resultFormIndex = useSelector((state: RootState) => state.resultForm.resultFormIndex)
    const dispatch = useDispatch()
    return <div className=" h-[72vh] overflow-y-scroll bg-whiteColor p-2 sm:p-8 w-[95%] m-auto border-[1px] border-borderColor border-solid rounded-xl shadow-smShadow h-[80vh]">
        <OutletLayoutHeader heading="Result Form">
            <BorderButton buttonText="add" icon={<MdAdd />} isIcon onClick={() => dispatch(addNewResultFormAddReducer(true))} />
            <BorderButton buttonText="edit" icon={<MdOutlineEdit />} isIcon />
            <BorderButton buttonText="submit" icon={<MdOutlineDone />} isIcon />
            <BorderButton buttonText="delete" icon={<MdDeleteOutline />} isIcon onClick={()=>dispatch(deleteResultFormThunk(allResultForm[resultFormIndex]?._id))}/>
            <BorderButton buttonText="previous" icon={<MdArrowBackIos />} isIcon onClick={() => dispatch(getPreviousResultFormReducer())} />
            <BorderButton buttonText="next" icon={<MdArrowForwardIos />} isRightIcon onClick={() => dispatch(getNextResultFormReducer())} />
            <BorderButton buttonText="main screen" icon={<MdMonitor />} isIcon to="/" onClick={() => { dispatch(setMainMenuName("Operations")), dispatch(setSubMenuName("Service")) }} />
            <BorderButton buttonText="first" icon={<MdFirstPage />} isIcon onClick={() => dispatch(getFirstResultFormReducer())} />
            <BorderButton buttonText="last" icon={<MdLastPage />} isRightIcon onClick={() => dispatch(getLastResultFormReducer())} />
        </OutletLayoutHeader>
        <div className="mt-8">
            <div>
                <h1 className="  font-semibold text-base
                md:text-md
                lg:text-xl">Hints</h1>
                <div className="flex flex-row gap-x-4 mt-2 flex-wrap gap-y-4">
                    <Hints keyName="Esc" label="finish" />
                    <Hints keyName="f7 + f10" label="find" />
                </div>
            </div>
            {/* RESULT FORM */}
            <ResultForm />

        </div>
    </div>
}
export default Result