import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import './App.css';

/**
 * Import the components
 */
import ScreenHome from './screens/ScreenHome';
import ScreenSuccess from './screens/ScreenSuccess';
import NewOrder from './screens/tableNewOrder';
import OldOrder from './screens/tableOldOrder';
import NavTable from './screens/NavTable';
import NavMenu from './screens/NavMenu';

/**
 * Import redux
 */
import token from './token.reducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';

const store = createStore(combineReducers({token}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/**
 * Creating Private Route
 */
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
          <PrivateRoute component={NewOrder} path="/neworder" exact />
          <PrivateRoute component={OldOrder} path="/oldorder" exact />
          <PrivateRoute component={NavTable} path="/newtable" exact />
          <PrivateRoute component={NavMenu} path="/newmenu" exact />
        </Switch>
      </Router>

    </Provider>


  );
}

export default App;
