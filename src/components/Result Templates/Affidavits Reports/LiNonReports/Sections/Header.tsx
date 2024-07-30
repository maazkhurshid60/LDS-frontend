import React from "react"
const Header=()=>{
    return    <div className="w-full flex items-center justify-between flex-wrap ">
        <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase underline">
            district court of the state of new york
        </h1>
        <h1 className="font-bold flex items-center gap-x-2 text-xl uppercase underline">
          L&T Index: SOME_TEXT_WILL_BE_THERE_FROM_BACKEND_API
        </h1>
        <h1 className="font-bold flex items-center gap-x-2 text-xl ">
Affidavit of Investigation</h1>
<h1 className="font-bold flex items-center gap-x-2 text-xl underline">
          Petitioner: SOME_TEXT_WILL_BE_THERE_FROM_BACKEND_API(OPTIONAL)
        </h1>
        <h1 className="font-bold flex items-center gap-x-2 text-xl underline">
          Against: SOME_TEXT_WILL_BE_THERE_FROM_BACKEND_API(OPTIONAL)
        </h1>
    </div>
}
export default Header