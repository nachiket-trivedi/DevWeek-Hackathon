import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Jumbotron,
    Button,
    Container,
    Collapse,
    FormGroup,
    Label,
    Form,
    Input,
    Col,Modal, ModalHeader, ModalBody, ModalFooter
  } from 'reactstrap';
  import axios from 'axios';
  import React, { useState } from 'react';
  import {Redirect} from 'react-router';

import BasketCards from '../BasketCards/BasketCards';
import ModalAddBasket from '../ModalAddBasket/ModalAddBasket';
import Navbar from "../Navbar/Navbar";

import {hostedAddress} from '../../GlobalVar'

let redirectVar=null, loginModalFlag=false,modalLogin=false, modalSignup=false,signupModalFlag=false, dashboardFlag=false, navLoader=null,goToShopFlag=false, redirectVarShop=null;
  class BusinessHome extends React.Component{
    constructor(props){
      super(props);
      this.state={email:"",password:""};
      loginModalFlag=false
      modalLogin=false
      modalSignup=false
      signupModalFlag=false
      dashboardFlag=false
      navLoader=null
      goToShopFlag=false
      redirectVarShop=null
      redirectVar=null
    }
    compute=()=>{
      let cardDetails=JSON.parse(localStorage.getItem('cardData'));
      let data={"cardDetails":cardDetails, "restName":localStorage.getItem("restName")};
      console.log('the axios call data',data);

      axios.defaults.withCredentials = false;//very imp, sets credentials so that backend can load cookies
      axios.post("", data)
      .then(response => {
        console.log('resp',response.data)
      })
      this.setState({});
    }

      render()
      {
          
          return(
            <div className="mainDiv">
            <div className="navDiv">
              <Navbar />
            </div>
            
            <div className="listDiv1" >
              <div>
                <div >
                <div className='containerCards'>
          <div className="cards"> 
          <ModalAddBasket/>
          <BasketCards/>      
          </div>
          <Button className="button" color="success" onClick={this.compute}>Publish The Baskets</Button>
<br/><br/><br/><br/><br/><br/><br/><br/></div>
                </div>
              </div>         
            </div>
          </div>
          )
      }
  }
  export default BusinessHome;

