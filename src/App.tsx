import EventHandler from '@components/EventHandler';
import Layout from '@components/Layout';
import Modal from '@components/Modal';
import GuestRoute from '@components/Routes/GuestRoute';
import ScrollInitializer from '@components/ScrollInitializer';
import SignUp from '@pages/SignUp';
import {
  publicRoutes,
  protectedRoutes,
  myPageRoutes,
} from '@routes/routeConfig';
import { Routes, Route } from 'react-router-dom';

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
      <Modal />
    </>
  );
};

export default App;
