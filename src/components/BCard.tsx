import { Box, BoxProps, Text } from "grommet"
import BSeparator from "./BSeparator"

const BCard = ({ children, ...rest }: BCardProps) => {
    return (
        <Box
            elevation="small"
            round="small"
            pad="medium"
            background={"background-front"}
            {...rest}
        >
            {children}
        </Box>
    )
}

export const BInfoCard = ({
    values,
    footer,
    header,
    ...rest
}: BInfoCardProps) => {
    return (
        <BCard width={{ min: "small" }} {...rest}>
            <Box flex>
                {header}
                {values.map(([key, val], index) => {
                    return (
                        <Box key={index}>
                            <BSeparator />
                            <Box
                                direction="row"
                                justify="between"
                                align="center"
                                wrap
                                pad={{ vertical: "medium" }}
                            >
                                <Text
                                    data-testid={`key-${index}`}
                                    style={{
                                        textTransform: "uppercase",
                                    }}
                                    weight={"bold"}
                                    size="small"
                                >
                                    {key}
                                </Text>
                                <Text
                                    data-testid={`value-${index}`}
                                    size="medium"
                                    weight={"lighter"}
                                >
                                    {val}
                                </Text>
                            </Box>
                        </Box>
                    )
                })}
                <BSeparator />
                {footer}
            </Box>
        </BCard>
    )
}

export default BCard

interface BCardProps extends BoxProps {
    children: JSX.Element
}

interface BInfoCardProps extends BoxProps {
    values: Array<[string, string | number | JSX.Element]>
    footer?: JSX.Element
    header?: JSX.Element
}
