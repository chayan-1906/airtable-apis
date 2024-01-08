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

export const isListEmpty = (list) => {
    // if list null or length is 0 => return true
    return !list || list.length === 0
}

export const isObjEmpty = (object) => {
    // if object null or no of keys is 0 => return true
    return !object || Object.keys(object).length === 0
}