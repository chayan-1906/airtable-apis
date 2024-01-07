import React, {useContext, useReducer} from 'react'
import {AirtableApiReducer} from '../reducers/ImportReducers.jsx'
import {fetchFromLocalStorage, printInConsole} from '../globals/GlobalFunctions.jsx'
import {get_all_bases_url, get_all_tables_url} from '../globals/ApiUrls.jsx'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import {
    GET_ALL_BASES_BEGIN,
    GET_ALL_BASES_ERROR,
    GET_ALL_BASES_SUCCESS,
    GET_ALL_TABLES_BEGIN,
    GET_ALL_TABLES_ERROR,
    GET_ALL_TABLES_SUCCESS
} from '../reducers/Actions.jsx'
import {errorPath} from '../globals/Routes.jsx'

const initialState = {
    get_all_bases_loading: false,
    get_all_bases_success: false,
    get_all_bases_error: false,
    bases: [],

    get_all_tables_loading: false,
    get_all_tables_success: false,
    get_all_tables_error: false,
    tables: [],


    error: null,
}

const AirtableApiContext = React.createContext()

export const AirtableApiProvider = ({children}) => {
    const [state, dispatch] = useReducer(AirtableApiReducer, initialState)
    let navigate = useNavigate()

    const getAllBasesApi = async () => {
        printInConsole('getAllBasesApi called')
        try {
            dispatch({type: GET_ALL_BASES_BEGIN})
            printInConsole(`getAllBasesApi url: ${get_all_bases_url}`)
            const response = await axios.get(get_all_bases_url, {
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${airtablePAT}`,
                    Authorization: `Bearer ${fetchFromLocalStorage({key: 'pat'})}`,
                },
            })
            printInConsole(`getAllBasesApi response status: ${response.status}`)
            // printInConsole(`getAllBasesApi response body: ${JSON.stringify(response.data)}`)
            if (response.status === 200) {
                const responseData = response.data
                dispatch({type: GET_ALL_BASES_SUCCESS, payload: responseData.bases})
            }
            // return response.data
        } catch (error) {
            dispatch({type: GET_ALL_BASES_ERROR, payload: error.response})
            printInConsole(`getAllBasesApi error: ${error.response}`)
            navigate(errorPath)
            // return null
        }
    }

    const getAllTablesApi = async ({baseId}) => {
        printInConsole('getAllTablessApi called')
        try {
            dispatch({type: GET_ALL_TABLES_BEGIN})
            printInConsole(`getAllTablesApi url: ${get_all_tables_url(baseId)}`)
            const response = await axios.get(get_all_tables_url(baseId), {
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${airtablePAT}`,
                    Authorization: `Bearer ${fetchFromLocalStorage({key: 'pat'})}`,
                },
            })
            printInConsole(`getAllTablesApi response status: ${response.status}`)
            // printInConsole(`getAllTablesApi response body: ${JSON.stringify(response.data)}`)
            if (response.status === 200) {
                const responseData = response.data
                dispatch({type: GET_ALL_TABLES_SUCCESS, payload: responseData.tables})
            }
            // return response.data
        } catch (error) {
            dispatch({type: GET_ALL_TABLES_ERROR, payload: error.response})
            printInConsole(`getAllTablesApi error: ${error.response}`)
            navigate(errorPath)
            // return null
        }
    }

    return (
        <AirtableApiContext.Provider value={{...state, getAllBasesApi, getAllTablesApi}}>
            {children}
        </AirtableApiContext.Provider>
    )
}

export const useAirtableApiContext = () => useContext(AirtableApiContext)