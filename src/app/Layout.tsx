import { Button, Flex } from 'antd';
import type { ReactNode } from 'react';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { routes } from '@shared/constants/routes';

import all from '../../test_results.json';
import categories from '../../categories.json';
import images from '../../images_metadata.json';
const Layout = ({ children }: { children: ReactNode }) => {
  const path = useLocation();
  const onClick = () => {
    console.log(
      all.map((ae) => {
        const imData = images.find((im) => im.name === ae.name);
        const metadata = {};
        const flatSections = ae.sections.map((s) => {
          const [first, ...last] = s;
          for (let i = 0; i < last.length; i = i + 2) {
            metadata[first][last[i]] = last[i + 1];
          }
        });

        const cats = Object.entries(categories)
          .filter(([k, v]) => v.includes(ae.name))
          .map(([k, v]) => k);
        return {
          url: ae.url,
          name: ae.name,
          filename: imData?.filename,
          imageUrl: imData?.imageUrl,
          description: ae.firstThreeParagraphs.join(' '),
          metadata,
          categories: cats,
          isVisible: cats.includes('fashion_styles') || cats.includes('fashion'),
        };
      }),
    );
  };

  return (
    <>
      <Button onClick={onClick}>дооо</Button>
      <Flex
        style={{
          backgroundColor: '',
          position: 'fixed',
          top: '0px',
          width: '100%',
        }}
      >
        {routes.map((route) => (
          <Link to={route.link} key={route.link}>
            <Button color={path.pathname === route.link ? 'blue' : 'lime'}>{route.name}</Button>
          </Link>
        ))}
      </Flex>
      <Flex style={{ padding: '30px 0px' }}> {children}</Flex>
    </>
  );
};

export default Layout;
