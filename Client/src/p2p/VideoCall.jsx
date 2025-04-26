import React, { useEffect, useRef, useState } from "react";
import socket from "./socket";
import { createPeer, addPeer } from "./webrtc";

export default function VideoCall() {
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomID = "some-room-id"; // can be dynamic based on session

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      userVideo.current.srcObject = stream;
      
      socket.emit("join room", roomID);
      
      socket.on("all users", users => {
        const peers = [];
        users.forEach(userID => {
          const peer = createPeer(userID, socket.id, stream);
          peersRef.current.push({ peerID: userID, peer });
          peers.push(peer);
        });
        setPeers(peers);
      });

      socket.on("user joined", payload => {
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.current.push({ peerID: payload.callerID, peer });

        setPeers(users => [...users, peer]);
      });

      socket.on("receiving returned signal", payload => {
        const item = peersRef.current.find(p => p.peerID === payload.id);
        item.peer.signal(payload.signal);
      });
    });
  }, []);

  return (
    <div>
      <video muted ref={userVideo} autoPlay playsInline className="h-60 w-80" />
      {peers.map((peer, index) => {
        return <Video key={index} peer={peer} />;
      })}
    </div>
  );
}

function Video({ peer }) {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", stream => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <video ref={ref} autoPlay playsInline className="h-60 w-80" />
  );
}
