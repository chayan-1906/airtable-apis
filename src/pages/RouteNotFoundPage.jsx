import {Box, Typography} from '@mui/material'

const RouteNotFoundPage = () => {
    return (
        <Box display='flex' alignItems='center' gap={2} justifyContent='center'>
            <Typography variant='h3' color='error' fontWeight='bold'>ROUTE NOT FOUND!!!</Typography>
            {/*<QuestionOutlined color='warning' fontSize='large'/>
            <Box>
                <Typography variant='h5' color='warning.main' fontWeight='bold'>Looking for something?</Typography>
                <Typography variant='h6'>
                    We&apos;re sorry. The Web address you entered is not a functioning page on our site.
                </Typography>
                <Stack direction='row' alignItems='center'>
                    <ArrowRight color='#FF0000'/>
                    <Typography variant='h6' fontWeight='bold'>
                        Go to SonicMixer&apos;s{' '}
                        <Link to={homePath} replace={true} underline='hover'
                              style={{color: theme.palette.warning.dark}}>
                            Home
                        </Link>{' '}
                        Page
                    </Typography>
                </Stack>
            </Box>*/}
        </Box>
    )
}

export default RouteNotFoundPage