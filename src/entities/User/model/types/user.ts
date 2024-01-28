import { UserRole } from '../consts/consts';
import { FeaturesFlags } from '@/shared/types/featuresFlags';

//интерфейс которые возвращает бекенд
export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
    features?: FeaturesFlags;
}

//интерфейс для стейта, если его нет то пользователь не авторизован, если хранятся данные то авторизован
export interface userScheme {
    authData?: User;

    _inited: boolean;
}
