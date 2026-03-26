import { Box, Button, Chip } from "@mui/material";

export default function Dashboard(){

    //altro fetch per ottenere i gateway da mostrare in griglia, con possibilità di filtraggio
    const GatewayCard = () => {
        return (
            <Box sx={{bgcolor : 'background.default' , border : 1 , borderRadius : 2 , borderColor: 'gray' , p : 1 }}>
                <Box sx={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                    <p>Gateway</p>
                    <Chip label="Chip 1" color="primary" size="small" />
                </Box>
                <Box sx={{ display : 'flex' , flexDirection : 'column' , gap :2 , mt : 2}}>
                    <Box sx={{ display : 'flex' , justifyContent : 'space-between' }}>
                        <p>Data</p>
                        <p>1234567</p>
                    </Box>
                    <Box sx={{ display : 'flex' , justifyContent : 'space-between' }}>
                        <p>Data</p>
                        <p>1234567</p>
                    </Box>
                    <Box sx={{ display : 'flex' , justifyContent : 'space-between' }}>
                        <p>Data</p>
                        <p>1234567</p> 
                    </Box>
                </Box>
                <Box sx={{ display : 'flex' , justifyContent : 'space-between' , gap : 1 , py : 1 ,}}>
                    <Button variant='contained' size="small" color="inherit" sx={{ width : '100%' }}>Info 1</Button>
                    <Button variant='contained' size="small" color="inherit" sx={{ width : '100%' }}>Info 2</Button>
                    <Button variant='contained' size="small" color="inherit" sx={{ width : '100%' }}>Info 3</Button>
                </Box>
            </Box>
        )
    }

    return (
        <Box sx={{ display : "grid" , gridTemplateColumns : "repeat(5 , 1fr)" , gap : 2 }}>
            { Array.from({ length: 15 }).map((_, index) => (
                <GatewayCard key={index}/>
            ))} 
        </Box>
    )
}   