import React, { Component } from 'react'
import { Button, Row, Col, Modal } from 'react-bootstrap'

export default class EditModal extends Component {
    constructor() {
        super();
        this.state = { title: '', content: '' ,show: false };
   
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handletitle = this.handletitle.bind(this);
        this.handlebody = this.handlebody.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.data.title,
            content: nextProps.data.content
        })
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
        fetch('/api/posts/' + this.props.data._id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
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
    render() {
        return (
            <div>
                <Modal
           show={this.props.show}
            bsSize="large"
            aria-labelledby="contained-modal-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">Update your post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="container">
                        <form onSubmit={this.onFormSubmit}>
                            <label>TITLE:</label>
                            <input value={this.state.title} style={{width:'70%'}} onChange={this.handletitle} name="title" type="text" className="form-control"  placeholder="Title of the Blog"  /><br />
                            <label>POST:</label>
                            <textarea value={this.state.content} style={{width:'70%'}} onChange={this.handlebody} name="content" className="form-control" rows="5" placeholder="Contents of the post here..."></textarea><br />
                            <button type="submit" className="b1"  className="btn btn-dark">SUBMIT</button>
                        </form>
                    </div>
                </div> 
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.handleHide}>Close</Button>
            </Modal.Footer>
          </Modal>
            </div>
        )
    }
}
