import Peer from "simple-peer";

export const createPeer = (userToSignal, callerID, stream) => {
  return new Peer({
    initiator: true,
    trickle: false,
    stream,
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
