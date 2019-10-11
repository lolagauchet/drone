var mqtt = require('mqtt')
// import mqtt from 'async-mqtt';
// import logger from './logger';
// import PubSub from './PubSub';

const Storage = window.sessionStorage;

const brokerUrl =`${process.env.VUE_APP_MQTT_URL}`;
const socket = {};
const payload = 'notsaved';

// projet
socket.initSocket = async (baseOptions) => {
  // console.log(baseOptions)
  try {
    //PROJET MQTT
    socket.client = await mqtt.connect(brokerUrl, baseOptions);
    socket.client.on('connect', async state => {
        // console.log(socket)
        // socket.client.subscribe(baseOptions.clientId+"-in/#", () => {
        //   console.log('subscribe')
        // })
        socket.client.publish(baseOptions.clientId+"-out/3/3339/0/2/5522", payload)       
    });
    socket.client.on('message', (topic, message) => {
      console.log(message)
    });
    return socket;
  } 
  catch (error) {
    // logger.publish(3, 'socket', 'initSocket:err', error);
    throw error; 
  }
};
socket.updateSocket = async (baseOptions, prop ) => {
  console.log(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.latitude);
  
  try {
  
    socket.client.publish(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.latitude)       
    socket.client.publish(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.longitude)       
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

export default socket;
