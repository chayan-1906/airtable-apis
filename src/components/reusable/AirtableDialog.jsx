import {Dialog, DialogContent, DialogTitle, Divider, IconButton} from '@mui/material'
import {Fragment} from 'react'
import {ClearInput} from '../../globals/AirtableIcons.jsx'

const AirtableDialog = ({open, setOpen, title, content, actions, showCloseButton}) => {
    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={showCloseButton ? setOpen : null}
                fullWidth
                sx={{
                    backdropFilter: 'blur(5px)',
                }}
                componentsProps={{
                    backdrop: {
                        style: {backgroundColor: 'transparent'}
                    }
                }}>
                <DialogTitle id='responsive-dialog-title' textAlign='center' fontWeight='bold'>
                    {title}
                    {
                        showCloseButton && (
                            <IconButton
                                aria-label='close'
                                onClick={setOpen}
                                sx={{
                                    position: 'absolute', top: 12, right: 12, color: (theme) => theme.palette.grey[500],
                                }}>
                                <ClearInput color='action'/>
                            </IconButton>
                        )
                    }
                    <Divider variant='fullWidth' sx={{height: '15px'}}/>
                </DialogTitle>
                <DialogContent sx={{marginBottom: '20px'}}>{content}</DialogContent>
                {actions}
            </Dialog>
        </Fragment>
    )
}

export default AirtableDialog