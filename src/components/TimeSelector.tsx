import { useState } from "react"
import { Box, MaskedInput, MaskedInputType, Text } from "grommet"

const TimeSelector = ({
    label,
    value,
    onChangeSelection,
    ...rest
}: TimeSelectorProps) => {
    const [min, sec] = value.split(":")
    const [time, setTime] = useState<string>(
        `${min.padStart(2, "0")}:${sec.padStart(2, "0")}`
    )
    return (
        <Box>
            <Box direction="row" justify="between">
                {label && <Text size="small">{label}</Text>}
            </Box>
            <MaskedInput
                mask={[
                    {
                        length: [1, 2],
                        options: Array.from({ length: 99 }, (v, k) => k + 1),
                        regexp: /^[0-9][0-9]$|^[0-9]$/,
                        placeholder: "MM",
                    },
                    { fixed: ":" },
                    {
                        length: [1, 2],
                        options: Array.from({ length: 59 }, (v, k) => k + 1),
                        regexp: /^[0-5][0-9]$|^[0-9]$/,
                        placeholder: "SS",
                    },
                ]}
                {...rest}
                value={time}
                onChange={(event) => setTime(event.target.value)}
                onBlur={() => onChangeSelection(time)}
            />
        </Box>
    )
}

type TimeSelectorProps = {
    value: string
    onChangeSelection: (time: string) => any
    label?: string
} & MaskedInputType

export default TimeSelector
