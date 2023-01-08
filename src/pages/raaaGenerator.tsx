import { Box, Button, Text } from "grommet"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import BTextInput from "../components/BTextInput"
import {
    raaaInitialState,
    RaildRecordModel,
    useRaaaReducer,
} from "../hooks/useAppReducer"
import useQueryRecords from "../hooks/useQueryRecords"
import { Formik } from "formik"
import BSelect from "../components/BSelect"
import { Save } from "grommet-icons"
import { RAAA_RECORD_KEY } from "../utils"
import { useEffect } from "react"

const schema = Yup.object().shape({
    name: Yup.string(),
    age: Yup.number(),
    gender: Yup.string(),
    smoking: Yup.boolean(),
    weight: Yup.number(),
    height: Yup.number(),
    bmi: Yup.number(),
    diseaseDuration: Yup.number(),
    autoAntibodies: Yup.string(), // seronegative, rf, acpa, rfAndAcpa
    erosions: Yup.boolean(),
    extraArticular: Yup.boolean(),
    cervicalMR: Yup.string(),
})

type RaaGeneratorType = {
    initialState?: RaildRecordModel
}

const RaaGenerator = (props: RaaGeneratorType) => {
    const { raaaState, raaaDispatch } = useRaaaReducer()
    const navigate = useNavigate()
    const { pushRecord } = useQueryRecords(RAAA_RECORD_KEY)

    const checkEdit = () => {
        if (!!raaaState.id) {
            raaaDispatch({ type: "reset" })
        }
    }

    useEffect(() => {
        return checkEdit()
    })

    return (
        <Box gap="small" pad="medium">
            <Box margin="small">
                <Text weight={"bold"} size="large">
                    RAAA GENERATOR
                </Text>
                <Formik
                    initialValues={raaaState ?? raaaInitialState}
                    validationSchema={schema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={(values) => {
                        const height = values.height / 100
                        const bmi = values.weight / (height * height)
                        pushRecord({ ...values, bmi })
                        raaaDispatch({ type: "reset" })
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
                                    <BTextInput
                                        containerProps={{ flex: true }}
                                        name="gender"
                                        label="Gender"
                                        placeholder="Gender"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
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
                                        name="extraArticular"
                                        label="Extra-Articular"
                                        placeholder="Extra-Articular"
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
                                        name="cervicalMR"
                                        label="Cervical RM"
                                        placeholder="Cervical RM"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        errors={errors}
                                        options={[
                                            {
                                                label: "Positive",
                                                value: "positive",
                                            },
                                            {
                                                label: "Negative",
                                                value: "negative",
                                            },
                                        ]}
                                        labelKey="label"
                                        valueKey={{
                                            key: "value",
                                            reduce: true,
                                        }}
                                    />
                                </Box>
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

export default RaaGenerator
