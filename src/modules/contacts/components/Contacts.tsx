import styles from './Contacts.module.css'
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Contacts(){

    const ages = [0,1,2,3,4,5]  ;

    const { t } = useTranslation() ;
    const [ select , setSelect ] = useState<number>(0) ;
    const [ name , setName ] = useState('');
    const [ surname , setSurname ] = useState('');

    function handleChange(e : any){
        setSelect(e.target.value)
    }

    return (
        <section>
            <h2>{t('contacts.title')}</h2>
            <div className={styles.globalContainer}>
                <div className={styles.flex}>
                    <TextField
                        id="standard-basic" 
                        label={t('contacts.name')} 
                        color="primary"
                        defaultValue={name} 
                        onChange={(e) => setName(e.target.value)} 
                        error={false} 
                        helperText={'Inserisci Nome'}
                        required
                    />

                    <TextField 
                        id="standard-basic" 
                        label={t('contacts.surname')} 
                        color='secondary'
                        defaultValue={surname} 
                        helperText={'Inserisci Cognome'}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                    />
                    
                    <div className='select-container'>
                        <FormControl fullWidth sx={{ 
                            
                        }}>
                            <InputLabel id="demo-simple-select-label"> {t('contacts.age')} </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={select}
                                label={t('contacts.age')} 
                                onChange={handleChange}
                            >
                                { ages.map((age)=>{
                                    return <MenuItem key={age} value={age}>{age}</MenuItem>
                                }) }

                            </Select>
                            <FormHelperText>Inserisci Età</FormHelperText>
                        </FormControl>
                    </div>

                    <Button variant='contained' disabled={ !name || !surname } onClick={() => console.log({
                        name : name ,
                        surname : surname ,
                        age : select,
                    })} >
                        {t('contacts.send')}
                    </Button>
                </div>
            </div>
            <div>
                <p>{`${t('contacts.name')} : ${name} | ${t('contacts.surname')} : ${surname} | ${t('contacts.age')} : ${select} `}</p>            
            </div>
        </section>
    )
}