import {CounterScheme} from "entities/Counter";
import {userScheme} from "entities/User";

export interface StateScheme {
    counter: CounterScheme,
    user: userScheme
}

