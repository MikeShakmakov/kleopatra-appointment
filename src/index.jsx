
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import  { Provider }  from 'react-redux'
import { store } from './store.js'
import { router } from './router'
import styles from './assets/styles/_variables.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: styles.green,
    primary2Color: styles.orange,
    pickerHeaderColor: styles.green
  }
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      {router}
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)

