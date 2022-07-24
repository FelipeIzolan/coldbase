# I'M UPDATING THIS PROJECT...
<img src="https://user-images.githubusercontent.com/80170121/147503844-dac0ac55-0f76-47a3-a7b8-5408d37fa180.png" width="250" height="250">
<img src="https://i.imgur.com/GhjoukW.png" height="250">

# COLDBASE
Coldbase is a project developed with react and node. It allows users to create rooms or join one, where each room has a key created through a hash algorithm, each message is encrypted in the client and is only decrypted in the client of the other users in the room, in this process no message is stored on the server.
## Technologies
Front-end
- react
- react-hot-toast
- crypto-js
- socket.io-client

Back-end
- express
- socket.io
- crypto-js
- joi
### Features
- A New encrypt and decrypt secret is generated every 1 hour.
- When a user in room take a print ( via keyboard ), all users is warned.
- When leader left from room, the room is deleted.
- The Messages not is stored on server or on client.
- More...
### CORS
If you are going to build the client and serve it as a static file, don't forget to remove the CORS configuration.
