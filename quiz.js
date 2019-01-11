// Assuming you have already done "npm install fernet"
let Fernet = require('fernet')
let secret = new Fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')

// Oh no! The code is going over the edge! What are you going to do?
let message = 'gAAAAABcD4kMSXGwsLnVoB_sK1TM3WLafVY1KBDroHPO4oz8lH4hGLXGn3Gc8jHp71K8TmP8aNe8CiN-Q8tR3K8rwsHsc_UauzfjsyTx6HJ4NNS4W92ZFU-jij7fGPMjZ7SzvI0V4H3gahG19N7lOz8J7j3uObQGJwjVyg59gnezILTJr7pu5NwWG9Up86CDZk5AVS15WsiJ'


let token = new Fernet.Token({secret: secret, token: message, ttl:0})
console.log(token.decode())
