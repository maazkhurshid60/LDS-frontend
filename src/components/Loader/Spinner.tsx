import React from "react";
export interface SpinnerProps{
    text?:string
}
const Spinner:React.FC<SpinnerProps>=({text})=>{
return <div className="fixed -top-0 -left-0 w-[100%] h-[100vh] bg-blackColor/20 z-[99999999999] rounded-lg backdrop-blur-[2px]  flex flex-col items-center  justify-center">
<div className="  w-[500px] h-[200px] rounded-lg bg-whiteColor  flex flex-col items-center  justify-center border-borderColor border-solid border-[1px]">
    <span className="loading loading-infinity loading-lg text-primaryColor"></span>
    <h1 className="text-lg text-grayColor capitalize font-medium ">{text}...</h1>
</div>
</div>
}
export default Spinner