import {Currency} from "entities/Currency/model/types/currency";
import {Country} from "shared/const/country";

export interface Profile {
    first?: string,
    lastname?:string,
    age?:number;
    currency?:Currency,
    country?: Country,
    city?: string,
    username?:string,
    avatar?:string,
}

export interface ProfileScheme {
    data?: Profile,
    form?: Profile,
    isLoading: boolean;
    error?:string;
    readonly: boolean
}
