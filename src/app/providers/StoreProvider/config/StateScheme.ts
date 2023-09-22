import {CounterScheme} from "entities/Counter";
import {userScheme} from "entities/User";
import {LoginScheme} from "features/authByUsername";

export interface StateScheme {
    counter: CounterScheme,
    user: userScheme,
    loginForm: LoginScheme
}

