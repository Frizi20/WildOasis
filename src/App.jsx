import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout";
import Accommodation from "./pages/clientPages/Accommodation";
import GlobalStyles from "./styles/GlobalStyles";

import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import Client from "./pages/Client";
import ClientLayout from "./ui/clientUi/ClientLayout";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10 * 1000,
        },
    },
});

export default function App() {
    return (
        <DarkModeProvider>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={true} />
                <GlobalStyles />
                <BrowserRouter>
                    <Routes>
                        <Route
                            element={
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route
                                index
                                element={<Navigate replace to={"/dashboard"} />}
                            />

                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/bookings" element={<Bookings />} />
                            <Route
                                path="/booking/:bookingId"
                                element={<Booking />}
                            />
                            <Route
                                path="/checkin/:bookingId"
                                element={<Checkin />}
                            />
                            <Route path="/cabins" element={<Cabins />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/account" element={<Account />} />
                        </Route>
                        <Route element={<ClientLayout />}>
                            <Route index path="/client" element={<Client />} />
                            <Route
                                path="/client/booking/:id"
                                element={<Accommodation />}
                            />
                        </Route>

                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
                <Toaster
                    position="top-center"
                    gutter={12}
                    containerStyle={{ margin: "8px" }}
                    toastOptions={{
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 5000,
                        },
                        style: {
                            fontSize: "16px",
                            maxWidth: "500px",
                            padding: "16px 24px",
                            backroundColor: "var(--color-grey-0)",
                            color: "var(--color-grey-700)",
                        },
                    }}
                />
            </QueryClientProvider>
        </DarkModeProvider>
    );
}
