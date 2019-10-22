
import { EventBus } from '@/services/eventBus.js';
var mqtt = require('mqtt')
// import mqtt from 'async-mqtt';
// import logger from './logger';
// import PubSub from './PubSub';

const Storage = window.sessionStorage;

const brokerUrl =`${process.env.VUE_APP_MQTT_URL}`;
const socket = {};
const payload = 'notsaved';

// connexion mqtt
socket.initSocket =  (baseOptions) => {
  // console.log(baseOptions)
  try {
    //PROJET MQTT
    socket.client =  mqtt.connect(brokerUrl, baseOptions);
    socket.client.on('connect', async state => {
        // console.log(socket)
        
        socket.client.subscribe(baseOptions.clientId+"-in/1/#", () => {
          console.log('subscribe')
        })
        // socket.client.publish(baseOptions.clientId+"-in/0/3342/0/2/5500", payload)  
        // suppression d'un sensor
        // socket.client.publish(baseOptions.clientId+"-out/3/3332/0/2/5601", payload)  
        console.log(baseOptions.clientId+"-out/3/3332/0/2/5601", payload);

    });
    socket.client.on('message', (topic, message) => {
      // console.log("dofdopfidospfi", topic);
      // return topic.split('/');
      var topicSplit = topic.split('/');
      EventBus.$emit('new-received-message', {topicSplit, message});
    });
    // return socket;
  } 
  catch (error) {
    // logger.publish(3, 'socket', 'initSocket:err', error);
    throw error; 
  }
};

// mise à jour des données du drone lorsqu'elles sont changées sur le dashboard par l'utilisateur
socket.updateSocket =  (baseOptions, prop ) => {
  
  console.log(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.latitude);
  console.log(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.longitude);
  
  try {
  
    // socket.client.publish(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.latitude);    
    socket.client.publish(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.longitude);      
    // socket.client.on('message', (topic, message) => {
    //   console.log(message)
    // });
    return socket;
  } 
  catch (error) {
    // logger.publish(3, 'socket', 'initSocket:err', error);
    throw error; 
  }
};

// envoi de fausses données concernant le drone par interval de temps
socket.sendFakeData =  (baseOptions) => {
  try {
    setInterval( function() {
      socket.client.publish(baseOptions.clientId+"-in/1/3342/0/2/5500", "0")   
    }, 5000);

    var latitudeVal = [47.2382007, 48.1158943, 47.9818762, 47.8733947, 48.8588377];
    var longitudeVal = [-1.6300958,-1.7584943, 0.1256527, 1.8421687, 2.2770201];
    var i = 0;
 
      setInterval( function() {
        console.log(baseOptions.clientId+"-in/1/3336/0/2/5514", latitudeVal[i]);
        console.log(baseOptions.clientId+"-in/1/3336/0/2/5514", longitudeVal[i]);
          
        socket.client.publish(baseOptions.clientId+"-in/1/3336/0/2/5514", latitudeVal[i].toString());
        socket.client.publish(baseOptions.clientId+"-in/1/3336/0/2/5515",  longitudeVal[i].toString());
        i++;
      }, 10000);
   

  } 
  catch (error) {
    throw error; 
  }
}
export default socket;
