import React, { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from './routeConfig';
import s from './Router.module.scss'

export const AppRouter = () => (
    <Routes>
        {Object.values(routeConfig).map(({ element, path }) => (
            <Route
                key={path}
                path={path}
                element={(
                    <Suspense fallback={
                        <div className={s.spinner}>
                            <Spinner
                                animation='border'/>
                        </div>
                    }>
                        <div className='page-wrapper'>{element}</div>
                    </Suspense>
                )}
            />
        ))}
    </Routes>
);
