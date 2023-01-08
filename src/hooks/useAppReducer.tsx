import React, { useContext, useReducer } from "react"

export type RaildRecordModel = {
    id: string | number
    name: string
    age: number
    gender: string
    smoking: boolean
    weight: number
    height: number
    bmi: number
    ageDiseaseOnset: number
    ageDiseaseDiagnosis: number
    crpDiseaseOnset: number
    esrDiseaseOnset: number
    ldhDiseaseOnset: number
    das28DiseaseOnset: number
    diseaseDuration: number
    autoAntibodies: string // seronegative, rf, acpa, rfAndAcpa
    erosions: boolean
    extraPulmonaryEAM: boolean
    obesity: boolean
    t2dm: boolean
    dyslipidemia: boolean
    hrtcPattern: string // UIP, NSIP, OTHER
    antiFibroticTherapy: boolean // if true -> start Date
    antiFibroticStartDate?: Date
    immunoSuppressiveTherapy: boolean // if true -> onGoing
    immunoSuppressiveOnGoing?: boolean
    immunoSuppressiveFromDate?: Date
    immunoSuppressiveEndDate?: Date
}

export const raildInitialState: RaildRecordModel = {
    id: "",
    name: "",
    age: 50,
    gender: "M",
    smoking: false,
    weight: 70,
    height: 170,
    bmi: 70 / (1.7 * 1.7),
    ageDiseaseOnset: 40,
    ageDiseaseDiagnosis: 43,
    crpDiseaseOnset: 43,
    esrDiseaseOnset: 43,
    ldhDiseaseOnset: 43,
    das28DiseaseOnset: 43,
    diseaseDuration: 2,
    autoAntibodies: "RF",
    erosions: false,
    extraPulmonaryEAM: false,
    obesity: false,
    t2dm: false,
    dyslipidemia: false,
    hrtcPattern: "UIP",
    antiFibroticTherapy: false,
    antiFibroticStartDate: undefined,
    immunoSuppressiveTherapy: false,
    immunoSuppressiveOnGoing: false,
    immunoSuppressiveFromDate: undefined,
    immunoSuppressiveEndDate: undefined,
}

export type RaaaRecordModel = {
    id: string | number
    name: string
    age: number
    gender: string
    smoking: boolean
    weight: number
    height: number
    bmi: number
    diseaseDuration: number
    autoAntibodies: string // seronegative, rf, acpa, rfAndAcpa
    erosions: boolean
    extraArticular: boolean
    cervicalMR: string //positive, negative
}

export const raaaInitialState: RaaaRecordModel = {
    id: "",
    name: "",
    age: 50,
    gender: "M",
    smoking: false,
    weight: 70,
    height: 170,
    bmi: 70 / (1.7 * 1.7),
    diseaseDuration: 2,
    autoAntibodies: "RF",
    erosions: false,
    extraArticular: false,
    cervicalMR: "negative",
}

type Notification = {
    type: "error" | "warn" | "info"
    message: string
}

type CommonState = {
    notification: Notification & { show: boolean }
    loader: number
}

const commonInitialState: CommonState = {
    notification: {
        type: "error",
        message: "",
        show: false,
    },
    loader: 0,
}

function recordReducer(
    state: RaildRecordModel | RaaaRecordModel,
    action: { type: string; payload?: any }
) {
    switch (action.type) {
        case "record/set":
            return {
                ...state,
                ...action.payload,
            }
        case "reset":
            return {
                ...raildInitialState,
            }
        default:
            throw new Error()
    }
}

function commonReducer(
    state: CommonState,
    action: { type: string; payload?: any }
) {
    switch (action.type) {
        case "notification/show":
            return {
                ...state,
                notification: {
                    ...action.payload,
                    show: true,
                },
            }
        case "notification/hide":
            return {
                ...state,
                notification: {
                    ...state.notification,
                    show: false,
                },
            }
        case "reset":
            return {
                ...commonInitialState,
            }
        default:
            throw new Error()
    }
}

export const AppReducerContext = React.createContext<{
    raildState: RaildRecordModel
    raildDispatch: React.Dispatch<{ type: string; payload?: any }>
    raaaState: RaaaRecordModel
    raaaDispatch: React.Dispatch<{ type: string; payload?: any }>
    commonState: CommonState
    commonDispatch: React.Dispatch<{ type: string; payload?: any }>
}>(void undefined as any)

export const AppReducerProvider = ({ children }: { children: JSX.Element }) => {
    const [raildState, raildDispatch] = useReducer(
        recordReducer,
        raildInitialState
    )
    const [raaaState, raaaDispatch] = useReducer(
        recordReducer,
        raaaInitialState
    )
    const [commonState, commonDispatch] = useReducer(
        commonReducer,
        commonInitialState
    )
    return (
        <AppReducerContext.Provider
            value={{
                commonDispatch,
                commonState,
                raildDispatch,
                raildState,
                raaaDispatch,
                raaaState,
            }}
        >
            {children}
        </AppReducerContext.Provider>
    )
}

export const useRaildReducer = () => {
    const { raildState, raildDispatch } = useContext(AppReducerContext)

    return { raildState, raildDispatch }
}

export const useRaaaReducer = () => {
    const { raaaState, raaaDispatch } = useContext(AppReducerContext)

    return { raaaState, raaaDispatch }
}

export const useCommonReducer = () => {
    const { commonState, commonDispatch } = useContext(AppReducerContext)

    return { commonState, commonDispatch }
}
