import {useSelector} from "react-redux";
import {getUserAuthData, getUserRoles, UserRole} from "@/entities/User";
import {Navigate, useLocation} from "react-router-dom";
import React, {ReactNode, useMemo} from "react";
import {getRouteForbidden, getRouteMain} from "@/shared/const/router";

interface RequireAuthProps {
    children: ReactNode,
    roles?: UserRole[]
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
    let auth = useSelector(getUserAuthData);
    let location = useLocation();
    const userRoles = useSelector(getUserRoles)

    const hasRequiredRoles = useMemo(()=>{
        if(!roles){
            return true
        }
        return roles.some(requiredRole=>{
            return userRoles?.includes(requiredRole)
        })
    }, [roles, userRoles])

    if (!auth) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
    }

    if(!hasRequiredRoles){
        return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />;
    }

    return children;
}
