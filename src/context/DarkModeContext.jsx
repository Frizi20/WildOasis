/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        window.matchMedia("(prefers-color-scheme: dark").matches,
        "isDarkMode"
    );

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");
        } else {
            document.documentElement.classList.remove("dark-mode");
            document.documentElement.classList.add("light-mode");
        }
    }, [isDarkMode]);

    function toggleDarkMode() {
        setIsDarkMode((p) => !p);
    }

    return (
        <DarkModeContext.Provider
            value={{ isDarkMode, toggleDarkMode, isMenuOpen, setIsMenuOpen }}
        >
            {children}
        </DarkModeContext.Provider>
    );
}

function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (!context) throw new Error("Context used outside provider!");
    return context;
}

export { DarkModeProvider, useDarkMode };
