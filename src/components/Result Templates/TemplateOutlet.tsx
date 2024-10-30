import React from "react";
import "./print.css"
export interface TemplateOutletProps {
    children: React.ReactNode
}

const TemplateOutlet: React.FC<TemplateOutletProps> = ({ children }) => {
    return <div className="w-[210mm] min-h-[260mm] font-times bg-[#fff]  mt-10 ml-auto mr-auto mb-2 border-dashed border-grayColor border-[1px] px-4 py-6 flex flex-col items-start gap-y-6  page-break">
        {children}
    </div>
}

export default TemplateOutlet