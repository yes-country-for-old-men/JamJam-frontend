import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import ClientRoute from '@/shared/components/Routes/ClientRoute';
import ProtectedRoute from '@/shared/components/Routes/ProtectedRoute';
import ProviderRoute from '@/shared/components/Routes/ProviderRoute';

const Category = lazy(() => import('@/features/category/pages'));
const Chat = lazy(() => import('@/features/chat/pages'));
const Credit = lazy(() => import('@/features/credit/pages/Credit'));
const Main = lazy(() => import('@/features/main/pages'));
const OrderCreate = lazy(() => import('@/features/order/pages/OrderCreate'));
const OrderHistory = lazy(() => import('@/features/order/pages/OrderHistory'));
const OrderManage = lazy(() => import('@/features/order/pages/OrderManage'));
const ProfileEdit = lazy(() => import('@/features/provider/pages/ProfileEdit'));
const Provider = lazy(() => import('@/features/provider/pages/Provider'));
const Search = lazy(() => import('@/features/search/pages'));
const Service = lazy(() => import('@/features/service/pages/ServiceDetail'));
const ServiceEdit = lazy(() => import('@/features/service/pages/ServiceEdit'));
const ServiceRegister = lazy(
  () => import('@/features/service/pages/ServiceRegister'),
);
const UserInfoEdit = lazy(() => import('@/features/user/pages/UserInfoEdit'));
const Forbidden = lazy(() => import('@/pages/Forbidden'));
const My = lazy(() => import('@/pages/My'));
const NotFound = lazy(() => import('@/pages/NotFound'));

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
