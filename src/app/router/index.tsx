import { createBrowserRouter, RouteObject } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import CasePage from '../pages/CasePage';
import RootLayout from '../layouts/RootLayout';

const routes: RouteObject[] = [
  {
    children: [
      {
        path: '/',
        element: (
          <RootLayout headerTheme="inverted">
            <HomePage />
          </RootLayout>
        ),
      },
      {
        path: '/case/:slug',
        element: (
          <RootLayout>
            <CasePage />
          </RootLayout>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  basename: '/Portfolio-ai',
});
