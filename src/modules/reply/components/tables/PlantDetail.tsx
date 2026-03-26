import { Box } from "@mui/material";
import type { Plant } from "../diagnostic/DataQuality";

export function PlantDetail({ plant } : {plant : Plant}){
    return (
        <Box>
            Nuova tabella per : { plant.name }
        </Box>
    )
}