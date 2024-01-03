import {UserRole} from "../consts/consts";


//интерфейс которые возвращает бекенд
export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[]
}

//интерфейс для стейта, если его нет то пользователь не авторизован, если хранятся данные то авторизован
export interface userScheme {
    authData?: User

    _inited: boolean
}
