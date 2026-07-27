import { Navigate, Route, Routes } from "react-router-dom";
import Error from "@pages/Error";
import Layout from "./Layout";

import { routes, Paths } from "@shared/constants/routes";

const Routing = () => {
  return (
    <Routes>
      {routes.map(({ link, Component }) => (
        <Route
          key={link}
          path={link}
          element={
            /*          userInfo ? ( */
            <Layout>
              <Component />
            </Layout>
            /*   ) : (
              <Navigate to={Paths.login} replace />
            ) */
          }
        ></Route>
      ))}
      {/*       <Route
        path={Paths.login}
        element={
          userInfo ? <Navigate to={mainPages?.[0]?.link} replace /> : <Login />
        }
      />
      <Route
        path={Paths.loginID}
        element={
          userInfo ? <Navigate to={mainPages?.[0]?.link} replace /> : <Login />
        }
      /> */}

      <Route path="/" element={<Navigate to={routes[0].link} replace />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Routing;
