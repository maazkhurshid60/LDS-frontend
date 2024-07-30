import React from "react";
import TemplateOutlet from "../../TemplateOutlet"
import Header from "./Sections/Header"
import Footer from "./Sections/Footer"
import Body from "./Sections/Body"


const MarshalReport=()=>{
    return <TemplateOutlet>
        <Header/>
        <Body/>
<Footer/>
    </TemplateOutlet>
}

export default MarshalReport