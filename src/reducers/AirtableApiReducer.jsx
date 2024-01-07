import {
    GET_ALL_BASES_BEGIN,
    GET_ALL_BASES_ERROR,
    GET_ALL_BASES_SUCCESS,
    GET_ALL_TABLES_BEGIN, GET_ALL_TABLES_ERROR,
    GET_ALL_TABLES_SUCCESS
} from './Actions.jsx'

const AirtableApiReducer = (state, action) => {
    switch (action.type) {
        /** GET ALL BASES */
        case GET_ALL_BASES_BEGIN:
            return {...state, get_all_bases_loading: true}
        case GET_ALL_BASES_SUCCESS:
            return {
                ...state,
                get_all_bases_loading: false,
                get_all_bases_success: true,
                bases: action.payload,
            }
        case GET_ALL_BASES_ERROR:
            return {
                ...state,
                get_all_bases_loading: false,
                get_all_bases_error: true,
                error: action.payload,
                bases: [],
            }

        /** GET ALL TABLES */
        case GET_ALL_TABLES_BEGIN:
            return {...state, get_all_tables_loading: true}
        case GET_ALL_TABLES_SUCCESS:
            return {
                ...state,
                get_all_tables_loading: false,
                get_all_tables_success: true,
                tables: action.payload,
            }
        case GET_ALL_TABLES_ERROR:
            return {
                ...state,
                get_all_tables_loading: false,
                get_all_tables_error: true,
                error: action.payload,
                tables: [],
            }
    }
}

export default AirtableApiReducer