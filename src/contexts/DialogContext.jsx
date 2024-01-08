import React, {useContext, useRef, useState} from 'react'
import {Button, InputAdornment, Stack, TextField} from '@mui/material'
import {ClearInput} from '../globals/AirtableIcons.jsx'
import {fetchFromLocalStorage, saveToLocalStorage} from '../globals/GlobalFunctions.jsx'
import {AirtableDialog} from '../components/ImportComponents.jsx'
import {useLocation, useNavigate} from 'react-router-dom'
import {homePath} from '../globals/Routes.jsx'

const DialogContext = React.createContext()

export const DialogProvider = ({children}) => {
    const [isOpenedDialog, setIsOpenedDialog] = useState(false)
    const [pat, setPat] = useState(fetchFromLocalStorage({'key': 'pat'}))
    const inputRef = useRef(null)
    const [showCloseButton, setShowCloseButton] = useState(true)

    let location = useLocation()
    let navigate = useNavigate()
    let current_url = location.pathname

    const openDialog = () => {
        setIsOpenedDialog(true)
        setPat(fetchFromLocalStorage({key: 'pat'}))
        requestAnimationFrame(() => {
            inputRef.current && inputRef.current.focus()
        })
    }

    const closeDialog = () => {
        setIsOpenedDialog(false)
    }

    return (
        <DialogContext.Provider value={{isOpenedDialog, openDialog, closeDialog, showCloseButton, setShowCloseButton}}>
            <>
                {children}
                <AirtableDialog
                    open={isOpenedDialog}
                    setOpen={closeDialog}
                    showCloseButton={showCloseButton}
                    title='Change PAT'
                    content={
                        <TextField
                            value={pat}
                            fullWidth
                            inputRef={inputRef}
                            placeholder='Enter a PAT...'
                            onChange={(e) => setPat(e.target.value)}
                            InputProps={{
                                endAdornment: pat &&
                                    <InputAdornment position='end'>
                                        <ClearInput sx={{cursor: 'pointer'}} onClick={() => setPat('')}/>
                                    </InputAdornment>
                            }}
                        />
                    }
                    actions={
                        <Stack direction='row' p={2} gap={2} justifyContent='center'>
                            {
                                showCloseButton && (
                                    <Button variant='outlined' color='error' onClick={() => {
                                        setPat('')
                                        closeDialog()
                                    }}>Cancel</Button>
                                )
                            }
                            <Button
                                variant='contained'
                                type='submit'
                                color='primary'
                                disabled={!pat}
                                onClick={() => {
                                    saveToLocalStorage({'key': 'pat', 'value': pat})
                                    closeDialog()
                                    if (current_url === homePath) {
                                        window.location.reload()
                                    } else {
                                        navigate(homePath)
                                    }
                                }}>
                                Save
                            </Button>
                        </Stack>
                    }
                />
            </>
        </DialogContext.Provider>
    )
}

export const useDialogContext = () => useContext(DialogContext)