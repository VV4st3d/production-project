import {LoginScheme} from "features/authByUsername/model/types/LoginScheme";
import {StateScheme} from "app/providers/StoreProvider";

export const getLoginState = (state: StateScheme) => state.loginForm
