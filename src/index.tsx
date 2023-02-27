import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import {createBrowserHistory} from "history"
import {RecoilRoot} from "recoil"
import "react-perfect-scrollbar/dist/css/styles.css"
import "handsontable/dist/handsontable.min.css";
import "./Style/fonts.css"
import "./Style/index.scss"
import "./Style/colors.css"
import "./Style/style-form.scss"
import "./Style/style-input.scss"
import "./Style/style-text.scss"
import "./Style/table-style.scss"
import 'antd/dist/antd.css';
import {DevSupport} from "@react-buddy/ide-toolbox";
// import {ComponentPreviews, useInitial} from "./dev";


const history = createBrowserHistory()
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter history={history}>
        {/*<DevSupport ComponentPreviews={ComponentPreviews}*/}
        {/*            useInitialHook={useInitial}*/}
        {/*>*/}
          <App/>
        {/*</DevSupport>*/}
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
