import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard/Dashboard"
import ProfilePage from "./components/ProfilePage/ProfilePage"
import Login from "./components/login/login"
import { LoadingProvider } from "./context/LoadingContext"
import { ContactsProvider } from "./context/ContactsContexts"
function App() {
    return (
        <>
            <LoadingProvider>
                <ContactsProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/profile" element={<ProfilePage />} />

                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </BrowserRouter>
                </ContactsProvider>
            </LoadingProvider>
        </>
    )
}

export default App
