import { createContext, useReducer } from "react";

export const SettingsContext = createContext(null);
export const SettingsDispatchContext = createContext(null);

// eslint-disable-next-line react/prop-types
export function SettingsProvider({ children }) {
    const [settings, dispatch] = useReducer(SettingsReducer, initialSettings);

    return (
        <SettingsContext.Provider value={settings}>
            <SettingsDispatchContext.Provider value={dispatch}>
                {children}
            </SettingsDispatchContext.Provider>
        </SettingsContext.Provider>
    );
}

function SettingsReducer(settings, action) {
    switch (action.type) {
        case "setUserID": {
            return { ...settings, userID: action.uuid };
        }
        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
}

const initialSettings = {
    userID: false,
};
