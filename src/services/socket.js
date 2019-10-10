var mqtt = require('mqtt')
// import mqtt from 'async-mqtt';
// import logger from './logger';
// import PubSub from './PubSub';

const Storage = window.sessionStorage;

const brokerUrl = "wss://aloes.io/ws";
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
        // socket.client.publish(baseOptions.clientId+"-out/0/3346/0/2/5700", payload)       
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

export default socket;
