import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';
import { SocketContext, socket } from './context/socket';

export const loginContext = React.createContext(false);

const App = () => {
  const [isLogged, setIsLogged] = useState(localStorage.getItem('isLogged'));
  const value = { isLogged, setIsLogged };

  const content = useRoutes(routes(isLogged));
  console.log(isLogged);
  return (
    <loginContext.Provider value={value}>
      <SocketContext.Provider value={socket}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            {content}
          </ThemeProvider>
        </StyledEngineProvider>
      </SocketContext.Provider>
    </loginContext.Provider>
  );
};

export default App;
