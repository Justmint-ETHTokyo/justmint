import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
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
  <Provider store={store}>
    <App />
  </Provider>
);
reportWebVitals();
