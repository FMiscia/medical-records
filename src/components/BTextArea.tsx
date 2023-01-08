import { useEffect, useState } from 'react'
import { Box, BoxProps, Text, TextArea, TextAreaExtendedProps } from 'grommet'
import { get } from 'lodash'
import BErrorMessage from './BErrorMessage'

const BTextArea = ({
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
}: BTextAreaProps) => {
    const [isFocused, setFocused] = useState(false)
    const initialValue = get(values, name)
    const [value, setValue] = useState(initialValue)
    const textValue = values && fast ? value : initialValue
    useEffect(() => {
        if (fast) {
            setValue(initialValue)
        }
    }, [fast, initialValue])
    return (
        <Box justify="start" {...containerProps}>
            <Box direction="row" justify="between">
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
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                border={{
                    color: isFocused ? 'brand' : undefined,
                    size: isFocused ? '2px' : undefined,
                }}>
                <TextArea
                    plain
                    style={{minHeight: 200}}
                    resize={false}
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
                    value={textValue}
                    {...rest}
                />
                {!!renderIcon && renderIcon()}
            </Box>
            <BErrorMessage name={name} errors={errors} />
        </Box>
    )
}

type BTextAreaProps = {
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
} & TextAreaExtendedProps

export default BTextArea
