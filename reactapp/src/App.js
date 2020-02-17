import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import './App.css';

import ScreenHome from './ScreenHome';
import ScreenSuccess from './ScreenSuccess'

import token from './token.reducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';

const store = createStore(combineReducers({token}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
      store.getState().token !== ''
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

console.log(store.getState())

function App() {
  return (
    
    <Provider store={store}>

      <Router>
        <Switch>
          <Route component={ScreenHome} path="/" exact />
          <PrivateRoute component={ScreenSuccess} path="/screensuccess" exact />
        </Switch>
      </Router>

    </Provider>


  );
}

export default App;
