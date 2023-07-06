import { lazy } from 'react';

export const UserPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./UserPage')), 500);
}));
