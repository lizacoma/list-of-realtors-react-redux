import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './redux/reducers/rootReducer.js';

import CreateOrEdit from './containers/CreateOrEdit.js';

class App extends Component {

  render() {
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
    );

    return (
        <div className="App">
          <Provider store={store}>
            <CreateOrEdit/>
          </Provider>
        </div>
    );
  }
}
export default App;
// ReactDOM.render(<App />, document.getElementById('app'));
