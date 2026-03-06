import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import PageErrorBoundary from '@/shared/ui/ErrorBoundary/PageErrorBoundary';
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
  {
    index: true,
    element: (
      <PageErrorBoundary>
        <Main />
      </PageErrorBoundary>
    ),
  },
  {
    path: 'category/:categoryId',
    element: (
      <PageErrorBoundary>
        <Category />
      </PageErrorBoundary>
    ),
  },
  {
    path: 'search',
    element: (
      <PageErrorBoundary>
        <Search />
      </PageErrorBoundary>
    ),
  },
  {
    path: 'provider/:userId',
    element: (
      <PageErrorBoundary>
        <Provider />
      </PageErrorBoundary>
    ),
  },
  {
    path: 'service/:serviceId',
    element: (
      <PageErrorBoundary>
        <Service />
      </PageErrorBoundary>
    ),
  },
  { path: 'forbidden', element: <Forbidden /> },
  { path: 'not-found', element: <NotFound /> },
  { path: '*', element: <NotFound /> },
];

export const protectedRoutes = [
  {
    path: 'chat',
    element: (
      <PageErrorBoundary>
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>
      </PageErrorBoundary>
    ),
  },
  {
    path: 'order',
    element: (
      <PageErrorBoundary>
        <ClientRoute>
          <OrderCreate />
        </ClientRoute>
      </PageErrorBoundary>
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
      element: (
        <PageErrorBoundary>
          <UserInfoEdit />
        </PageErrorBoundary>
      ),
    },
    {
      path: 'credit',
      element: (
        <PageErrorBoundary>
          <Credit />
        </PageErrorBoundary>
      ),
    },
    {
      path: 'profile-edit',
      element: (
        <PageErrorBoundary>
          <ProviderRoute>
            <ProfileEdit />
          </ProviderRoute>
        </PageErrorBoundary>
      ),
    },
    {
      path: 'service-register',
      element: (
        <PageErrorBoundary>
          <ProviderRoute>
            <ServiceRegister />
          </ProviderRoute>
        </PageErrorBoundary>
      ),
    },
    {
      path: 'service-edit/:serviceId',
      element: (
        <PageErrorBoundary>
          <ProviderRoute>
            <ServiceEdit />
          </ProviderRoute>
        </PageErrorBoundary>
      ),
    },
    {
      path: 'order-manage',
      element: (
        <PageErrorBoundary>
          <ProviderRoute>
            <OrderManage />
          </ProviderRoute>
        </PageErrorBoundary>
      ),
    },
    {
      path: 'order-history',
      element: (
        <PageErrorBoundary>
          <ClientRoute>
            <OrderHistory />
          </ClientRoute>
        </PageErrorBoundary>
      ),
    },
  ],
};
