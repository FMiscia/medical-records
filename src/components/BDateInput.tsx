import React, { useState } from 'react'
import { Box, Text, BoxProps, DateInput, DateInputExtendedProps } from 'grommet'
import { get } from 'lodash'
import BErrorMessage from './BErrorMessage'
import { CircleInformation } from 'grommet-icons'
import BTextInput from './BTextInput'
import './BDateInput.css'
import { formatDate } from '../utilities'

const BDateInput = ({
    handleChange,
    handleBlur,
    errors,
    name,
    renderIcon,
    label,
    values,
    containerProps,
    mandatory,
    tooltip,
    fast = false,
    ...rest
}: BDateInputProps) => {
    const [isFocused, setFocused] = useState(false)
    let value = get(values, name)
    if ((value as string)?.includes('T')) {
        value = (value as string).split('T')?.[0]
    }
    const [textValue, setTextValue] = useState(value)
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
                    {tooltip && (
                        <p
                            style={{ margin: '0', padding: '0' }}
                            data-tip={tooltip}>
                            <CircleInformation size="small" />
                        </p>
                    )}
                </Box>
            </Box>
            {rest.disabled && (
                <BTextInput
                    handleChange={handleChange}
                    errors={errors}
                    name={name}
                    values={{
                        [`${name}`]: formatDate(new Date(textValue)),
                    }}
                    disabled
                    renderIcon={renderIcon}
                />
            )}
            {!rest.disabled && (
                <Box
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="BDateInput-Container"
                    border={{
                        color: isFocused ? 'brand' : 'border',
                        size: isFocused ? '2px' : '1px',
                    }}
                    round="xsmall"
                    direction="row"
                    align="center">
                    <DateInput
                        format="dd/mm/yyyy"
                        onChange={(e: any) => {
                            let dateValue = e.value
                            const event = {
                                ...e,
                                target: { value: dateValue },
                            }
                            if (fast) {
                                //Selection from picker
                                if (!e.target) {
                                    handleChange(name)(event)
                                }
                                setTextValue(dateValue)
                                return
                            }
                            handleChange(name)(event)
                        }}
                        onBlur={(e) => {
                            setFocused(false)
                            const event = {
                                ...e,
                                target: { value: fast ? textValue : value },
                            }
                            handleBlur?.(name)(event)
                        }}
                        defaultValue={formatNoTimeZoneDate(
                            new Date(fast ? textValue : value),
                        )}
                        value={fast ? textValue : value}
                        {...rest}
                    />
                    {renderIcon?.()}
                </Box>
            )}
            {!rest.disabled && <BErrorMessage name={name} errors={errors} />}
        </Box>
    )
}

export const formatNoTimeZoneDate = (date: Date) => {
    if (!date.getDate()) {
        return ''
    }

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${[year, month, day].join('-')}`
}

interface BDateInputProps extends DateInputExtendedProps {
    handleChange: Function
    handleBlur?: Function
    errors: {}
    name: string
    renderIcon?: () => JSX.Element
    label?: string
    values: {}
    containerProps?: BoxProps
    mandatory?: boolean
    tooltip?: string
    fast?: boolean
}

export default BDateInput
