import { useEffect, useState } from "react"
import { Box, TextInput, Text, BoxProps, TextInputProps } from "grommet"
import { get } from "lodash"
import BErrorMessage from "./BErrorMessage"

type BTextInputProps = {
    handleChange: Function
    handleBlur?: Function
    errors: {}
    name: string
    renderIcon?: () => JSX.Element
    label?: string
    values: {}
    containerProps?: BoxProps
    mandatory?: boolean
    fast?: boolean
} & TextInputProps

const BTextInput = ({
    handleChange,
    handleBlur,
    errors,
    name,
    renderIcon,
    label,
    values,
    containerProps,
    mandatory,
    fast,
    ...rest
}: BTextInputProps) => {
    const initialValue = get(values, name)
    const [value, setValue] = useState(initialValue)
    const [isFocused, setFocused] = useState(false)
    const textValue = values && fast ? value : initialValue
    useEffect(() => {
        if (fast) {
            setValue(initialValue)
        }
    }, [fast, initialValue])
    return (
        <Box justify="start" {...containerProps}>
            <Box direction="row" align="center" justify="between">
                <Box direction="row" gap="xsmall" align="center">
                    {label && <Text size="small">{label}</Text>}
                    {mandatory && (
                        <Text weight="bolder" size="small">
                            *
                        </Text>
                    )}
                </Box>
            </Box>
            <Box
                direction="row"
                align="center"
                border={{
                    color: isFocused ? "brand" : undefined,
                    size: isFocused ? "2px" : undefined,
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                round="xxsmall"
            >
                <TextInput
                    {...rest}
                    onChange={(e) => {
                        if (handleChange && !fast) {
                            handleChange(name)(e)
                        }
                        if (fast) {
                            setValue(e.currentTarget.value)
                        }
                    }}
                    onBlur={(e) => {
                        if (handleBlur) {
                            handleBlur(name)(e)
                        }
                        if (fast) {
                            handleChange(name)(e)
                        }
                    }}
                    plain
                    value={textValue}
                />
                {!!renderIcon && renderIcon()}
            </Box>
            <BErrorMessage name={name} errors={errors} />
        </Box>
    )
}

export default BTextInput
