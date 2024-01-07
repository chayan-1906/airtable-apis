import {createTheme} from '@mui/material'
import Color from 'color'

const primary = '#236291'
const secondary = '#A42AAE'
const error = '#DE4F4B'
const textColor = '#212529'
const textWhiteColor = '#EEEEEE'
const success = '#1A5D1A'
const warning = '#DE7A4B'
const info = '#4FAFF8'  // primary-light-400

function generateColorPalette(baseColor, numberOfColors) {
    const base = Color(baseColor)
    const palette = [base.hex()]

    for (let i = 1; i < numberOfColors; i++) {
        const adjustedColor = base.rotate(i * 10).hex()
        palette.push(adjustedColor)
    }
    // printInConsole(`palette: ${palette}`)

    return palette
}

function generate10Colors(baseColor) {
    const shades = []
    const steps = 9

    function generateShade({r, g, b}, amount) {
        const adjustedR = Math.max(0, Math.min(255, r + amount))
        const adjustedG = Math.max(0, Math.min(255, g + amount))
        const adjustedB = Math.max(0, Math.min(255, b + amount))
        return {r: adjustedR, g: adjustedG, b: adjustedB}
    }

    const baseRgb = hexToRgb(baseColor)

    // Generate lighter shades
    for (let i = 0; i < Math.floor(steps / 2); i++) {
        const amount = ((i + 1) / (Math.floor(steps / 2) + 1)) * 100
        const shade = generateShade(baseRgb, amount)
        shades.unshift(rgbToHex(shade))
    }

    shades.push(baseColor)

    // Generate darker shades
    for (let i = 0; i < Math.floor(steps / 2); i++) {
        const amount = ((i + 1) / (Math.floor(steps / 2) + 1)) * -100
        const shade = generateShade(baseRgb, amount)
        shades.push(rgbToHex(shade))
    }
    return shades
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return {r, g, b}
}

function rgbToHex({r, g, b}) {
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`
}

const theme = createTheme({
    components: {
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: '#E7E7E7',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: '#113a58',
                    },
                },
            },
            defaultProps: {
                disableRipple: true,
                // disableElevation: true,
            },
        },
        MuiChip: {
            defaultProps: {
                disableRipple: true,
                // disableElevation: true,
            },
        },
        MuiIconButton: {
            styleOverrides: {
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: 'red[500]',
                    },
                },
            },
        },
        MuiTab: {
            defaultProps: {
                disableRipple: true,
                // disableElevation: true,
            },
        },
        MuiListItemButton: {
            defaultProps: {
                disableRipple: true,
                // disableElevation: true,
            },
        }
    },
    typography: {
        fontFamily: 'Nunito, sans-serif',
        h1: {
            fontWeight: 600,
        },
        h2: {
            fontWeight: 500,
        },
        h4: {
            fontWeight: 500,
        }
    },
    shape: {
        smallBorderRadius: '4px',
        largeBorderRadius: '8px',
    },
    palette: {
        primary: {
            '100': '#d2dee9',
            '200': '#bccede',
            '300': '#a7bed3',
            '400': '#91afc8',
            main: primary,
            '600': '#236291',
            '700': '#1d547d',
            '800': '#17476a',
            '900': '#113a58',
        },
        secondary: {
            '100': generate10Colors(secondary, 10)[1],
            '200': generate10Colors(secondary, 10)[2],
            '300': generate10Colors(secondary, 10)[3],
            '400': generate10Colors(secondary, 10)[4],
            main: secondary,
            '600': generate10Colors(secondary, 10)[6],
            '700': generate10Colors(secondary, 10)[7],
            '800': generate10Colors(secondary, 10)[8],
            '900': generate10Colors(secondary, 10)[9],
        },
        text: {
            primary: textColor,
            inverse: textWhiteColor,
            // secondary: textSecondaryColor,
            // disabled: textDisabledColor,
        },
        grey: {
            '100': '#E7E7E7',
            '200': '#DCDCDC',
            '300': '#D7D7D7',
            '400': '#D2D2D2',
            '500': '#CDCDCD',
            '600': '#959595',
            '700': '#797979',
            '800': '#5D5D5D',
            '900': '#414141',
        },
        background: {
            default: '#FFFFFF',
        },
        success: {
            main: success,
            dark: generate10Colors(success)[7],
        },
        warning: {
            main: warning,
            dark: generate10Colors(warning)[7],
        },
        info: {
            main: info,
            dark: generate10Colors(info)[7],
        },
        error: {
            main: error,
            dark: generate10Colors(error)[7],
        },
    },
})

export default theme