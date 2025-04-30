import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { RecordsPage } from './RecordsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RecordsPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace={true} />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
