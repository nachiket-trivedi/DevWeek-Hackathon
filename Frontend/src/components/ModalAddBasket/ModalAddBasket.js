import React, { useState, Component } from 'react';
import { Collapse, CardBody, Card , Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import './ModalAddBasket.css'
import {render} from 'react-dom';

const ModalAddBasket = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [people, setPeople] = useState('');
  const [category, setCategory] = useState('');
  const [comments, setComments] = useState('');


  const itemHandler = (e) => {
    setItem(e.target.value);
  }

  const myFunction = ()=> {
    var x = document.getElementById("modal");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  const priceHandler = (e) => {
    setPrice(e.target.value);
  }
  const commentsHandler = (e) => {
    setComments(e.target.value);
  }
  const peopleHandler = (e) => {
    if(e.target.value=="No Preference")
      setPeople("");
    else
      setPeople(e.target.value);
  }
  const categoryHandler = (e) => {
    if(e.target.value=="No Preference")
    setCategory("");
    else
      setCategory(e.target.value);
  }

  const addAppHandler=(e)=>{
    console.log('item :', item)
    console.log('price :', price)
    console.log('people:', people)
    console.log('category:', category)
    console.log('comments:', comments)

    
    let basketId=+localStorage.getItem('idGenerator')+1;
    localStorage.setItem('idGenerator',basketId);
    let data={"basketId":basketId,"item":item,"price":price,"people":people, "category":category, "comments":comments}
    let arr=[];
    arr.push(data)
    if(!localStorage.getItem('cardData'))
    {
      localStorage.setItem('cardData',JSON.stringify(arr))
    }
    else
    {
      let brr=[];
      brr=JSON.parse(localStorage.getItem('cardData'));
      console.log('brr--',brr);

      brr.push(data)
      localStorage.setItem('cardData',JSON.stringify(brr))
    }
    console.log('--',(localStorage.getItem('cardData')));
    window.location.reload()
  }
  const toggle = () => setModal(!modal);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse= () => setIsOpen(!isOpen);

   

  return (
    <div class="">
      <Button color="info" className="button" onClick={myFunction} >Add Basket</Button>
     <div id="modal" style={{"display":'none'}}>
        <Form>
      <FormGroup row>
        <Label sm={2} for="exampleEmail" > Items</Label>
        <Col sm={4}>    
        <Input  type="text" name="select" onChange={itemHandler} id="exampleSelect" placeholder="Enter all the items in the basket">
        </Input>  
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleEmail2" sm={2}> Price</Label>
        <Col sm={4}>
        <Input  type="text" name="select" onChange={priceHandler} id="exampleSelect" placeholder="Enter the basket price">
        </Input>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleEmail2" sm={2}> Can Serve</Label>
        <Col sm={4}>
        <Input  type="text" name="select" onChange={peopleHandler} id="exampleSelect" placeholder="How many people can this serve?">
        </Input>
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="exampleEmail2" sm={2}> Category</Label>
        <Col sm={4}>
        <Input type="select" onChange={categoryHandler}  name="select" id="exampleSelect">
          <option>-Select a Category-</option>
          <option>Veg</option>
          <option>Non-Veg</option>
          <option>Vegan</option>
        </Input>
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="exampleEmail2" sm={2}> Additional Comments</Label>
        <Col sm={4}>
        <Input  type="text" name="select" onChange={commentsHandler} id="exampleSelect" placeholder="Enter the additional comments like allergic ingredients etc.">
        </Input>
        </Col>
        <br/>
      <Button color="primary" onClick={addAppHandler}>Add</Button>{' '}
      </FormGroup>

      </Form>
    </div>
            {/* <a color="success" href="" onClick={toggle}><img className="addImg" src="https://www.drupal.org/files/project-images/drupal-addtoany-logo.png"></img></a> */}

    </div>
  );
}

export default ModalAddBasket;