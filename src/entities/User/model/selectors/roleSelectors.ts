import {StateScheme} from "app/providers/StoreProvider";
import {createSelector} from "@reduxjs/toolkit";
import {UserRole} from "../types/user";

export const getUserRoles = (state: StateScheme) => state.user.authData?.roles

export const isUserAdmin = createSelector(
    getUserRoles, (roles) => Boolean(roles?.includes(UserRole.ADMIN)))

export const isUserManager = createSelector(
    getUserRoles, (roles) => Boolean(roles?.includes(UserRole.MANAGER)))
