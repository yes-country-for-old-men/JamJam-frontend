import EventHandler from '@components/EventHandler';
import Layout from '@components/Layout';
import Modal from '@components/Modal';
import GuestRoute from '@components/Routes/GuestRoute';
import ScrollInitializer from '@components/ScrollInitializer';
import { ThemeProvider } from '@emotion/react';
import SignUp from '@pages/SignUp';
import {
  publicRoutes,
  protectedRoutes,
  myPageRoutes,
} from '@routes/routeConfig';
import GlobalStyle from '@styles/GlobalStyle';
import theme from '@styles/theme';
import { Provider as JotaiProvider } from 'jotai';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <JotaiProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
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
        </Router>
        <EventHandler />
        <Modal />
      </ThemeProvider>
    </JotaiProvider>
  );
};

export default App;
