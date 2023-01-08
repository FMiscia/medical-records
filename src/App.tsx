import {
    Grommet,
    Box,
    Button,
    Heading,
    Notification,
    StatusType,
} from "grommet"
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom"
import { theme } from "./hooks/useTheme"
import RaildGenerator from "./pages/raildGenerator"
import { AppReducerProvider, useCommonReducer } from "./hooks/useAppReducer"
import Records from "./pages/records"
import RaaGenerator from "./pages/raaaGenerator"

const AppBar = () => {
    const navigate = useNavigate()
    return (
        <Box
            tag="header"
            direction="row"
            align="center"
            justify="between"
            background="brand"
            wrap
            pad={{ left: "medium", right: "small", vertical: "small" }}
            elevation="medium"
            style={{ zIndex: 1 }}
        >
            <Heading size={"small"}>MEDICAL RECORDS</Heading>
            <Box direction="row" align="center" gap="small">
                <Button primary label="RAAA" onClick={() => navigate("/raaa")} />
                <Button primary label="RAILD" onClick={() => navigate("/raild")} />
                <Button
                    primary
                    label="LIST"
                    onClick={() => navigate("/records")}
                />
            </Box>
        </Box>
    )
}

function App() {
    return (
        <AppReducerProvider>
            <Grommet theme={theme} full>
                <Navigation />
            </Grommet>
        </AppReducerProvider>
    )
}

const Navigation = () => {
    const { commonState, commonDispatch } = useCommonReducer()
    const {
        show: showNotification,
        type: notificationType,
        message: notificationMessage,
    } = commonState.notification

    const getNotificationTitle = (type: string) => {
        switch (type) {
            case "error":
                return "ERROR"
            case "warn":
                return "WARNING"
            case "info":
                return "INFO"
            default:
                return ""
        }
    }

    const getNotificationStatus = (type: string): StatusType => {
        switch (type) {
            case "error":
                return "critical"
            case "warn":
                return "warning"
            case "info":
                return "normal"
            default:
                return "unknown"
        }
    }
    return (
        <>
            <Router>
                <AppBar />
                <Routes>
                    <Route element={<RaaGenerator />} path="/raaa" />
                    <Route element={<RaildGenerator />} path="/raild" />
                    <Route element={<Records />} path="/records" />
                    <Route element={<Records />} path="/" />
                </Routes>
            </Router>
            {showNotification && (
                <Notification
                    toast
                    title={getNotificationTitle(notificationType)}
                    status={getNotificationStatus(notificationType)}
                    message={notificationMessage}
                    onClose={() =>
                        commonDispatch({ type: "notification/hide" })
                    }
                />
            )}
        </>
    )
}

export default App
