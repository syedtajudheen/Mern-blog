import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styles from './style.css'
import HomeScreen from './containers/HomeScreen'
import CreatePosts from './containers/CreatePosts'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

class App extends Component{

	render() {
		return (
			<BrowserRouter >
				<Switch> 
					<Route exact path='/' component={HomeScreen}></Route>
					<Route path='/CreatePosts' component={CreatePosts}></Route>
				</Switch>
			</BrowserRouter>
		)
	}
}


export default App

ReactDOM.render(<App />, document.getElementById('root'))
