
import { EventBus } from '@/services/eventBus.js';
var mqtt = require('mqtt');

const Storage = window.sessionStorage;

const brokerUrl =`${process.env.VUE_APP_MQTT_URL}`;
const socket = {};
const payload = 'notsaved';

// connexion mqtt
socket.initSocket =  (baseOptions) => {
  try {
    socket.client =  mqtt.connect(brokerUrl, baseOptions);
    socket.client.on('connect', async state => {
        socket.client.subscribe(baseOptions.clientId+"-in/1/#", () => {
          console.log('subscribe')
        })
        //creation d'un sensor
        // socket.client.publish(baseOptions.clientId+"-in/0/3346/0/2/5700", payload); 

        // suppression d'un sensor
        // socket.client.publish(baseOptions.clientId+"-out/3/3332/0/2/5601", payload) ; 

    });
    socket.client.on('message', (topic, message) => {
      //découpage du topic reçu afin de pouvoir utiliser ses propriétés indépendamment les unes des autres
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
  
  try {
  
    socket.client.publish(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.latitude);          
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
// mise à jour de la latitude du drone lorsqu'elle est modifiée sur le dashboard par l'utilisateur
socket.updateLong =  (baseOptions, prop ) => {
  
  console.log(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.longitude);
  
  try {
      
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
// mise à jour de l'altitude du drone lorsqu'elle est modifiée sur le dashboard par l'utilisateur
socket.updateAlt =  (baseOptions, prop ) => {
  
  console.log(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.altitude);
  
  try {
  
    socket.client.publish(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.altitude);    
    return socket;
  } 
  catch (error) {
    // logger.publish(3, 'socket', 'initSocket:err', error);
    throw error; 
  }
};
// mise à jour de la vitesse du drone lorsqu'elle est modifiée sur le dashboard par l'utilisateur
socket.updateRate =  (baseOptions, prop ) => {
  
  console.log(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.rate);
  
  try {
  
    socket.client.publish(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.rate);    
    return socket;
  } 
  catch (error) {
    // logger.publish(3, 'socket', 'initSocket:err', error);
    throw error; 
  }
};
// switch off par l'utilisateur
socket.switchOff =  (baseOptions, prop ) => {
  
  console.log(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.off);
  
  try {
  
    socket.client.publish(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.altitude);    
    return socket;
  } 
  catch (error) {
    // logger.publish(3, 'socket', 'initSocket:err', error);
    throw error; 
  }
};
// switch on par l'utilisateur
socket.switchOn =  (baseOptions, prop ) => {
  
  console.log(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.on);
  
  try {
  
    socket.client.publish(baseOptions.clientId+"-out/1/"+ prop.ref +"/0/2/"+ prop.ressourceID, prop.on);    
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
    // switch on off
    // setTimeout( function() {
    //   socket.client.publish(baseOptions.clientId+"-in/1/3342/0/2/5500", "0")   
    // }, 20000);


    // changement valeur gps du drone (latitude et longitude)
    var latitudeVal = [46.1620507, 46.3273551, 46.4586522, 46.6659226, 46.8652961, 47.0358176, 47.2382007, 47.2769351, 47.3357412, 47.6576571, 48.1159102, 48.0577756 ];
    var longitudeVal = [-1.2112805, -0.5313457, -0.8237369, -1.4862217, -0.6134186, -0.9449882, -1.6300958, -2.3091717, -2.4747717, -2.7834929, -1.7234739, -0.8041199];
    var i = 0;
 
    setInterval( function() {
      socket.client.publish(baseOptions.clientId+"-in/1/3336/0/2/5514", latitudeVal[i].toString());
      socket.client.publish(baseOptions.clientId+"-in/1/3336/0/2/5515",  longitudeVal[i].toString());
      i++;
    }, 10000);

    // changement valeur de l'altitude du drone
    var altitudeVal = [3, 7, 11, 20, 30, 50, 70, 90, 100, 110, 120, 130, 150, 180, 210, 230, 250, 280, 290, 310];
    setInterval( function() {
      socket.client.publish(baseOptions.clientId+"-in/1/3321/0/2/5601",  altitudeVal[i].toString());
      i++;
      
    },8000);

    // changement valeur de la vitesse du drone
    var rateVal = [3, 7, 11, 20, 30, 50, 40, 22, 45, 12, 60, 3, 7, 11, 20, 30, 50, 40, 22, 45, 12, 60];
    setInterval( function() {
      socket.client.publish(baseOptions.clientId+"-in/1/3346/0/2/5700",  rateVal[i].toString());
      i++;
      
    },9000);

  } 
  catch (error) {
    throw error; 
  }
}
export default socket;
