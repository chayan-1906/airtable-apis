import {useAirtableApiContext} from '../contexts/AirtableApiContext.jsx'
import {useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Grid, Typography} from '@mui/material'
import {BaseTableCard} from '../components/ImportComponents.jsx'
import {tableDetailsPath} from '../globals/Routes.jsx'

const AllTablesPage = () => {
    let {getAllTablesApi, get_all_tables_loading, get_all_tables_success, tables} = useAirtableApiContext()
    let {baseId} = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        getAllTablesApi({baseId: baseId})
    }, [])

    if(get_all_tables_loading) {
        return <Typography>Loading for get_all_tables_loading</Typography>
    }

    return (
        <Grid container spacing={2} mt={2}>
            {
                tables.map((table)=> {
                    return (
                        <Grid item key={table.id} xs={12} sm={6} md={4} lg={3} xl={3} sx={{minWidth: '0'}}
                              onClick={() => navigate(tableDetailsPath(baseId, table.id))}>
                            <BaseTableCard table={table}/>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default AllTablesPage