import { useCallback } from "react"
import { RaaaRecordModel, RaildRecordModel, useCommonReducer } from "./useAppReducer"
import useLocalStorage from "./useLocalStorage"

const useQueryRecords = (storageKey: string) => {
    const { getItem, setItem } = useLocalStorage()
    const { commonDispatch } = useCommonReducer()

    const queryRecords = useCallback(() => {
        const records = getItem(storageKey)
        return records
    }, [getItem, storageKey])

    const pushRecord = useCallback(
        (data: RaildRecordModel | RaaaRecordModel) => {
            let id = data.id
            if (!id) {
                id = Math.random().toString(36).substring(2, 9)
            }
            const records: Array<RaildRecordModel | RaaaRecordModel> = getItem(storageKey)
            const record = { ...data, id }
            const isEdit = records.findIndex((it) => it.id === record.id) >= 0
            const newRecords = isEdit
                ? records.map((it) => {
                      if (it.id === record.id) {
                          return record
                      }
                      return it
                  })
                : [record, ...records]
            setItem(storageKey, [...newRecords])
            commonDispatch({
                type: "notification/show",
                payload: {
                    message: "Success",
                    type: "info",
                },
            })
        },
        [commonDispatch, getItem, setItem, storageKey]
    )

    const deleteRecord = useCallback(
        (record: RaildRecordModel | RaaaRecordModel) => {
            const records: Array<RaildRecordModel | RaaaRecordModel> = getItem(storageKey)
            const newRecords = records.filter((it) => it.id !== record.id)
            setItem(storageKey, [...newRecords])
            commonDispatch({
                type: "notification/show",
                payload: {
                    message: "Record deleted",
                    type: "info",
                },
            })
        },
        [commonDispatch, getItem, setItem, storageKey]
    )

    return { queryRecords, pushRecord, deleteRecord }
}

export default useQueryRecords
