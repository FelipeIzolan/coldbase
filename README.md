![base](https://user-images.githubusercontent.com/80170121/147503217-d3dd45b6-1c76-4bf7-9f59-fdb9706d0de8.png)
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
- More...
### CORS
If you are going to build the client and serve it as a static file, don't forget to remove the CORS configuration.