import React from 'react';
import socketio from 'socket.io-client/dist/socket.io';

export const socket = socketio.connect(
  'https://smart-access-api.herokuapp.com'
);
export const SocketContext = React.createContext();
