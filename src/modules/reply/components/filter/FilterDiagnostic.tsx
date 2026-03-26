import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'
import { useState, type SetStateAction } from "react";

export function FilterDiagnostic(){

    const [ search , setSearch ] = useState<SetStateAction<string>>()
    const [ date , setDate ] = useState<SetStateAction<string>>()

    return (
        <Box sx={{
            display : 'flex',
            justifyContent : 'space-between',
            alignItems : 'center' ,
            gap : 2
        }}>
            <Box sx={{
                display : 'flex',
                alignItems : 'center' ,
                gap : 2
            }}>
                <TextField
                    placeholder="Cerca..."
                    size="medium"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <FormControl sx={{ flexShrink : 1 , minWidth: 160}}>
                    <InputLabel id="demo-simple-select-label"> {'Technology'} </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={select}
                        label={'Technology'} 
                        // onChange={handleChange}
                    >
                        <MenuItem value="option1">Opzione 1</MenuItem>
                        <MenuItem value="option2">Opzione 2</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ flexShrink : 1 , minWidth: 160}}>
                    <InputLabel id="demo-simple-select-label"> {'GEO'} </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={select}
                        label={'GEO'} 
                        // onChange={handleChange}
                    >
                        <MenuItem value="option1">Opzione 1</MenuItem>
                        <MenuItem value="option2">Opzione 2</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ flexShrink : 1 , minWidth: 160}}>
                    <InputLabel id="demo-simple-select-label"> {'Portfolio'} </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={select}
                        label={'Portfolio'} 
                        // onChange={handleChange}
                    >
                        <MenuItem value="option1">Opzione 1</MenuItem>
                        <MenuItem value="option2">Opzione 2</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{
                display : 'flex',
                alignItems : 'center' ,
                gap : 2
            }}>
                <div>export table ↓</div>

                <TextField
                    type="date"
                    size="small"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    slotProps={{
                        inputLabel: { shrink: true }
                    }}
                />
            </Box>
        </Box>
    )
}