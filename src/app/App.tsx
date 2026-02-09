import { Routes, Route } from 'react-router-dom';
import SignUp from '@/features/signup/pages';
import Dialog from '@/shared/components/Dialog';
import EventHandler from '@/shared/components/EventHandler';
import Layout from '@/shared/components/Layout';
import GuestRoute from '@/shared/components/Routes/GuestRoute';
import ScrollInitializer from '@/shared/components/ScrollInitializer';
import {
  publicRoutes,
  protectedRoutes,
  myPageRoutes,
} from '@/shared/routes/routeConfig';

const App = () => {
  return (
    <>
      <ScrollInitializer />
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
      <EventHandler />
      <Dialog />
    </>
  );
};

export default App;
