import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardFooter,CardHeader
} from 'reactstrap';
import ModalAddBasket from '../ModalAddBasket/ModalAddBasket';
import './BasketCards.css'


const BasketCards = (props) => {
    const remove=(e)=>{
        let data=JSON.parse(localStorage.getItem('cardData'));
        let newArr=[]
        console.log('e',e)
        for(let item of data)
        {
            console.log('item',item)
            if(JSON.stringify(item['basketId'])!=JSON.stringify(e))
                newArr.push(item);
        }
        localStorage.setItem('cardData',JSON.stringify(newArr))
        console.log('newArr',newArr)
        window.location.reload();
    }
let appArr=JSON.parse(localStorage.getItem('cardData'))
let cards=null
if(appArr!=null)
{
 cards=appArr.map(item=>{
    return (
      <Card>
        <CardBody>
          <CardText>Items: {item['item']}</CardText>
          <CardText>The Price: ${item['price']}</CardText>
          <CardText>People it can serve: {item['people']}</CardText>
          <CardText>Basket Category: {item['category']}</CardText>
          <CardText>Additional Comments: {item['comments']}</CardText>

        </CardBody>
    <Button clasName="delBtn" color="danger" onClick={()=>remove(item['basketId'])}>Remove</Button>
      </Card>
      );
})
}

  return (
    <div className="cards">{cards}</div>
  );
};

export default BasketCards;