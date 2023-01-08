import { Box, Text, Select, SelectProps, BoxProps } from "grommet"
import BErrorMessage from "./BErrorMessage"

const BSelect = ({
    handleChange,
    handleBlur,
    errors,
    name,
    values,
    defaultOptions = [],
    containerProps,
    label,
    searchable = false,
    createOption = false,
    prefix = "Insert",
    mandatory = false,
    ...rest
}: BSelectProps) => {
    return (
        <Box justify="start" margin={{ bottom: "16px" }} {...containerProps}>
            <Box direction="row" justify="between">
                {label && <Text size="small">{label}</Text>}
                {mandatory && <Text size="small">*</Text>}
            </Box>
            <Select
                value={rest.value}
                onChange={(e) => {
                    const event = {
                        ...e,
                        target: {
                            ...e.target,
                            value: e.option.value,
                        }
                    }
                    !!handleChange && handleChange(name)(event)
                }}
                onBlur={handleBlur && handleBlur(name)}
                {...rest}
            />
            <BErrorMessage name={name} errors={errors} />
        </Box>
    )
}

type BSelectProps = {
    handleChange: Function
    handleBlur?: Function
    defaultOptions?: Array<string | { label: string; value: string }>
    errors: {}
    searchable?: boolean
    createOption?: boolean
    prefix?: string
    name: string
    renderIcon?: () => JSX.Element
    label?: string
    values: {}
    containerProps?: BoxProps
    mandatory?: boolean
} & SelectProps

export default BSelect
