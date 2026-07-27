import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import '../shared/styles/index.scss';

/**
 * App
 * Root component of the application
 * - Imports global styles
 * - Provides router to all pages
 */
const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
