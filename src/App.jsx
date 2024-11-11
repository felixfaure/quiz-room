import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Room from "./pages/Room";
import ErrorPage from "./pages/ErrorPage";
import { SettingsProvider } from "./contexts/SettingsContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "room/:roomid",
                element: <Room />,
            },
        ],
    },
]);

function App() {
    return (
        <SettingsProvider>
            <RouterProvider router={router} />
        </SettingsProvider>
    );
}

export default App;
