//Multicast Server sending messages
let news = [
    "Borussia Dortmund wins German championship",
    "Tornado warning for the Bay Area",
    "More rain for the weekend",
    "Android tablets take over the world",
    "iPad2 sold out",
    "Nation's rappers down to last two samples"
 ];
 
 let PORT = 8123;
 let MCAST_ADDR = "225.0.0.250"; //not your IP and should be a Class D address, see http://www.iana.org/assignments/multicast-addresses/multicast-addresses.xhtml
 let dgram = require('dgram'); 
 let server = dgram.createSocket("udp4"); 
 server.bind(PORT, function(){
     server.setBroadcast(true);
     server.setMulticastTTL(128);
     server.addMembership(MCAST_ADDR);
 });
 
 setInterval(broadcastNew, 3000);
 
 function broadcastNew() {
     let message = new Buffer(news[Math.floor(Math.random()*news.length)]);
     server.send(message, 0, message.length, PORT,MCAST_ADDR);
     console.log("Sent " + message + " to the wire...");
 }