import './App.css';
import { EventForm } from './components/eventForm/eventForm';
import { EventViewer } from './components/eventViewer/eventViewer';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#red',
    },
    background: {
      default: '#000',
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <EventForm />
        <EventViewer />
      </ThemeProvider>
    </>
  );
}

export default App;
