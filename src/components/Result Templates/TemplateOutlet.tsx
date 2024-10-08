import React from "react";

export interface TemplateOutletProps {
    children: React.ReactNode
}

const TemplateOutlet: React.FC<TemplateOutletProps> = ({ children }) => {
    return <div className="min-h-[260mm] w-[210mm] ml-auto mr-auto mb-2 border-dashed border-grayColor border-[1px] px-4 py-6 flex flex-col items-start gap-y-24">
        {children}
    </div>
}

export default TemplateOutlet