import React, {Suspense, useEffect} from 'react';
import {useTheme} from "app/providers/ThemeProvider";
import {classNames} from "shared/lib/classNames/classNames";
import {AppRouter} from "app/providers/router/index";
import {Navbar} from "widgets/Navbar";
import {Sidebar} from "widgets/Sidebar";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {userActions} from "entities/User";
import {USER_LOCALSTORAGE_KEY} from "shared/const/localstorage";


const App = () => {
    const {theme} = useTheme()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(userActions.initAuthData)
    }, [dispatch]);
    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback=''>
                <Navbar/>
                <div className={'content-page'}>
                    <Sidebar/>
                    <AppRouter/>
                </div>
            </Suspense>
        </div>
    );
};

export default App;
