import { Box, ThemeContext, ThemeType } from 'grommet'
import { FormDown } from 'grommet-icons'
import React from 'react'

export const theme: ThemeType = {
    global: {
        font: {
            family: "'Exo 2'",
            size: '18px',
            height: '20px',
        },
        colors: {
            brand: '#000',
            separator: '#eaeaea',
        },
        focus: {
            outline: {
                size: 'none',
            },
            shadow: {
                size: 'none',
            },
        },
    },
    spinner: {
        container: {
            color: '#eaeaea'
        }
    },
    button: {
        padding: { horizontal: '8px', vertical: '10px' },
        extend: () => `
        font-weight: 500;
        border-radius: 5px;
        &:hover {
            border-radius: 5px;
        }
        &:active {
            border-radius: 5px;
        }
        &:focus {
            border-radius: 5px;
        }
        `,
    },
    dataTable: {
        icons: {
            expand: () => (
                <Box flex="grow" justify="center">
                    <FormDown style={{ alignSelf: 'center' }} />
                </Box>
            ),
        },
        pinned: {
            header: {
                background: {
                    opacity: 'medium',
                },
                extend: `backdrop-filter: blur(8px);`,
            },
        },
    },
}

const useTheme = (): ThemeType => {
    const theme = React.useContext<ThemeType>(ThemeContext)

    return theme
}

export default useTheme
