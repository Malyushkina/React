import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Header } from './Header.jsx';

window.addEventListener('load', () => {
  ReactDom.render(<Header />, document.getElementById('react_root'));
});
