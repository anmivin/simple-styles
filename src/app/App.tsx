import Routing from './Routing';

// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { Provider } from 'react-redux';
// import { setupStore } from '@shared/stores/global.store';
// import ruLocale from 'date-fns/locale/ru';

import { BrowserRouter } from 'react-router-dom';
// import AbilityProvider from '@shared/ability/AbilityContext';
// import ToastProvider from '@ui/Toast/ToastProvider';
// import { NotificationProvider } from '@shared/ui/Notifications/NotificationProvider';
import { ThemeProvider } from '@shared/theme';

function App() {
  return (
    // <Provider store={setupStore()}>
    //  <LocalizationProvider
    //    dateAdapter={AdapterDateFns}
    //    adapterLocale={ruLocale}
    //   >

    //      <AbilityProvider>
    //      <ToastProvider>
    //         <NotificationProvider> <UserInit>
    <ThemeProvider>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </ThemeProvider>
    //    </UserInit>   </NotificationProvider>
    //    </ToastProvider>
    //     </AbilityProvider>
    //   </LocalizationProvider>
    //  </Provider>
  );
}

export default App;
