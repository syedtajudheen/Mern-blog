import React, { Component } from 'react'

export default class CreatePosts extends Component {
    constructor() {
        super();
        this.state = { title: '', content: '' };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handletitle = this.handletitle.bind(this);
        this.handlebody = this.handlebody.bind(this);
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
    render() {
        return (
                <div>
                    <h1  >POST BLOG</h1>
                    <div className="container">
                        <form onSubmit={this.onFormSubmit}>
                            <label>TITLE:</label>
                            <input value={this.state.title} onChange={this.handletitle} name="title" type="text" className="form-control"  placeholder="Title of the Blog"  /><br />
                            <label>POST:</label>
                            <textarea value={this.state.content} onChange={this.handlebody} name="content" className="form-control" rows="5" placeholder="Contents of the post here..."></textarea><br />
                            <button type="submit" className="b1" className="btn btn-dark">SUBMIT</button>
                        </form>
                    </div>
                </div> 
                )
    }
}
