import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    Text,
} from "grommet"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    RaaaRecordModel,
    RaildRecordModel,
    useRaaaReducer,
    useRaildReducer,
} from "../hooks/useAppReducer"
import useQueryRecords from "../hooks/useQueryRecords"
import { RAAA_RECORD_KEY, RAILD_RECORD_KEY } from "../utils"

type RecordBoxType = {
    items: Array<RaildRecordModel | RaaaRecordModel>
    onDelete: Function
    onEdit: Function
}
const RecordBox = ({ items, onDelete, onEdit }: RecordBoxType) => {
    const [confirmed, setConfirmed] = useState(false)
    const keys = Object.keys(items?.[0] ?? {})
    return (
        <Box margin={"small"} style={{ overflowX: "scroll" }}>
            <Table>
                <TableHeader>
                    <TableRow>
                        {keys.map((k) => (
                            <TableCell key={k} scope="col" border="bottom">
                                <Text>{k}</Text>
                            </TableCell>
                        ))}
                        <TableCell scope="col" border="bottom">
                            <Text>Edit</Text>
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                            <Text>Delete</Text>
                        </TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id}>
                            {keys.map((k, index) => (
                                <TableCell key={index}>
                                    <Text>{String((item as any)[k])}</Text>
                                </TableCell>
                            ))}
                            <TableCell>
                                <Button
                                    size="small"
                                    primary
                                    label="EDIT"
                                    onClick={() => {
                                        onEdit(item)
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <Button
                                    size="small"
                                    primary
                                    label={confirmed ? "CONFIRM?" : "DELETE"}
                                    onClick={async () => {
                                        if (confirmed) {
                                            onDelete(item)
                                            setConfirmed(false)
                                        } else {
                                            setConfirmed(true)
                                        }
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}

const Records = () => {
    const { queryRecords: queryRaild, deleteRecord: deleteRaild } =
        useQueryRecords(RAILD_RECORD_KEY)
    const { queryRecords: queryRaaa, deleteRecord: deleteRaaa } =
        useQueryRecords(RAAA_RECORD_KEY)
    const { raaaDispatch } = useRaaaReducer()
    const { raildDispatch } = useRaildReducer()
    const navigate = useNavigate()
    const railds = queryRaild()
    const raaa = queryRaaa()

    const downloadFile = (records: Array<any>) => {
        // create file in browser
        const fileName = "my-file"
        const json = JSON.stringify(records, null, 2)
        const blob = new Blob([json], { type: "application/json" })
        const href = URL.createObjectURL(blob)

        // create "a" HTLM element with href to file
        const link = document.createElement("a")
        link.href = href
        link.download = fileName + ".json"
        document.body.appendChild(link)
        link.click()

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link)
        URL.revokeObjectURL(href)
    }

    return (
        <Box gap="small">
            <Box direction="row" flex>
                <Button
                    gap="medium"
                    margin={"small"}
                    label="EXPORT RAILD"
                    onClick={() => {
                        downloadFile(railds)
                    }}
                />
                <Button
                    gap="medium"
                    margin={"small"}
                    label="EXPORT RAAA"
                    onClick={() => {
                        downloadFile(raaa)
                    }}
                />
            </Box>
            <Text margin={"small"} weight={"bold"} size="large">
                {`RAILD LIST (${railds?.length ?? 0})`}
            </Text>
            <Box data-testid="raild-container" flex direction="row" wrap>
                {railds.length > 0 && (
                    <RecordBox
                        items={railds}
                        onDelete={(item: RaildRecordModel) => deleteRaild(item)}
                        onEdit={(item: RaildRecordModel) => {
                            raildDispatch({
                                type: "record/set",
                                payload: item,
                            })
                            navigate("/raild")
                        }}
                    />
                )}
            </Box>
            <Text margin={"small"} weight={"bold"} size="large">
                {`RAAA LIST (${raaa?.length ?? 0})`}
            </Text>
            <Box data-testid="raaa-container" flex direction="row" wrap>
                {raaa.length > 0 && (
                    <RecordBox
                        items={raaa}
                        onDelete={(item: RaaaRecordModel) => deleteRaaa(item)}
                        onEdit={(item: RaaaRecordModel) => {
                            raaaDispatch({
                                type: "record/set",
                                payload: item,
                            })
                            navigate("/raaa")
                        }}
                    />
                )}
            </Box>
        </Box>
    )
}

export default Records
