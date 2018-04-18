import React, { Component } from 'react'
import './posts.css'
import EditModal from './EditModal'
import { Button, Row, Col, Modal } from 'react-bootstrap'
export default class Posts extends Component {
    constructor() {
        super();
        this.state = { title: '', content: '', data:'',show: false };
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handletitle = this.handletitle.bind(this);
        this.handlebody = this.handlebody.bind(this);
    }
    
    // onpostChange(data){
    // this.setState({title: data.title})
    // this.setState({content: data.content})
    // }
    onDeletePost(data){
        fetch('/api/posts/' + data._id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
           })
            .then(function (response) {
                console.log(response);
                alert("Sucessfully Posted!")
                this.props.onpostChange(data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleShow(data) {
        this.setState({ show: true });
        this.setState({data: data})
      }
    
      handleHide() {
        this.setState({ show: false });
      }
    
    handletitle(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
   
    handlebody(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    onFormSubmit(event) {
        event.preventDefault();

        let data = {
            title: this.state.title,
            content: this.state.content
        }
        console.log(data);
        fetch('/api/posts', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
           })
            .then(function (response) {
                console.log(response);
                alert("Sucessfully Posted!")
            })
            .catch(function (error) {
                console.log(error);
            });
    } 

    render(){
        return (<div>
            <div className="container content_container" style={{marginTop:'6%'}}> 
                <EditModal data={this.state.data} onpostChange={this.onpostChange} handleShow={this.handleShow} handleHide={this.handleHide} show={this.state.show}/>
                {
                    this.props.posts ?
                    this.props.posts.map((value, index)=>{
                        return(
                            <div key={index}>
                                <Row className="show-grid">
                                <Col xs={10} md={10} >
                                    <h3 style={{textAlign:"left"}}  className="post_Title">{value.title}</h3>
                                    <p style={{}}  className="post_Title">{value.content}</p>
                                </Col>
                                <Col xs={2} md={2} >
                                    <Button style={{margin:'10'}} onClick={()=>this.handleShow(value)} bsStyle="primary">edit</Button>
                                    <Button style={{margin:'10'}} onClick={()=>this.onDeletePost(value)}  bsStyle="danger">Delete</Button>
                                </Col>
                                </Row>
                            </div>
                        )
                    }) : ''
                }
            </div>
            </div>
        )
    }
}