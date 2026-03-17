import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

export default function MaterialUICard( {id, title , body} : {id : string, title : string , body : string}) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    loading="lazy"   
                    className="opacity-0"                                
                    onLoad={(e) => e.currentTarget.classList.replace('opacity-0', 'opacity-100')}
                    height="140"
                    image="https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?q=80&w=704&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="static img"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        { id } : { title } 
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        { body }
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}