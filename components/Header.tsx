import { Appbar } from "react-native-paper";
import appInfo from "./../app.json";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

export type HeaderContextType = { title?: string, setTitle: Dispatch<SetStateAction<string | null>> };
const HeaderContext = createContext<HeaderContextType | null>(null);

export function Header() {
    const { title } = useHeaderContext() ?? {};

    return (
        <Appbar.Header>
            <Appbar.Content title={title ?? appInfo.expo.name}></Appbar.Content>
        </Appbar.Header>
    )
}

export function HeaderContextProvider({ children }: { children: any }) {
    const [title, setTitle] = useState<string | null>(null);

    return (
        <HeaderContext.Provider value={{ title, setTitle }}>
            {children}
        </HeaderContext.Provider>
    )
}

export function useHeaderContext() {
    return useContext(HeaderContext);
}