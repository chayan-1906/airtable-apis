import {AppBar, Avatar, IconButton, Stack, Toolbar, Typography} from '@mui/material'
import Logo from '../assets/airtable.png'
import {useEffect, useState} from 'react'
import theme from '../Theme.jsx'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {allTablesPath, errorPath, homePath, tableDetailsPath} from '../globals/Routes.jsx'
import {KeyRounded} from '../globals/AirtableIcons.jsx'
import {useDialogContext} from '../contexts/ImportContexts.jsx'

const Navbar = () => {
    const [title, setTitle] = useState('')

    let location = useLocation()
    let {baseId, tableId} = useParams()
    let navigate = useNavigate()
    let current_url = location.pathname

    let {openDialog} = useDialogContext()

    useEffect(() => {
        // printInConsole(`current_url: ${current_url}`)
        if (current_url === homePath) {
            setTitle('All Bases')
            document.title = 'All Bases'
        } else if (baseId && current_url === allTablesPath(baseId)) {
            setTitle('All Tables')
            document.title = 'All Tables'
        } else if (baseId && tableId && current_url === tableDetailsPath(baseId, tableId)) {
            setTitle('Table Details')
            document.title = 'Table Details'
        }
    }, [location.pathname])

    return (
        <AppBar position='sticky' elevation={0}
                sx={{backgroundColor: (theme) => `${theme.palette.background.default}`}}>
            <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
                <Stack direction='row' alignItems='center'>
                    <Avatar src={Logo} sx={{width: 70, height: 70, cursor: 'pointer'}}
                            onClick={() => navigate(homePath)}/>
                    <Typography variant='h6' ml={2} color={theme.palette.text.primary}>{title}</Typography>
                </Stack>
                {
                    (location.pathname === homePath || location.pathname === errorPath) &&
                    <IconButton onClick={() => openDialog()}>
                        <KeyRounded/>
                    </IconButton>
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar