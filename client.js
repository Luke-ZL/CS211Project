//Multicast Client receiving sent messages
let PORT = 8123;
let MCAST_ADDR = "225.0.0.250"; //same mcast address as Server
let dgram = require('dgram');
let client = dgram.createSocket({ type: 'udp4', reuseAddr: true })

client.on('listening', function () {
    let address = client.address();
    console.log('UDP Client listening on ' + address.address + ":" + address.port);
    client.setBroadcast(true)
    client.setMulticastTTL(128); 
    client.addMembership(MCAST_ADDR);
});

client.on('message', function (message, remote) {   
    console.log('MCast Msg: From: ' + remote.address + ':' + remote.port +' - ' + message);
});

client.bind(PORT, "225.0.0.250");