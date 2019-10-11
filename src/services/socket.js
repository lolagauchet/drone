
import { EventBus } from '@/services/eventBus.js';
var mqtt = require('mqtt')
// import mqtt from 'async-mqtt';
// import logger from './logger';
// import PubSub from './PubSub';

const Storage = window.sessionStorage;

const brokerUrl =`${process.env.VUE_APP_MQTT_URL}`;
const socket = {};
const payload = 'notsaved';

// projet
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
        socket.client.publish(baseOptions.clientId+"-out/3/3339/0/2/5522", payload)   
        socket.client.publish(baseOptions.clientId+"-out/3/3339/0/2/5522", payload)   

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
socket.updateSocket =  (baseOptions, prop ) => {
  console.log(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.latitude);
  
  try {
  
    socket.client.publish(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.latitude)       
    // socket.client.publish(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.longitude)       
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
socket.sendFakeData =  (baseOptions) => {
  try {
    setInterval( function() {
      socket.client.publish(baseOptions.clientId+"-in/1/3342/0/2/5500", "0")   
    }, 5000);
  } 
  catch (error) {
    throw error; 
  }
}
export default socket;
