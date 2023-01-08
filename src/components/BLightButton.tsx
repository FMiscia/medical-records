import { Box, Button, ButtonExtendedProps, ButtonProps, Text } from "grommet"

const BLightButton = ({label, onClick, ...rest}: BLightButtonProps) => {
    return (
        <Box align="center" pad="small" hoverIndicator onClick={onClick}>
            <Button reverse {...rest} />
            <Text
                style={{ textTransform: 'uppercase' }}
                size="xsmall"
                weight={'bold'}
                color={rest.icon?.props.color}>
                {label}
            </Text>
        </Box>
    )
}

export default BLightButton

interface BLightButtonProps extends ButtonProps, ButtonExtendedProps {

}