import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import ClientRoute from '@/shared/ui/Routes/ClientRoute';
import ProtectedRoute from '@/shared/ui/Routes/ProtectedRoute';
import ProviderRoute from '@/shared/ui/Routes/ProviderRoute';

const Category = lazy(() => import('@/pages/category'));
const Chat = lazy(() => import('@/pages/chat'));
const Credit = lazy(() => import('@/pages/credit'));
const Main = lazy(() => import('@/pages/main'));
const OrderCreate = lazy(() => import('@/pages/order-create'));
const OrderHistory = lazy(() => import('@/pages/order-history'));
const OrderManage = lazy(() => import('@/pages/order-manage'));
const ProfileEdit = lazy(() => import('@/pages/provider-edit'));
const Provider = lazy(() => import('@/pages/provider'));
const Search = lazy(() => import('@/pages/search'));
const Service = lazy(() => import('@/pages/service-detail'));
const ServiceEdit = lazy(() => import('@/pages/service-edit'));
const ServiceRegister = lazy(() => import('@/pages/service-register'));
const UserInfoEdit = lazy(() => import('@/pages/user-info-edit'));
const Forbidden = lazy(() => import('@/pages/forbidden'));
const My = lazy(() => import('@/pages/my'));
const NotFound = lazy(() => import('@/pages/not-found'));

export const publicRoutes = [
  { index: true, element: <Main /> },
  { path: 'category/:categoryId', element: <Category /> },
  { path: 'search', element: <Search /> },
  { path: 'provider/:userId', element: <Provider /> },
  { path: 'service/:serviceId', element: <Service /> },
  { path: 'forbidden', element: <Forbidden /> },
  { path: 'not-found', element: <NotFound /> },
  { path: '*', element: <NotFound /> },
];

export const protectedRoutes = [
  {
    path: 'chat',
    element: (
      <ProtectedRoute>
        <Chat />
      </ProtectedRoute>
    ),
  },
  {
    path: 'order',
    element: (
      <ClientRoute>
        <OrderCreate />
      </ClientRoute>
    ),
  },
];

export const myPageRoutes = {
  parentElement: (
    <ProtectedRoute>
      <My />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <Navigate to="info-edit" replace /> },
    {
      path: 'info-edit',
      element: <UserInfoEdit />,
    },
    {
      path: 'credit',
      element: <Credit />,
    },
    {
      path: 'profile-edit',
      element: (
        <ProviderRoute>
          <ProfileEdit />
        </ProviderRoute>
      ),
    },
    {
      path: 'service-register',
      element: (
        <ProviderRoute>
          <ServiceRegister />
        </ProviderRoute>
      ),
    },
    {
      path: 'service-edit/:serviceId',
      element: (
        <ProviderRoute>
          <ServiceEdit />
        </ProviderRoute>
      ),
    },
    {
      path: 'order-manage',
      element: (
        <ProviderRoute>
          <OrderManage />
        </ProviderRoute>
      ),
    },
    {
      path: 'order-history',
      element: (
        <ClientRoute>
          <OrderHistory />
        </ClientRoute>
      ),
    },
  ],
};
