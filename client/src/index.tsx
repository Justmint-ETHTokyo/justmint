import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './redux/store';
import './style/init.scss';
import './style/font.scss';
import './style/flex.scss';
import './style/input.scss';
import './style/color.scss';
import './style/animation.scss';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <GoogleOAuthProvider 
    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
reportWebVitals();
