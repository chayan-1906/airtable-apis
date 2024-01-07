import {Button, Stack, Typography} from '@mui/material'
import {useAirtableApiContext} from '../contexts/ImportContexts.jsx'
import {printInConsole} from '../globals/GlobalFunctions.jsx'
import {homePath} from '../globals/Routes.jsx'
import {useNavigate} from 'react-router-dom'

const ErrorPage = () => {
    let {error} = useAirtableApiContext()
    let navigate = useNavigate()

    printInConsole(`get_all_bases_error from error page: ${error?.status}`)

    if (error?.status === 401) {
        // UNAUTHORIZED
        return (
            <Stack>
                <Typography variant='h3' color='error' fontWeight='bold'>INVALID PAT!!!</Typography>
                <Button variant='contained' onClick={() => navigate(homePath, {replace: true})}>Try Again</Button>
            </Stack>
        )
    }

    return (
        <Stack>
            <Typography variant='h3' color='error' fontWeight='bold'>ERROR OCCURRED!!!</Typography>
            <Button variant='text' onClick={() => navigate(homePath, {replace: true})}>Try Again</Button>
        </Stack>
    )
}

export default ErrorPage