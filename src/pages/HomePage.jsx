import {Grid, Typography} from '@mui/material'
import {useAirtableApiContext} from '../contexts/ImportContexts.jsx'
import {useEffect} from 'react'
import {BaseTableCard} from '../components/ImportComponents.jsx'
import {useNavigate} from 'react-router-dom'
import {allTablesPath} from '../globals/Routes.jsx'

const HomePage = () => {
    let {
        getAllBasesApi,
        get_all_bases_loading,
        get_all_bases_success,
        bases
    } = useAirtableApiContext()
    let navigate = useNavigate()

    useEffect(() => {
        getAllBasesApi()
    }, [])

    if (get_all_bases_loading) {
        return <Typography>Loading for get_all_bases_loading</Typography>
    }

    return (
        <Grid container spacing={2} mt={2}>
            {
                bases.map((base)=> {
                    return (
                        <Grid item key={base.id} xs={12} sm={6} md={4} lg={3} xl={3} sx={{minWidth: '0'}}
                              onClick={() => navigate(allTablesPath(base.id))}>
                            <BaseTableCard base={base}/>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default HomePage