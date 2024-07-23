import React from "react";
export interface HintsProps {
    label: string
    keyName: string
}
const Hints: React.FC<HintsProps> = ({ label, keyName }) => {
    return <h1 className="px-2 rounded-md py-1 bg-primaryColorLight/10 border-[2px] border-dashed border-primaryColorLight inline-block font-semibold text-base
                md:text-md
                ">{label}: <span className="font-bold text-primaryColorLight">{keyName}</span></h1>

}

export default Hints