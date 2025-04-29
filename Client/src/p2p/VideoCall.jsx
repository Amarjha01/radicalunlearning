

import React from 'react'
import API from '../common/apis/ServerBaseURL';
import axios from 'axios'

const VideoCall = () => {

  const startMeeting = async () => {
    const response = await axios.post(API.createZoomMeeting.url, {
      topic: "1-1 Coaching Call",
    });
  
    const { join_url } = response.data.meeting;
    window.open(join_url, '_blank');
  };
  
  return (
    <div>
<button onClick={startMeeting}>join now</button>
    </div>
  )
}

export default VideoCall