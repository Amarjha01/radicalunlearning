import Peer from "simple-peer";

export const createPeer = (userToSignal, callerID, stream) => {
  return new Peer({
    initiator: true/false,
    trickle: false,
    stream,
    config: {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    },
  });
  
};

export const addPeer = (incomingSignal, callerID, stream) => {
  const peer = new Peer({
    initiator: false,
    trickle: false,
    stream,
  });

  peer.signal(incomingSignal);

  return peer;
};
