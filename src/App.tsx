import React, {Suspense, useContext, useState} from 'react';
import {Counter} from "./components/Counter";
import './styles/index.scss'
import {Link, Route, Routes} from "react-router-dom";
import {AboutPageAsync} from "./pages/AboutPage/AboutPageAsync";
import {MainPageAsync} from "./pages/MainPage/MainPageAsync";
import {ThemeContext, Themes} from "./theme/ThemeContext";
import {useTheme} from "./theme/useTheme";
import {classNames} from "./helpers/classNames/classNames";



const App = () => {
    const {theme, toggleTheme} = useTheme()
    return (
        <div className={classNames('app', {}, [theme])}>
            <Link to={'/'}>Main</Link>
            <Link to={'/about'}>About site</Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path={'/about'} element={<AboutPageAsync/>}/>
                    <Route path={'/'} element={<MainPageAsync/>}/>
                </Routes>
            </Suspense>
            12321313123123123
            <button onClick={toggleTheme}>
                change theme
            </button>
        </div>
    );
};

export default App;