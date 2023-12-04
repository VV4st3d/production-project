import React, {memo, Suspense, useCallback} from 'react';
import {Route, Routes} from "react-router-dom";
import {PageLoader} from "widgets/PageLoader/PageLoader";
import {AppRoutesProps, routeConfig} from "shared/config/routerConfig/routerConfig";
import {RequireAuth} from "./RequireAuth";

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps)=>{
        const element = (
            <>
                {route.element}
            </>
        )
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth children={element}/> : element}
            />
        )
    },[])
    return (
        <Suspense fallback={<PageLoader/>}>
            <Routes>
                {Object.values(routeConfig).map(renderWithWrapper)}
            </Routes>
        </Suspense>
    );
};

export default memo(AppRouter)
