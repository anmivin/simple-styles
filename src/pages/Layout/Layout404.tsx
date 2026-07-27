import { useStore } from 'effector-react';

import { Header } from 'widgets/Header/Header';

import { PlatformTypeService } from 'shared/models/PlatformType.models';
import ErrorScreen404 from 'shared/ui/ErrorScreen/ErrorScreen404';

import { StyledIonHeader } from './Layout.styled';

const {
  outputs: { $viewType },
} = PlatformTypeService;

const Layout404 = ({ mainRoute }: { mainRoute: string }) => {
  const viewType = useStore($viewType);
  return (
    <>
      <StyledIonHeader viewType={viewType}>
        <Header onOpenApprovalForm={() => void 0} hideNotifications viewType={viewType} />
      </StyledIonHeader>
      <ErrorScreen404 customMainRoute={mainRoute} />
    </>
  );
};

export default Layout404;
