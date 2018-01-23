/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'containers/Home/Loadable';
import Article from 'containers/Article/Loadable';
import Author from 'containers/Author/Loadable';
import Login from 'containers/Login/Loadable';
import Settings from 'containers/Settings';
import Editor from 'containers/Editor';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import {
  getCurrentUser,
  userIsAuthenticated,
  userIsNotAuthenticated,
} from '../../auth';

export default function App() {
  return (
    <div>
      <Header currentUser={getCurrentUser()} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/article/:slug" component={Article} />
        <Route path="/author/:username" component={Author} />
        <Route path="/login" component={userIsNotAuthenticated(Login)} />
        <Route path="/editor/:slug" component={userIsAuthenticated(Editor)} />
        <Route path="/editor" component={userIsAuthenticated(Editor)} />
        <Route path="/settings" component={userIsAuthenticated(Settings)} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  );
}
