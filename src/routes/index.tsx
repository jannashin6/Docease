import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import HomePage from '../pages/HomePage';
import DoctorsPage from '../pages/DoctorsPage';
import DoctorDetailPage from '../pages/DoctorDetailPage';
import AppointmentsPage from '../pages/AppointmentsPage';
import ChatPage from '../pages/ChatPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><HomePage /></Layout>
  },
  {
    path: '/doctors',
    element: <Layout><DoctorsPage /></Layout>
  },
  {
    path: '/doctors/:id',
    element: <Layout><DoctorDetailPage /></Layout>
  },
  {
    path: '/appointments',
    element: <Layout><AppointmentsPage /></Layout>
  },
  {
    path: '/chat',
    element: <Layout><ChatPage /></Layout>
  }
]);

const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Routes;