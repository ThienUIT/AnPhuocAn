import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '@/shared/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { registerLocale } from 'react-datepicker';
import vi from 'date-fns/locale/vi';

registerLocale('vi', vi);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<GlobalStyles>
			<Router>
				<App />
			</Router>
		</GlobalStyles>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
