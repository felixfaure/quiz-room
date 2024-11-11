import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
    SettingsContext,
    SettingsDispatchContext,
} from "../contexts/SettingsContext";
import { v4 as uuidv4 } from "uuid";

export default function Root() {
    const settings = useContext(SettingsContext);
    const dispatch = useContext(SettingsDispatchContext);

    useEffect(() => {
        async function set_uuid() {
            if (settings.userID) return;
            let userID = localStorage.getItem("uuid");
            if (!userID) {
                userID = uuidv4();
                localStorage.setItem("uuid", userID);
            }
            dispatch({ type: "setUserID", uuid: userID });
        }
        set_uuid();
    }, [dispatch, settings.userID]);

    return (
        <div className="app">
            <Outlet />
        </div>
    );
}
