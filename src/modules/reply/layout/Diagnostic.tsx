import { Box } from "@mui/material";
import DataQuality from "../components/diagnostic/DataQuality";
import Dashboard from "../components/dashboard/Dashboard";
import { TabsComponent } from "../../../components/elements/Tabs";
import { useState } from "react";

export default function Diagnostic(){

    const tabs = [
        { key : 'Data Quality' },
        { key : 'Dashboard' },
    ]

    const [ tabIndex, setTabIndex ] = useState(0) ;

    return (
        <Box sx={{ display : "flex" , flexDirection : "column" , gap : 4 }}>
            <h2>Diagnositc</h2>
            <Box>
                <TabsComponent tabs={tabs} value={tabIndex} handleChange={(event, newValue) => setTabIndex(newValue)}/> 
            </Box>
            {tabIndex === 0 && <DataQuality />}
            {tabIndex === 1 && <Dashboard />}
        </Box>
    )
}
