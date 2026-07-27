import { Button, Flex } from "antd";
import type { ReactNode } from "react";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { routes } from "@shared/constants/routes";

const Layout = ({ children }: { children: ReactNode }) => {
  const path = useLocation();
  return (
    <>
      <Flex
        style={{
          backgroundColor: "",
          position: "fixed",
          top: "0px",
          width: "100%",
        }}
      >
        {routes.map((route) => (
          <Link to={route.link} key={route.link}>
            <Button color={path.pathname === route.link ? "blue" : "lime"}>
              {route.name}
            </Button>
          </Link>
        ))}
      </Flex>
      <Flex style={{ padding: "30px 0px" }}> {children}</Flex>
    </>
  );
};

export default Layout;
