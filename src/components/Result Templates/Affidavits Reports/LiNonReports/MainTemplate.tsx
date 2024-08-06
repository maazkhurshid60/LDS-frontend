import React, { forwardRef, useRef } from "react"
import TemplateOutlet from "../../TemplateOutlet"
import Header from "./Sections/Header"
import Footer from "./Sections/Footer"
import Body from "./Sections/Body"
import ReactToPrint from "react-to-print"
import Button from "../../../Buttons/Button/Button"
// export interface LiNonReportsProps {
//     props?: any;
// }
// const LiNonReports = forwardRef<HTMLDivElement, LiNonReportsProps>((props, ref) => {
//     return (
//         <div ref={ref}>
//             <p>hihi</p>
//             <TemplateOutlet>
//                 <Header />
//                 <Body />
//                 <Footer />
//             </TemplateOutlet>
//         </div>
//     );
// });

// export default LiNonReports

const LiNonReports = () => {
    const LiNonReportsPrintRef = useRef<HTMLButtonElement | null>(null);
    return (
        <>
        <div className="absolute h-[83.5vh] overflow-y-scroll relative">
            <TemplateOutlet>
                <Header />
                <Body />
                <Footer />
            </TemplateOutlet>
            <div className="flex justify-end mt-5 mb-5 mr-5">
                    <ReactToPrint
                        trigger={() => (
                            <div className="w-[10%]">
                                <Button text="Print" />
                            </div>
                        )}
                        content={() => LiNonReportsPrintRef.current}
                        />
                </div>
        </div>    
        <div style={{ display: "none" }}>
              {/* The content to print */}
                <div ref={LiNonReportsPrintRef}>
                    <TemplateOutlet>
                        <Header />
                        <Body />
                        <Footer />
                    </TemplateOutlet>
                </div>
            </div>
            </>
    );
};

export default LiNonReports