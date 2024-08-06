// export const linksData = ["Clear Filter", "GPS Report", "Affidavits Reports", "Column Layout", "Enable Actions", "Regenerate GeoCode", "Sort Records"]

export const linksData = [
    {
        name: "Affidavits Reports",
       submenu:true,
       subMenuList: [
        { subMenuName: "Agency License"},
        { subMenuName: "Li Non Reports"},
        { subMenuName: "L&T Extra Name Reports"},
        { subMenuName: "Marshal Reports"},
        { subMenuName: "Non Mil Reports"},
        { subMenuName: "Standard Reports"},
        { subMenuName: "Trans Per Slip Reports"},
    
      
    ]
       },
    {
    name: "clear filter",
   submenu:false,
   },{
    name: "GPS Report",
   submenu:false,
   },
  
   ,{
    name: "Column Layout",
   submenu:false,
   },
   ,{
    name: "Enable Actions",
   submenu:false,
   },
   ,{
    name: "Generate Geo Code",
   submenu:false,
   },
   ,{
    name: "Sort Records",
   submenu:false,
   },

]

