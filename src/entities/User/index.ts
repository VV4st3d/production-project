export {userReducer, userActions} from './model/slice/userSlice'
export type {User, userScheme} from './model/types/user'
export {getUserAuthData} from './model/selectors/getUserAuthData/getUserAuthData'
export {getUserInited} from './model/selectors/getUserInited/getUserInited'
export {isUserAdmin, isUserManager, getUserRoles} from './model/selectors/roleSelectors'
export {UserRole} from "entities/User/model/consts/consts";
