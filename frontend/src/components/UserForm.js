import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom';
import axios from "axios";
import Alerts from './utils/Alerts';
import './Style.css';

class UserForm extends Component {

constructor(props) 
{
    super(props);
    this.state = {
        fields: {},
        errors: {},
        show: false,
        variante: '',
        message: ''
    }    

    this.id = this.props.match.params.id;
    this.getUserById();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInvalid = this.handleInvalid.bind(this);

  }

  handleClose = () => this.setState( { show: false} ); 
  handleShow = () => this.setState( { show: true} ); 

  handleChange(event) {
    event.preventDefault();
    this.validate(event);
  }

  validate(event)
  {
    let fields = this.state.fields;
    let errors = this.state.errors;    
    
    fields[event.target.name] = event.target.value;
    errors[event.target.name] = event.target.validationMessage; 

    this.setState({ fields, errors });  
  }


  handleInvalid(event) 
  {
    event.preventDefault();
    this.validate(event);
  }    


  handleSubmit(event) 
  {
    event.preventDefault();   
    this.saveUser(event);
  }

  getUserById = async () => 
  {
    if(this.id > 0)
    {
       const response = await axios.get(`http://localhost:8080/users/show/${this.id}`);
       let fields = this.state.fields;

       Object.entries(response.data).map(([key, value])=>(
          fields[key] = value
       ))    
       
       this.setState({ fields }); 
    }
  }


  saveUser = async (e) => 
  {
    e.preventDefault();
    this.setState({ show: false }); 

    await axios.post('http://localhost:8080/users/user',{
        id: this.id,
        name: this.state.fields.name,
        email: this.state.fields.email
    })
    .then(response => {

       let res = response.data;
       if(res.error === true)
       {
            this.setState({ show: true, variante: 'danger', message: 'The data is not valid!' });

            let errors = this.state.errors;    
            Object.entries(res.messages).map(([index, obj])=>(
                Object.entries(obj).map(([key, value])=>(
                     errors[key] = value
                ))                                   
            )) 

          this.setState({ errors }); 
       }
       else
       { 
          this.setState({ show: true, variante: 'success', message: 'Form saved successfully' });
          setTimeout(
            () => this.props.history.push("/"),
            2000
          );
                
        }
   }); 
} 


  render() {
    return (
      <>      
      <Alerts show={ this.state.show } message={ this.state.message } variante={ this.state.variante } 
                    handleClose={ this.handleClose } handleShow={ this.handleShow } />

      <form onSubmit={this.handleSubmit} className="card" style={{padding: '20px', margin: '50px'}} >
      <div align="center"><h2><b>{this.id ? 'Edit' : 'Add'} User</b></h2></div>
        <div className="field">
           <label className="label">Name</label>
           <input type="text" name='name' className={`form-control ${this.state.errors.name ? "is-danger" : ""}`} 
              required minLength='3' value={this.state.fields.name} 
              onInvalid={this.handleInvalid} onChange={this.handleChange} /> 

            <div className="errorMsg">{this.state.errors.name}</div>              
        </div> 

        <div className="field">
           <label className="label">Email</label>
           <input type="email" name='email' className={`form-control ${this.state.errors.email ? "is-danger" : ""}`} 
              required minLength='3' value={this.state.fields.email} 
              onInvalid={this.handleInvalid} onChange={this.handleChange} /> 

            <div className="errorMsg">{this.state.errors.email}</div>              
        </div>    

        <div className="field">
        <input type="submit" className="btn btn-sm btn-outline-success" value="Save" />&nbsp;&nbsp;&nbsp;
            <Link to='/' className="btn btn-sm btn-outline-info">Back</Link>               
        </div>  

      </form>
      </>
    );
  }
}

export default withRouter(UserForm);