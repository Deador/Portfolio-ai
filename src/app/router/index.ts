import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CasePage from '../pages/CasePage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(HomePage),
  },
  {
    path: '/case/:slug',
    element: React.createElement(CasePage),
  },
];

export const router = createBrowserRouter(routes);
