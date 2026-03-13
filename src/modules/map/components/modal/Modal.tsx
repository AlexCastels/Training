import { Box, Typography } from "@mui/material";
import Modal from '@mui/material/Modal';
import type { LatLngTuple } from "leaflet";

interface MarkerInterface {
    id: number, 
    position: LatLngTuple ,
    label: string,
    description : string
}

export function ModalComponent ( { marker , onClose } : { marker : MarkerInterface | null , onClose : () => void } ) {
    return (
        <Modal 
            open={Boolean(marker)}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {marker?.label}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {marker?.id} - {marker?.description}
                </Typography>
            </Box>
        </Modal>
    )
}