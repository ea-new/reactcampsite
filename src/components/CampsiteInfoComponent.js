import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, Col,Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control,LocalForm,Errors} from 'react-redux-form'; 
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


class CommentForm extends Component {
    
    constructor(props){
        super(props); 
        this.state = {
            isModalOpen: false,

            author:'',
            touched:{ 
                author: false
            }
        };

        this.toggleModal = this.toggleModal.bind(this); 
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this); 
        }
    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleCommentSubmit(values){
        this.toggleModal(); 
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text); 
        console.log("Current state is:" + JSON.stringify(values)); 
        alert("Current state is:" + JSON.stringify(values));

    }


    render(){
        return(
            <React.Fragment> 
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg"/> Submit Comment
                </Button>
                
                <Modal isOpen ={this.state.isModalOpen} toggle = {this.toggleModal}>
                        <ModalHeader toggle = {this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={ values => this.handleCommentSubmit(values)}>
                            <Label htmlFor="rating">Rating</Label>
                                <Row className ="form-group">
                                     <Col className="group">
                                        <Control.select model =".rating" id="rating" name="rating" className ="form-control"  >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        </Control.select>
                                     </Col>
                                </Row>

                                <Label htmlFor="author">Your Name</Label>
                                <Row className ="form-group">
                                    <Col className="group">
                                        <Control.text model =".author" id="author" name="author"
                                            placeholder="Your Name"
                                            className ="form-control"
                                            validators = {{
                                                minLength :minLength(2), 
                                                maxLength : maxLength(15)
                                            }}
                                        />
                                        <Errors 
                                        className = "text-danger"
                                        model = ".author"
                                        show = "touched"
                                        component ="div"
                                        messages ={{
                                            minLength :'Must be at least 2 characters', 
                                            maxLength :'Must be 15 characters or less'
                                        }}
                                    />
                                     </Col>
                                </Row>

                                <Label htmlFor="text">Comment</Label>
                                <Row className ="form-group">
                                    <Col className="group">
                                        <Control.textarea model =".text" id="text" name="text"
                                            placeholder="Please leave your comment"
                                            className ="form-control"
                                        />
                                     </Col>
                                </Row>
                                <Button type = "submit" value = "submit" color= "primary" >Submit</Button>
                            </LocalForm>
                        </ModalBody>
                </Modal>

            </React.Fragment>
        );
    }
}
 

function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments, postComment, campsiteId}) {
    
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comment => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.text}
                                <br />
                                -- {comment.author}, {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric', month: 'short', day: '2-digit'
                                }).format(new Date(Date.parse(comment.date)))}
                            </p>
                        </div>
                    );
                })}
               <CommentForm campsiteId={campsiteId} postComment={postComment} />
            </div>
        );
    }
    return <div/>;

}

function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                        comments={props.comments} 
                        addComment ={props.addComment}
                        campsiteId ={props.campsite.id} 
                        postComment={props.postComment}
                        />
                </div>
            </div>
        );
    }
    return <div />;
};


export default CampsiteInfo