import React from 'react';
import { createBrowserRouter, RouteObject, Outlet } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CasePage from '../pages/CasePage';
import RootLayout from '../layouts/RootLayout';

/**
 * Layout wrapper component for use in routes
 */
const LayoutWrapper = () => (
  <RootLayout>
    <Outlet />
  </RootLayout>
);

const routes: RouteObject[] = [
  {
    element: React.createElement(LayoutWrapper),
    children: [
      {
        path: '/',
        element: React.createElement(HomePage),
      },
      {
        path: '/case/:slug',
        element: React.createElement(CasePage),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
