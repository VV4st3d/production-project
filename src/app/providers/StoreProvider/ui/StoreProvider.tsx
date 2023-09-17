import {ReactNode} from "react";
import {Provider} from "react-redux";
import {createReduxStore} from "app/providers/StoreProvider/config/store";
import {StateScheme} from "app/providers/StoreProvider/config/StateScheme";
import {DeepPartial} from "@reduxjs/toolkit";

interface StoreProviderProps {
    children?: ReactNode,
    initialState?: DeepPartial<StateScheme>
}

export const StoreProvider = ({children, initialState}:StoreProviderProps) => {
    const store = createReduxStore(initialState as StateScheme)
    return (
            <Provider store={store}>
                {children}
            </Provider>
    );
};
