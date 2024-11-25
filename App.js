import LoginScreen from './screens/AccountScreen/screens/LoginScreen';
import MainContainer from './navigation/MainContainer';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
}
