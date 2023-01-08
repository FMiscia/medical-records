import { Box, Button, Text } from "grommet"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import BTextInput from "../components/BTextInput"
import {
    raildInitialState,
    RaildRecordModel,
    useRaildReducer,
} from "../hooks/useAppReducer"
import useQueryRecords from "../hooks/useQueryRecords"
import { Formik } from "formik"
import BSelect from "../components/BSelect"
import BDateInput from "../components/BDateInput"
import { Save } from "grommet-icons"
import { RAILD_RECORD_KEY } from "../utils"
import { useEffect } from "react"

const schema = Yup.object().shape({
    name: Yup.string(),
    age: Yup.number(),
    gender: Yup.string(),
    smoking: Yup.boolean(),
    weight: Yup.number(),
    height: Yup.number(),
    bmi: Yup.number(),
    ageDiseaseOnset: Yup.number(),
    ageDiseaseDiagnosis: Yup.number(),
    crpDiseaseOnset: Yup.number(),
    esrDiseaseOnset: Yup.number(),
    ldhDiseaseOnset: Yup.number(),
    das28DiseaseOnset: Yup.number(),
    diseaseDuration: Yup.number(),
    autoAntibodies: Yup.string(), // seronegative, rf, acpa, rfAndAcpa
    erosions: Yup.boolean(),
    extraPulmonaryEAM: Yup.boolean(),
    obesity: Yup.boolean(),
    t2dm: Yup.boolean(),
    dyslipidemia: Yup.boolean(),
    hrtcPattern: Yup.string(), // UIP, NSIP, OTHER
    antiFibroticTherapy: Yup.boolean(), // if true -> start Date
    antiFibroticStartDate: Yup.date(),
    immunoSuppressiveTherapy: Yup.boolean(), // if true -> onGoing
    immunoSuppressiveOnGoing: Yup.boolean(),
    immunoSuppressiveFromDate: Yup.date(),
    immunoSuppressiveToDate: Yup.date(),
})

type RaildGeneratorType = {
    initialState?: RaildRecordModel
}

const RaildGenerator = (props: RaildGeneratorType) => {
    const { raildState, raildDispatch } = useRaildReducer()
    const navigate = useNavigate()
    const { pushRecord } = useQueryRecords(RAILD_RECORD_KEY)

    const checkEdit = () => {
        if (!!raildState.id) {
            raildDispatch({ type: "reset" })
        }
    }

    useEffect(() => {
        return checkEdit()
    })

    return (
        <Box gap="small" pad="medium">
            <Box margin="small">
                <Text weight={"bold"} size="large">
                    RAILD GENERATOR
                </Text>
                <Formik
                    initialValues={raildState ?? raildInitialState}
                    validationSchema={schema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={(values) => {
                        const height = values.height / 100
                        const bmi = values.weight / (height * height)
                        pushRecord({ ...values, bmi })
                        raildDispatch({ type: "reset" })
                        navigate("/records")
                    }}
                >
                    {({
                        values,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => {
                        return (
                            <Box>
                                <Box flex direction="row" gap="small">
                                    <BTextInput
                                        containerProps={{ flex: true }}
                                        name="name"
                                        label="Name"
                                        placeholder="Patient identifier"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                    />
                                    <BTextInput
                                        containerProps={{ flex: true }}
                                        name="age"
                                        label="Age"
                                        placeholder="Age"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                    />
                                </Box>
                                <Box flex direction="row" gap="small">
                                    <BSelect
                                        containerProps={{ flex: true }}
                                        name="gender"
                                        label="Gender"
                                        placeholder="Gender"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                        options={[
                                            {
                                                label: "M",
                                                value: "M",
                                            },
                                            {
                                                label: "F",
                                                value: "F",
                                            },
                                        ]}
                                        labelKey="label"
                                        valueKey={{
                                            key: "value",
                                            reduce: true,
                                        }}
                                    />
                                    <BSelect
                                        containerProps={{ flex: true }}
                                        name="smoking"
                                        label="Smoking"
                                        placeholder="Smoking"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                        options={[
                                            {
                                                label: "YES",
                                                value: true,
                                            },
                                            {
                                                label: "NO",
                                                value: false,
                                            },
                                        ]}
                                        labelKey="label"
                                        valueKey={{
                                            key: "value",
                                            reduce: true,
                                        }}
                                    />
                                </Box>
                                <Box flex direction="row" gap="small">
                                    <BTextInput
                                        containerProps={{ flex: true }}
                                        name="weight"
                                        label="weight"
                                        placeholder="weight"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                    />
                                    <BTextInput
                                        containerProps={{ flex: true }}
                                        name="height"
                                        label="Height"
                                        placeholder="Height"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                    />
                                </Box>
                                <Box flex direction="row" gap="small">
                                    <BTextInput
                                        containerProps={{ flex: true }}
                                        name="ageDiseaseOnset"
                                        label="Disease Onset"
                                        placeholder="Disease Onset"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                    />
                                    <BTextInput
                                        containerProps={{ flex: true }}
                                        name="ageDiseaseDiagnosis"
                                        label="Disease Diagnosis"
                                        placeholder="Disease Diagnosis"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                    />
                                </Box>
                                <Box flex direction="row" gap="small">
                                    <BTextInput
                                        containerProps={{ flex: true }}
                                        name="crpDiseaseOnset"
                                        label="CRP Onset"
                                        placeholder="CRP Onset"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                    />
                                    <BTextInput
                                        containerProps={{ flex: true }}
                                        name="esrDiseaseOnset"
                                        label="ESR Diagnosis"
                                        placeholder="ESR Diagnosis"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                    />
                                </Box>
                                <Box flex direction="row" gap="small">
                                    <BTextInput
                                        containerProps={{ flex: true }}
                                        name="ldhDiseaseOnset"
                                        label="LDH Onset"
                                        placeholder="LDH Onset"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                    />
                                    <BTextInput
                                        containerProps={{ flex: true }}
                                        name="das28DiseaseOnset"
                                        label="DAS28 Diagnosis"
                                        placeholder="DAS28 Diagnosis"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                    />
                                </Box>
                                <Box flex direction="row" gap="small">
                                    <BTextInput
                                        containerProps={{ flex: true }}
                                        name="diseaseDuration"
                                        label="Disease Duration"
                                        placeholder="Disease Duration"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                    />
                                    <BSelect
                                        containerProps={{ flex: true }}
                                        name="autoAntibodies"
                                        label="Auto Antibodies"
                                        placeholder="Auto Antibodies"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                        options={[
                                            {
                                                label: "Seronegative",
                                                value: "seronegative",
                                            },
                                            {
                                                label: "RF",
                                                value: "rf",
                                            },
                                            {
                                                label: "ACPA",
                                                value: "acpa",
                                            },
                                            {
                                                label: "RF and ACPA",
                                                value: "rfAndAcpa",
                                            },
                                        ]}
                                        labelKey="label"
                                        valueKey={{
                                            key: "value",
                                            reduce: true,
                                        }}
                                    />
                                </Box>
                                <Box flex direction="row" gap="small">
                                    <BSelect
                                        containerProps={{ flex: true }}
                                        name="erosions"
                                        label="Erosions"
                                        placeholder="Erosions"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                        options={[
                                            {
                                                label: "YES",
                                                value: true,
                                            },
                                            {
                                                label: "NO",
                                                value: false,
                                            },
                                        ]}
                                        labelKey="label"
                                        valueKey={{
                                            key: "value",
                                            reduce: true,
                                        }}
                                    />
                                    <BSelect
                                        containerProps={{ flex: true }}
                                        name="extraPulmonaryEAM"
                                        label="Extra-Pulmonary EAM"
                                        placeholder="Extra-Pulmonary EAM"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                        options={[
                                            {
                                                label: "YES",
                                                value: true,
                                            },
                                            {
                                                label: "NO",
                                                value: false,
                                            },
                                        ]}
                                        labelKey="label"
                                        valueKey={{
                                            key: "value",
                                            reduce: true,
                                        }}
                                    />
                                </Box>
                                <Box flex direction="row" gap="small">
                                    <BSelect
                                        containerProps={{ flex: true }}
                                        name="obesity"
                                        label="Obesity"
                                        placeholder="Obesity"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                        options={[
                                            {
                                                label: "YES",
                                                value: true,
                                            },
                                            {
                                                label: "NO",
                                                value: false,
                                            },
                                        ]}
                                        labelKey="label"
                                        valueKey={{
                                            key: "value",
                                            reduce: true,
                                        }}
                                    />
                                    <BSelect
                                        containerProps={{ flex: true }}
                                        name="t2dm"
                                        label="T2DM"
                                        placeholder="T2DM"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                        options={[
                                            {
                                                label: "YES",
                                                value: true,
                                            },
                                            {
                                                label: "NO",
                                                value: false,
                                            },
                                        ]}
                                        labelKey="label"
                                        valueKey={{
                                            key: "value",
                                            reduce: true,
                                        }}
                                    />
                                </Box>
                                <Box flex direction="row" gap="small">
                                    <BSelect
                                        containerProps={{ flex: true }}
                                        name="dyslipidemia"
                                        label="Dyslipidemia"
                                        placeholder="Dyslipidemia"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                        options={[
                                            {
                                                label: "YES",
                                                value: true,
                                            },
                                            {
                                                label: "NO",
                                                value: false,
                                            },
                                        ]}
                                        labelKey="label"
                                        valueKey={{
                                            key: "value",
                                            reduce: true,
                                        }}
                                    />
                                    <BSelect
                                        containerProps={{ flex: true }}
                                        name="hrtcPattern"
                                        label="HRTC Pattern"
                                        placeholder="HRTC Pattern"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                        options={[
                                            {
                                                label: "UIP",
                                                value: "uip",
                                            },
                                            {
                                                label: "NSIP",
                                                value: "nsip",
                                            },
                                            {
                                                label: "OTHER",
                                                value: "other",
                                            },
                                        ]}
                                        labelKey="label"
                                        valueKey={{
                                            key: "value",
                                            reduce: true,
                                        }}
                                    />
                                </Box>
                                <Box flex direction="row" gap="small">
                                    <BSelect
                                        containerProps={{ flex: true }}
                                        name="antiFibroticTherapy"
                                        label="Anti-Fibrotic Therapy"
                                        placeholder="Anti-Fibrotic Therapy"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                        options={[
                                            {
                                                label: "YES",
                                                value: true,
                                            },
                                            {
                                                label: "NO",
                                                value: false,
                                            },
                                        ]}
                                        labelKey="label"
                                        valueKey={{
                                            key: "value",
                                            reduce: true,
                                        }}
                                    />
                                    {values.antiFibroticTherapy && (
                                        <BDateInput
                                            containerProps={{ flex: true }}
                                            name="antiFibroticStartDate"
                                            label="Anti-Fibrotic Start Date"
                                            placeholder="Anti-Fibrotic Start Date"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                            errors={errors}
                                        />
                                    )}
                                </Box>
                                <Box flex direction="row" gap="small">
                                    <BSelect
                                        containerProps={{ flex: true }}
                                        name="immunoSuppressiveTherapy"
                                        label="Immuno-Suppressive Therapy"
                                        placeholder="Immuno-Suppressive Therapy"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                        options={[
                                            {
                                                label: "YES",
                                                value: true,
                                            },
                                            {
                                                label: "NO",
                                                value: false,
                                            },
                                        ]}
                                        labelKey="label"
                                        valueKey={{
                                            reduce: true,
                                            key: "value",
                                        }}
                                    />
                                    {values.immunoSuppressiveTherapy && (
                                        <BSelect
                                            containerProps={{ flex: true }}
                                            name="immunoSuppressiveOnGoing"
                                            label="Immuno-Suppressive Ongoing"
                                            placeholder="Immuno-Suppressive Ongoing"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                            errors={errors}
                                            options={[
                                                {
                                                    label: "YES",
                                                    value: true,
                                                },
                                                {
                                                    label: "NO",
                                                    value: false,
                                                },
                                            ]}
                                            labelKey="label"
                                            valueKey={{
                                                key: "value",
                                                reduce: true,
                                            }}
                                        />
                                    )}
                                </Box>
                                {!!values.immunoSuppressiveTherapy && (
                                    <Box flex direction="row" gap="small">
                                        <BDateInput
                                            containerProps={{ flex: true }}
                                            name="immunoSuppressiveFromDate"
                                            label="Immuno-Suppressive Therapy Start"
                                            placeholder="Immuno-Suppressive Therapy Start"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                            errors={errors}
                                        />
                                        <BDateInput
                                            containerProps={{ flex: true }}
                                            name="immunoSuppressiveEndDate"
                                            label="Immuno-Suppressive Therapy End"
                                            placeholder="Immuno-Suppressive Therapy End"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                            errors={errors}
                                        />
                                    </Box>
                                )}
                                <Box
                                    flex
                                    gap="medium"
                                    direction="row"
                                    margin={{ vertical: "small" }}
                                    animation="fadeIn"
                                >
                                    <Button
                                        fill
                                        onClick={async () => {
                                            handleSubmit()
                                        }}
                                        icon={<Save color="brand" />}
                                        label={"SAVE"}
                                        secondary
                                    />
                                </Box>
                            </Box>
                        )
                    }}
                </Formik>
            </Box>
        </Box>
    )
}

export default RaildGenerator
