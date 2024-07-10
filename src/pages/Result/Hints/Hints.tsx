import React from "react";
export interface HintsProps {
    label: string
    keyName: string
}
const Hints: React.FC<HintsProps> = ({ label, keyName }) => {
    return <h1 className="px-4 rounded-md py-2 bg-primaryColorLight/10 border-[2px] border-dashed border-primaryColorLight inline-block font-semibold text-base
                md:text-md
                lg:text-xl">{label}: <span className="font-bold text-primaryColorLight">{keyName}</span></h1>

}

export default Hints