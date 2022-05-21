import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container } from "@mui/material";
import TransportForm from "./TransportForm";

const theme = createTheme({
  palette: {
    primary: {
      light: '#e1ffb1',
      main: '#aed581',
      dark: '#7da453',
      contrastText: '#000000',
    },
    secondary: {
      light: '#e2f1f8',
      main: '#b0bec5',
      dark: '#808e95',
      contrastText: '#f5f5f5',
    },
    background: {
      default: "#e6e6e6",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Container>
          <TransportForm />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
