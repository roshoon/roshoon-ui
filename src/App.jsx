import { styled, Stack, Box, Container, Button } from '@mui/material';
import RoshoonSkeleton from './RoshoonSkeleton';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import * as paths from './paths';
import AppBar from './features/appBar/AppBar';
import Footer from './features/footer';
import ErrorBoundary from './features/errorBoundary';
import EntitledElement from './components/EntitledElement';
import Roshoon from './features/roshoon';
import {
  notifySuccess,
  notifyInfo,
  notifyWarning,
  notifyError,
} from 'src/features/snackbarProvider/useSnackbar';

const NotificationButtons = () => {
  return (
    <Box spacing={2} marginTop={10}>
      <Button
        variant="outlined"
        color="success"
        onClick={() => notifySuccess('This is a success Message')}
      >
        Notify Success
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={() => notifyError('This is an Error Message')}
      >
        Notify Error
      </Button>
      <Button
        variant="outlined"
        color="info"
        onClick={() => notifyInfo('This is an Info Message')}
      >
        Notify Info
      </Button>
      <Button
        variant="outlined"
        color="warning"
        onClick={() => notifyWarning('This is a Warning Message')}
      >
        Notify Warning
      </Button>
    </Box>
  );
};

const AppRoot = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100%',
  minHeight: 500,
}));

const MainContent = styled(Container)(({ theme }) => ({
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 80,
}));

const UnknownRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(paths.homepage);
  }, [navigate]);
  return null;
};

const App = () => {
  return (
    <AppRoot>
      <AppBar />
      <MainContent disableGutters>
        <Routes>
          <Route
            path={paths.homepage}
            element={
              <ErrorBoundary>
                <EntitledElement role={'dev'} fallback={<RoshoonSkeleton />}>
                  <Roshoon />
                </EntitledElement>
              </ErrorBoundary>
            }
          />
          <Route path="*" element={<UnknownRoute />} />
        </Routes>
        <NotificationButtons />
        <Footer />
      </MainContent>
    </AppRoot>
  );
};

export default App;
