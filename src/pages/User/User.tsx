import React from "react";
import OutletLayout from "../../components/OutletLayout/OutletLayout";
import OutletLayoutHeader from "../../components/OutletLayout/OutLayoutHeader";
import { MdOutlineAdd } from "react-icons/md";
import BorderButton from "../../components/Buttons/BorderButton/BorderButton";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filter from "../../components/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Tables/Table";
import { headers, tableData } from "../../constdata/ServerData";
import { RootState } from "../../redux/store";
import { MdDeleteOutline, MdOutlineEdit, MdOutlineDone, MdArrowBackIos, MdArrowForwardIos, MdLastPage, MdFirstPage } from "react-icons/md";
import UserInputSection from "./sections/UserInputSection";
import AllUserSection from "./sections/AllUsersSection";
import RolePerUserSection from "./sections/RolePerUserSection";
import { deleteUser, deleteUserApi, getFirstUser, getLastUser, getNextUser, getPreviousUser } from "../../redux/slice/userId";
import AvailableRoleSection from "./sections/AvailableRoleSection";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Buttons/Button/Button";
import AddUserModal from "../../components/Modal/AddUserModal";
import { showModalReducer } from "../../redux/slice/showModal";
const User = () => {
  const userInfo =  useSelector((state: RootState) => state?.userDetail?.userDetails?.user);
  const isAdmin = userInfo?.roles?.some((data) => data?.name === "Admin");

  const userId = useSelector((state: RootState) => state.userId)
  const showModal=useSelector((state:RootState)=>state.showModal.isShowModal)
  const disptach = useDispatch()
  // console.log(userId?.singleUser[0]?._id)
  // DELETE USER
  const deleteUserFunction = () => {
    disptach(deleteUserApi(userId?.singleUser[0]?._id))
  }
    // GET PREVIOUS USER
  const previousUserFunction = () => {
    disptach(getPreviousUser())
  }
    // GET NEXt USER
  const nextUserFunction = () => {
    disptach(getNextUser())
  }
    // GET FIRST USER
  const firstUserFunction = () => {
    disptach(getFirstUser())
  }
    // GET LAST USER
  const lastUserFunction = () => {
    disptach(getLastUser())
  }
 
  return <>
  {showModal? <AddUserModal/>:<OutletLayout>
      <div className="h-[66vh] overflow-y-scroll">
        <OutletLayoutHeader heading="User">
          <div className="w-full flex flex-wrap items-center gap-2">
            {/* {userInfo?.roles[0]?.name === "Admin" && <BorderButton buttonText="add" icon={<MdOutlineAdd size={16}/>} isIcon onClick={()=>disptach(showModalReducer(true))} />} */}
            {isAdmin && <BorderButton buttonText="add" icon={<MdOutlineAdd size={16}/>} isIcon onClick={()=>disptach(showModalReducer(true))} />}
            
            {/* <BorderButton buttonText="edit" icon={<MdOutlineEdit size={16}/>} isIcon /> */}
            {/* <BorderButton buttonText="submit" icon={<MdOutlineDone size={16}/>} isIcon /> */}
            {isAdmin &&<BorderButton buttonText="delete" icon={<MdDeleteOutline size={16}/>} isIcon onClick={deleteUserFunction} />}
           <BorderButton buttonText="previous" icon={<MdArrowBackIos size={13}/>} isIcon onClick={previousUserFunction} />
           <BorderButton buttonText="next" icon={<MdArrowForwardIos size={13}/>} isRightIcon onClick={nextUserFunction} />
           <BorderButton buttonText="first" icon={<MdFirstPage size={18}/>} isIcon onClick={firstUserFunction} />
           <BorderButton buttonText="last" icon={<MdLastPage size={18}/>} isRightIcon onClick={lastUserFunction} />
          </div>
        </OutletLayoutHeader>
        {/* USER INPUT FIELDS SECTION AND ROLES PER USER SECTION STARTS */}
        <div className="flex flex-col items-start gap-14 mt-6
              lg:flex-row
            ">
          {/* USER INPUT FIELDS SECTION */}
          <UserInputSection />
          <RolePerUserSection />
        </div>
        {/* USER INPUT FIELDS SECTION AND ROLES PER USER SECTION ENDS */}
        {/* DISPLAY ALL USERS SECTION STARTS */}
        <div className="sm:mt-6 ">
          <AllUserSection />
          <div className="mt-4">
            <AvailableRoleSection />
          </div>
        </div>
        {/* DISPLAY ALL USERS SECTION ENDS */}
      </div>
    </OutletLayout>}
   
    
    </>
}

export default User