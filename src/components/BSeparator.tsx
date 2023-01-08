import { Box } from 'grommet'
import useTheme from '../hooks/useTheme'

const BSeparator = ({ direction = 'horizontal', color, size }: BSeparatorProps) => {
    const theme = useTheme()
    const currentColor = color || theme.global?.colors?.separator
    if (direction === 'vertical') {
        return (
            <Box
                fill="vertical"
                background={currentColor}
                height={{ min: '100%' }}
                width={size || '1px'}
            />
        )
    }
    return (
        <Box
            background={currentColor}
            pad={{ horizontal: 'medium' }}
            width={{ min: '100%' }}
            fill="horizontal"
            height={size || '1px'}
        />
    )
}

export default BSeparator

interface BSeparatorProps {
    direction?: 'horizontal' | 'vertical'
    color?: string
    size?: string
}
