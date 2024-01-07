import {AppBar, Avatar, Button, IconButton, InputAdornment, Stack, TextField, Toolbar, Typography} from '@mui/material'
import Logo from '../assets/airtable.png'
import {useEffect, useState} from 'react'
import theme from '../Theme.jsx'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {allTablesPath, errorPath, homePath} from '../globals/Routes.jsx'
import {ClearInput, KeyRounded} from '../globals/AirtableIcons.jsx'
import {AirtableDialog} from './ImportComponents.jsx'
import {fetchFromLocalStorage, saveToLocalStorage} from '../globals/GlobalFunctions.jsx'

const Navbar = () => {
    const [title, setTitle] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [pat, setPat] = useState(fetchFromLocalStorage({key: 'pat'}))

    let location = useLocation()
    let {baseId} = useParams()
    let navigate = useNavigate()
    let current_url = location.pathname

    useEffect(() => {
        // printInConsole(`current_url: ${current_url}`)
        if (current_url === homePath) {
            setTitle('All Bases')
        } else if (baseId && current_url === allTablesPath(baseId)) {
            setTitle('All Tables')
        }
    }, [location.pathname])

    return (
        <AppBar position='static' elevation={0}
                sx={{backgroundColor: (theme) => `${theme.palette.background.default}`}}>
            <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
                <Stack direction='row' alignItems='center'>
                    <Avatar src={Logo} sx={{width: 70, height: 70}} onClick={() => navigate(homePath)}/>
                    <Typography variant='h6' ml={2} color={theme.palette.text.primary}>{title}</Typography>
                </Stack>
                {
                    (location.pathname === homePath || location.pathname === errorPath) &&
                    <IconButton onClick={() => {
                        setPat(fetchFromLocalStorage({key: 'pat'}))
                        setOpenModal(true)
                    }}>
                        <KeyRounded/>
                    </IconButton>
                }
            </Toolbar>
            <AirtableDialog
                open={openModal}
                setOpen={() => setOpenModal(false)}
                title='Change PAT'
                content={
                    <TextField
                        value={pat}
                        fullWidth
                        placeholder='Enter a PAT...'
                        onChange={(e) => setPat(e.target.value)}
                        InputProps={{
                            endAdornment: pat &&
                                <InputAdornment position='end'>
                                    <ClearInput onClick={() => setPat('')}/>
                                </InputAdornment>
                        }}
                    />
                }
                actions={
                    <Stack direction='row' p={2} gap={2} justifyContent='center'>
                        <Button variant='outlined' color='error' onClick={() => {
                            setPat('')
                            setOpenModal(false)
                        }}>Cancel</Button>
                        <Button
                            variant='contained'
                            color='primary'
                            disabled={!pat}
                            onClick={() => {
                                saveToLocalStorage({'key': 'pat', 'value': pat})
                                setOpenModal(false)
                                if (current_url === homePath) {
                                    window.location.reload()
                                } else {
                                    navigate(homePath)
                                }
                            }}>
                            Save
                        </Button>
                    </Stack>
                }
            />
        </AppBar>
    )
}

export default Navbar