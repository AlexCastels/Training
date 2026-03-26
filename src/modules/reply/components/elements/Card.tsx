import { Box, Typography } from "@mui/material";

interface CardProps {
    label : string ,
    value : number
}

export function Card( { label , value } : CardProps ){
    return (
        <Box sx={{ 
                display : "flex" , 
                flexDirection : "column" , 
                gap : 2 , 
                border : 2,
                borderRadius : 2,
                borderColor : 'gray',
                bgcolor : 'background.default' ,
                width : '100%',
                p: 1.5,
            }}>
            <h2>{ label }</h2>
            <Typography sx={{color : value > 80 ? 'success.main' : 'error.main'}}>{ `${value} %` }</Typography>
        </Box>
    )
}