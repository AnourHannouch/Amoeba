import React, { useState, useEffect, useRef, useCallback, useContext  } from 'react';
import { Button, Icon, Grid } from 'semantic-ui-react';

import { useUserMedia, useEventListener} from '../util/general';


const Camera = () => {
  //has been recorded? fileUrl to recording
  const [isRecorded, setIsRecorded] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const videoRef = useRef(); // reference to Video Feed

  useEffect(() => {
    !isRecorded
    ? videoRef = handleFeed(videoRef)
    : videoRef = handleRecording()

  }, [isRecorded]);

  function handleFeed(ref) {

      //feed constaints
      const CAPTURE_OPTIONS = {
        audio: false,
        video: {
          width : { ideal: 300 },
          height: { ideal: 300 }
        }
      }
      // start media stream with constraints
      const mediaStream = useUserMedia(CAPTURE_OPTIONS);

  }

  return (
    <>
      <Video ref={videoRef}/>
    </>
  )

}

function Video (props) {
  return (
    <>
      <video ref={props.videoRef}/>
    </>
  )
}

export default Camera;