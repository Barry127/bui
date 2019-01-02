import React from 'react';
import { Router } from '@reach/router';

import Nav from './Nav';
import App from '../App';

import pages from './pages';

const Docs = () => (
  <div className="main">
    <Nav />
    <main>
      <article>
        <Router>
          <pages.GettingStarted path="getting-started" />
          <pages.Affix path="/components/Affix" />
          <App path="app" />
        </Router>
      </article>
    </main>
    <div className="right" />
  </div>
);

export default Docs;
