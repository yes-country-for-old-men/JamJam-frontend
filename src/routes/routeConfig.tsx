import { Navigate } from 'react-router-dom';
import Main from '@pages/Main';
import Category from '@pages/Category';
import Search from '@pages/Search';
import Provider from '@pages/Provider';
import Service from '@pages/Service';
import Order from '@pages/Order';
import Chat from '@pages/Chat';
import My from '@pages/My';
import UserInfoEdit from '@pages/UserInfoEdit';
import Credit from '@pages/Credit';
import ProfileEdit from '@pages/ProfileEdit';
import ServiceRegister from '@pages/ServiceRegister';
import Forbidden from '@pages/Forbidden';
import NotFound from '@pages/NotFound';
import OrderManage from '@pages/OrderManage';
import ProtectedRoute from '@components/Routes/ProtectedRoute';
import ProviderRoute from '@components/Routes/ProviderRoute';

export const publicRoutes = [
  { index: true, element: <Main /> },
  { path: 'category/:categoryId', element: <Category /> },
  { path: 'search', element: <Search /> },
  { path: 'provider/:userId', element: <Provider /> },
  { path: 'service/:serviceId', element: <Service /> },
  { path: 'order', element: <Order /> },
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
      element: (
        <ProtectedRoute>
          <UserInfoEdit />
        </ProtectedRoute>
      ),
    },
    {
      path: 'credit',
      element: (
        <ProtectedRoute>
          <Credit />
        </ProtectedRoute>
      ),
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
      path: 'order-manage',
      element: (
        <ProviderRoute>
          <OrderManage />
        </ProviderRoute>
      ),
    },
  ],
};
