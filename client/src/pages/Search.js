import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import axios from "axios";

class Search extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  // componentDidMount() {
  //   this.loadBooks();
  // }

  // loadBooks = () => {
  //   API.getBooks()
  //     .then(res =>
  //       this.setState({ books: res.data, title: "", author: "", synopsis: "" })
  //     )
  //     .catch(err => console.log(err));
  // };

  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.state.title)
        .then(response => {
            this.setState({
                books: response.data.items.map(item => {
                    // console.log(item.volumeInfo)
                    return {
                        title: item.volumeInfo.title,
                        authors: item.volumeInfo.authors,
                        description: item.volumeInfo.description,
                        image: item.volumeInfo.imageLinks.thumbnail,
                        link: item.volumeInfo.infoLink
                    }
                })
            })
            console.log(this.state.books)
        })
}

  render() {
    return (
      <Container fluid>
        {/* <Row> */}
          
            
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              
              <FormBtn
                // disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search Book
              </FormBtn>
            </form>
          
          
        {/* </Row> */}
        {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem>
                    
                      <strong>
                        <img src = {book.image}></img>
                        {book.title} by {book.authors} {book.description}
                         <a href = {book.link}>Link</a>
                      </strong>
                    
                   
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
      </Container>
    );
  }
}

export default Search;
