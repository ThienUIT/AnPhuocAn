import { ReactElement } from 'react';
import './styles.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
function GlobalStyles({ children }: { children: ReactElement }) {
	return children;
}

export default GlobalStyles;
