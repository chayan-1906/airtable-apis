import {Button, Stack, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {printInConsole} from '../globals/GlobalFunctions.jsx'
import {homePath} from '../globals/Routes.jsx'
import {useAirtableApiContext, useDialogContext} from '../contexts/ImportContexts.jsx'
import {useEffect} from 'react'

const ErrorPage = () => {
    const {error} = useAirtableApiContext()
    const navigate = useNavigate()
    const {openDialog, setShowCloseButton} = useDialogContext()

    printInConsole(`get_all_bases_error from error page: ${error?.status}`)

    useEffect(() => {
        if (error?.status === 401) {
            // UNAUTHORIZED
            openDialog()
            setShowCloseButton(false)
        }
    }, [error])

    return (
        <Stack>
            <Typography variant='h3' color='error' fontWeight='bold' mb={2}>
                {error?.status === 401 ? 'INVALID PAT!!!' : 'ERROR OCCURRED!!!'}
            </Typography>
            <Button variant='contained' onClick={() => navigate(homePath, {replace: true})}>
                Try Again
            </Button>
        </Stack>
    )
}

export default ErrorPage