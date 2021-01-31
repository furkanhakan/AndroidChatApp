import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from './Home'
import UserAuth from './UserAuth'

const Routes = () => (
  <Router>
    <Router>
      <Scene key="root">
        <Scene key="Home" title="Home" component={Home} initial={true}></Scene>
        <Scene key="UserAuth" title="Login" component={UserAuth}></Scene>
      </Scene>
    </Router>
  </Router>
)
export default Routes