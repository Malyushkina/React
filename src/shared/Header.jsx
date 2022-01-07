import * as React from 'react';
import { hot } from 'react-hot-loader/root';

function HeaderComponent() {
  return (
    <header>
      <h1>HELLO Jen!!</h1>
      <p>Привет dfadg</p>
    </header>
  );
}
export const Header = hot(HeaderComponent);
