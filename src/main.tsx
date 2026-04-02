import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import App from './App';
import { store } from './store';
import '@/i18n';
import 'antd-mobile/es/global';
import '@/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
