import apiKey from '../config.js';
import * as ttMaps from '@tomtom-international/web-sdk-maps';
import * as ttServices from '@tomtom-international/web-sdk-services';
import './DisplayMap.css';
import Navbar from "../Navbar/Navbar";
import axios from 'axios';
import React, {Component} from 'react';

var map1, categories=[], markers=[], buttons, SanFrancisco
class DisplayMap extends Component{
    componentDidMount()
    {
        SanFrancisco = 'San Francisco, California'

         categories = {
            Italian: '7315025',
            Thai: '7315048',
            French: '7315017'
        }
        
         map1 = ttMaps.map({
            key: apiKey,
            container: 'map',
            style: 'tomtom://vector/1/basic-main'
        });
        
         markers = [];
        map1.addControl(new ttMaps.FullscreenControl());
        map1.addControl(new ttMaps.NavigationControl());
        
        map1.on('load', function() {
            ttServices.services.fuzzySearch({
                key: apiKey,
                idxSet: "Geo",
                query: SanFrancisco
            })
            .go()
            .then(response => map1.flyTo(
                {center: response.results[0].position,
                zoom: 12}
             ))
        })
        // let data={city:localStorage.getItem('city')}
        let data={city:'Cleves'}
        axios.defaults.withCredentials = false;//very imp, sets credentials so that backend can load cookies
        axios.post("", data)
        .then(response => {
            console.log('resp',response.data)
            this.createMarkersFromSearch(response)
        })
        // buttons = document.querySelectorAll('.searchBtn')
        // buttons.forEach(button => {
        //     button.addEventListener('click', (event) => {
        //         markers.forEach((marker) => {
        //             marker.remove();
        //         })
        //         markers = [];
        //         ttServices.services.fuzzySearch({
        //             key: apiKey,
        //             center: map1.getCenter(),
        //             query: 'restaurant',
        //             categorySet: categories[event.target.value]
        //         })
        //         .go()
        //         .then(response => this.createMarkersFromSearch(response)
        //         )
        //     })
        // })
    }

 moveMapToFirstResult=(response)=> {
    map1.flyTo(
       {center: response.results[0].position,
       zoom: 12}
    )
}
 createMarkersFromSearch=(response) =>{
    response.results.forEach(result => {
        var popup = new ttMaps.Popup({offset: 30}).setHTML(this.createPopupContent(result));
        markers.push(new ttMaps.Marker()
                .setLngLat(result.position)
                .setPopup(popup)
                .addTo(map1));
    })
}
// createMarkersFromSearch=(response)=>{
//     console.log(response)
//     response.results.forEach(result=>{
//         markers.push(new ttMaps.Marker()
//         .setLngLat(result.position)
//         .addTo(map1))
//     })
//     }
 createPopupContent=(result) =>{
    return '<strong>' + result.poi.name + '</strong><br>' + 
    this.ifDefined(result.address.streetNumber) + ' ' + this.ifDefined(result.address.streetName) + ' ' + result.address.municipality + '<br>' +
        ((result.poi.phone != undefined) ? 'Phone:' + result.poi.phone + '<br>' : '') +
        ((result.poi.url != undefined) ? '<a href="http://' + result.poi.url + '" target="_blank">Website</a><br>': '');
}
 ifDefined=(tmp) =>{
    return (tmp != undefined) ? tmp : '';
}
render(){
    return(
        <div className="mainDiv">
        <div className="navDiv">
          <Navbar />
        </div>
        <div className="listDiv1">
        <div id="map">
        <label class='tt-form-label'>Search restaurant
            <input class='searchBtn' type='submit' value='Italian'/>
            <input class='searchBtn' type='submit' value='Thai'/>
            <input class='searchBtn' type='submit' value='French'/>
        </label>
    </div>
        </div>
      </div>
        
    )
}
}

export default DisplayMap;