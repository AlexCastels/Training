import styles from './Contacts.module.css'
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';

export default function Contacts(){

    const ages = [0,1,2,3,4,5]  ;

    const [ select , setSelect ] = useState<number>(0) ;
    const [ name , setName ] = useState('');
    const [ surname , setSurname ] = useState('');

    function handleChange(e : any){
        setSelect(e.target.value)
    }

    return (
        <section>
            <h2>Contacts</h2>
            <div className={styles.globalContainer}>
                <div className={styles.flex}>
                    <TextField
                        id="standard-basic" 
                        label="Name" 
                        color="primary"
                        defaultValue={name} 
                        onChange={(e) => setName(e.target.value)} 
                        error={false} 
                        helperText={'Inserisci nome'}
                    />

                    <TextField 
                        id="standard-basic" 
                        label="Surname" 
                        color='secondary'
                        defaultValue={surname} 
                        helperText={'Inserisci Cognome'}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    
                    <div className='select-container'>
                        <FormControl fullWidth sx={{ 
                            
                        }}>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={select}
                                label="Ages"
                                onChange={handleChange}
                            >
                                { ages.map((age)=>{
                                    return <MenuItem key={age} value={age}>{age}</MenuItem>
                                }) }

                            </Select>
                            <FormHelperText>Inserisci Età</FormHelperText>
                        </FormControl>
                    </div>

                    <Button variant='contained' onClick={() => console.log({
                        name : name ,
                        surname : surname ,
                        age : select,
                    })} >
                        Press
                    </Button>
                </div>
            </div>
            <div>
                <p>Name : {name} Surname : {surname} Age: {select}</p>
            </div>
        </section>
    )
}