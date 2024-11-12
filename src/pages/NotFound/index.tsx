import React from "react";

const NotFoundPage = () => {

    return <div className="w-full bg-whiteColor flex items-center justify-center h-[100vh] ">
        <div className="w-[95%] border-[1px] border-borderColor border-solid rounded-xl text-center shadow-lgShadow py-6 px-8
                        sm:w-[65%] 
                        md:py-8 md:px-10 
                         lg:py-10 lg:px-12
                        xl:w-[35%] xl:py-12 xl:px-14">
            {/* HEADER STARTS */}
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="px-6 tracking-wide py-2 bg-primaryColor rounded-md 
                           inline-block text-whiteColor font-semibold text-base
                           sm:text-xl
                           lg:text-2xl ">
                    LDS
                </h1>
                <h1 className="px-6 tracking-wide py-2  rounded-md 
                           inline-block tracking-tight font-semibold text-base
                           sm:text-xl
                           lg:text-2xl ">
                    Apologies, the server is currently unavailable. Please try again later.
                </h1>
            </div>
            {/* HEADER ENDS */}
            {/* FORM STARTS */}

            {/* FORM ENDS */}
        </div>
    </div>
}

export default NotFoundPage