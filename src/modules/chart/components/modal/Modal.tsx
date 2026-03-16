import { Box, Typography } from "@mui/material";
import Modal from '@mui/material/Modal';

type DataInterface = [ number , number , string ]

export function ModalComponent ( { data , onClose } : { data : DataInterface | null , onClose : () => void } ) {
    return (
        <Modal 
            open={Boolean(data)}
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
                    { data?.[2] && 'Punto: ' + data?.[2] }
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {'Descrizione aggiuntiva: '} {data?.[0]} - {data?.[1]}
                </Typography>
            </Box>
        </Modal>
    )
}