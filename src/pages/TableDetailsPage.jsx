import {useAirtableApiContext} from '../contexts/ImportContexts.jsx'
import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material'

const TableDetailsPage = () => {
    let {getTableByIdApi, get_table_by_id_loading, get_table_by_id_success, table} = useAirtableApiContext()
    let {baseId, tableId} = useParams()

    useEffect(() => {
        getTableByIdApi({baseId: baseId, tableId: tableId})
    }, [])

    if (get_table_by_id_loading) {
        return <Typography>Loading for get_table_by_id_loading</Typography>
    }

    return (
        <Stack p={4}>
            <TableContainer component={Paper}>
                <Table aria-label='simple table' stickyHeader>
                    <TableHead>
                        <TableRow>
                            {
                                table && Object.keys(table[0].fields).map((key, index) => {
                                    return <TableCell key={index}>{key}</TableCell>
                                })
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            table && table.map((tableData) => {
                                return (
                                    <TableRow key={tableData.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        {
                                            table && Object.keys(table[0].fields).map((key, index) => {
                                                // printInConsole(`key: ${JSON.stringify(tableData.fields)}`)
                                                return (
                                                    <TableCell key={index}>
                                                        {typeof tableData.fields[`${key}`] !== 'object' ? tableData.fields[`${key}`] : tableData.fields[`${key}`].name}
                                                        {/*{tableData.fields[`${key}`]}*/}
                                                    </TableCell>
                                                )
                                            })
                                        }
                                        {/*<TableCell>{tableData.fields.parent_id}</TableCell>
                                        <TableCell>{tableData.fields.discount_available}</TableCell>
                                        <TableCell>{tableData.fields.name}</TableCell>
                                        <TableCell>{tableData.fields.sort_order}</TableCell>
                                        <TableCell>{tableData.fields.sort_order}</TableCell>
                                        <TableCell>{tableData.fields.meta_title}</TableCell>
                                        <TableCell>{tableData.fields.image}</TableCell>
                                        <TableCell>{tableData.fields.category_id}</TableCell>*/}
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    )
}

export default TableDetailsPage