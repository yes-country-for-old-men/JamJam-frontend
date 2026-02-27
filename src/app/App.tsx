import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dialog from '@/shared/components/Dialog';
import EventHandler from '@/shared/components/EventHandler';
import Layout from '@/shared/components/Layout';
import GuestRoute from '@/shared/components/Routes/GuestRoute';
import ScrollInitializer from '@/shared/components/ScrollInitializer';
import Spinner from '@/shared/components/Spinner';
import {
  publicRoutes,
  protectedRoutes,
  myPageRoutes,
} from '@/shared/routes/routeConfig';

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
