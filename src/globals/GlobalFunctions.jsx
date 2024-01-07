import {allowPrint} from './GlobalsAndConstants.jsx'

export const printInConsole = (text) => {
    if (allowPrint) console.log(text)
}

export const isStringInvalid = (text) => {
    return !text
}

export const saveToLocalStorage = ({key, value}) => {
    window.localStorage.setItem(key, value)
}

export const fetchFromLocalStorage = ({key}) => {
    return window.localStorage.getItem(key) ?? ''
}