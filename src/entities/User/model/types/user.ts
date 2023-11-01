//интерфейс которые возвращает бекенд
export interface User {
    id: string;
    username: string;
    avatar?: string
}
//интерфейс для стейта, если его нет то пользователь не авторизован, если хранятся данные то авторизован
export interface userScheme {
    authData?: User

    _inited: boolean
}
