import React, { Component } from 'react'
import Header from '../components/HomeScreen/Header'
import Posts from '../components/HomeScreen/Posts'

export default class HomeScreen extends Component {
    constructor(){
        super()
        this.state = {
            posts: ''
        }
    }
    componentDidMount  ()  {
        fetch('/api/posts')
        .then((res) => res.json())
        .then((data) => this.setState({posts: data}))
    }
    render() {
        return (
            <div>
                <Header/>
                <Posts posts={this.state.posts} />
            </div>
        )
    }
}
