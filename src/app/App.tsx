import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  publicRoutes,
  protectedRoutes,
  myPageRoutes,
} from '@/shared/config/routeConfig';
import Dialog from '@/shared/ui/Dialog';
import EventHandler from '@/shared/ui/EventHandler';
import Layout from '@/shared/ui/Layout';
import GuestRoute from '@/shared/ui/Routes/GuestRoute';
import ScrollInitializer from '@/shared/ui/ScrollInitializer';
import Spinner from '@/shared/ui/Spinner';

const SignUp = lazy(() => import('@/pages/signup'));

const PageFallback = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100dvh',
    }}
  >
    <Spinner />
  </div>
);

const App = () => {
  return (
    <>
      <ScrollInitializer />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route
            path="/signup"
            element={
              <GuestRoute>
                <SignUp />
              </GuestRoute>
            }
          />
          <Route path="/" element={<Layout />}>
            {publicRoutes.map(({ path, element, index }) => (
              <Route
                key={path || 'index'}
                path={path}
                index={index}
                element={element}
              />
            ))}
            {protectedRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
            <Route path="/my" element={myPageRoutes.parentElement}>
              {myPageRoutes.children.map(({ path, element, index }) => (
                <Route
                  key={path || 'index'}
                  path={path}
                  index={index}
                  element={element}
                />
              ))}
            </Route>
          </Route>
        </Routes>
      </Suspense>
      <EventHandler />
      <Dialog />
    </>
  );
};

export default App;
