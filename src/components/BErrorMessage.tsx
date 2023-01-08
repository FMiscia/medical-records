import { Box, BoxProps, Text } from 'grommet'
import get from 'lodash.get'

type BErrorMessagePropsType = {
    errors: {}
    name: string
} & BoxProps

const BErrorMessage = ({ errors, name, ...props }: BErrorMessagePropsType) => {
    return (
        <>
            {errors && typeof get(errors, name) === 'string' && (
                <Box height={'20px'} {...props}>
                    <Text color="status-error" size={'small'}>
                        {get(errors, name)}
                    </Text>
                </Box>
            )}
        </>
    )
}

export default BErrorMessage
