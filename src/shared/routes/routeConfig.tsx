import { Navigate } from 'react-router-dom';
import Category from '@/features/category/pages';
import Chat from '@/features/chat/pages';
import Credit from '@/features/credit/pages/Credit';
import Main from '@/features/main/pages';
import OrderCreate from '@/features/order/pages/OrderCreate';
import OrderHistory from '@/features/order/pages/OrderHistory';
import OrderManage from '@/features/order/pages/OrderManage';
import ProfileEdit from '@/features/provider/pages/ProfileEdit';
import Provider from '@/features/provider/pages/Provider';
import Search from '@/features/search/pages';
import Service from '@/features/service/pages/ServiceDetail';
import ServiceEdit from '@/features/service/pages/ServiceEdit';
import ServiceRegister from '@/features/service/pages/ServiceRegister';
import UserInfoEdit from '@/features/user/pages/UserInfoEdit';
import Forbidden from '@/pages/Forbidden';
import My from '@/pages/My';
import NotFound from '@/pages/NotFound';
import ClientRoute from '@/shared/components/Routes/ClientRoute';
import ProtectedRoute from '@/shared/components/Routes/ProtectedRoute';
import ProviderRoute from '@/shared/components/Routes/ProviderRoute';

export const publicRoutes = [
  { index: true, element: <Main /> },
  { path: 'category/:categoryId', element: <Category /> },
  { path: 'search', element: <Search /> },
  { path: 'provider/:userId', element: <Provider /> },
  { path: 'service/:serviceId', element: <Service /> },
  { path: 'order', element: <OrderCreate /> },
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
