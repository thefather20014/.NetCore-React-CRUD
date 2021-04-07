import './App.css';
import { Provider } from 'react-redux';
import { store } from './actions/store';
import Candidates from './components/Candidates';
import { Container } from '@material-ui/core';
import { ToastProvider } from 'react-toast-notifications';

function App() {

  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          <Candidates />
        </Container>
      </ToastProvider>
    </Provider>
  );
}

export default App;
