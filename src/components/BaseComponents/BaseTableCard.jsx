import {Card, Typography} from '@mui/material'

const BaseTableCard = ({base, table}) => {
    return (
        <Card sx={{padding: '10px', cursor: 'pointer'}}>
            {base?.name && <Typography variant='h6'>{base.name}</Typography>}

            {table?.name && <Typography variant='h6'>{table.name}</Typography>}
            {table?.description && <Typography variant='subtitle2'>{table.description}</Typography>}
        </Card>
    )
}

export default BaseTableCard