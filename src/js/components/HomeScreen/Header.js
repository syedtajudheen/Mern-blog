import React, { Component } from 'react'
import { Navbar , NavItem, Nav  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header'

export default class Header extends Component {
    render() {
        return ( 
                <Navbar fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand  >
                        <a href="/api/posts">My_Blog</a>
                        <Link to={'/CreatePosts'}><h3  className="brandname"  >POST YOUR BLOG</h3></Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar> 
        )
    }
}
