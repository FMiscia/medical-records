import { Box, Text, CheckBoxGroup, CheckBoxGroupProps, BoxProps } from "grommet"
import get from "lodash.get"
import BErrorMessage from "./BErrorMessage"

const BCheckBoxGroup = ({
    handleChange,
    handleBlur,
    errors,
    name,
    label,
    values,
    containerProps,
    mandatory,
    ...rest
}: BCheckBoxGroupProps) => {
    return (
        <Box justify="start" margin={{ bottom: "16px" }} {...containerProps}>
            <Box direction="row" justify="between">
                {label && <Text size="small">{label}</Text>}
                {mandatory && <Text size="small">*</Text>}
            </Box>
            <Box direction="row" align="center">
                <CheckBoxGroup
                    value={get(values, name)}
                    onChange={(event) => {
                        handleChange(name)({
                            ...event,
                            target: {
                                value: event?.value,
                            },
                        })
                    }}
                    onBlur={handleBlur && handleBlur(name)}
                    {...rest}
                />
            </Box>
            <BErrorMessage name={name} errors={errors} />
        </Box>
    )
}

type BCheckBoxGroupProps = {
    handleChange: Function
    handleBlur?: Function
    errors: {}
    name: string
    label?: string
    values: {}
    containerProps?: BoxProps
    mandatory?: boolean
} & CheckBoxGroupProps

export default BCheckBoxGroup
