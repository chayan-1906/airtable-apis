import {Container} from '@mui/material'
import {Outlet} from 'react-router-dom'
import Navbar from './Navbar.jsx'

const SharedLayout = () => {
    return (
        <Container maxWidth='xl'>
            <Navbar/>
            <Outlet/>
        </Container>
    )
}

export default SharedLayout