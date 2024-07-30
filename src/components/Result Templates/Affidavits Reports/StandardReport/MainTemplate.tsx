import React from "react";
import TemplateOutlet from "../../TemplateOutlet";
import Header from "./Sections/Header";
import Body from "./Sections/Body";
import Footer from "./Sections/Footer";
const StandardReport = () => {
    return <TemplateOutlet>
        <Header />
        <Body />
        <Footer />
    </TemplateOutlet>
}
export default StandardReport