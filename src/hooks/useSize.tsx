import { ResponsiveContext, ResponsiveValue } from 'grommet'
import React from 'react'

const useSize = (): ResponsiveValue => {
    const size = React.useContext<ResponsiveValue>(ResponsiveContext)

    return size
}

export default useSize