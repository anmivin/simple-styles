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
  function sanitizeFilename(name) {
    return name
      .toLowerCase()
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/[^a-z0-9_\-\.]/g, '') // Remove special characters
      .replace(/_+/g, '_') // Replace multiple underscores
      .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
  }

  const onClick = () => {
    console.log(
      all.map((ae) => {
        const imData = images.find((im) => im.name === ae.name);
        const metadata = {};
        const flatSections = ae.sections.map((s) => {
          const [first, ...last] = s;
          for (let i = 0; i < last.length; i = i + 2) {
            if (!metadata[first]) metadata[first] = {};
            let data = last[i + 1];
            console.log(first);
            if (first === 'Connections') {
              data = data.split(/(?<=[a-z])(?=[A-Z])/).map((nan) => sanitizeFilename(nan));
            }
            metadata[first][last[i]] = data;
          }
        });

        const cats = Object.entries(categories)
          .filter(([k, v]) => v.includes(ae.name))
          .map(([k, v]) => k);
        return {
          url: ae.url,
          name: ae.name,
          id: sanitizeFilename(ae.name),
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
