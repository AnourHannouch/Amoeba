import React, { useState, useEffect, useRef, useCallback  } from 'react';
import { Button, Icon, Grid } from 'semantic-ui-react';

import { useUserMedia, useEventListener} from '../util/general';
/*TODO
* 
*/

// component

const Camera = () => {

  const [isRecorded, setIsRecorded] = useState(false);
  const CAPTURE_OPTIONS = {
    audio: false,
    video: {
      width : { ideal: 300 },
      height: { ideal: 300 }
    }
  }

  const previewRef = useRef(); // reference to preview Video
  const recordedRef = useRef(); // 
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);

  if (mediaStream && previewRef.current && !previewRef.current.srcObject) {
    previewRef.current.srcObject = mediaStream;
  }

  function handleCanPlay() {
    previewRef.current.play();
  }
  
  const startRecording = useCallback(e => {
    if (e.target.id === 'start') {
      console.log(e.target.id + ' was clicked')

      recordStream(previewRef, 6000);


      function wait (delayInMs) {
        return new Promise(resolve => setTimeout(resolve, delayInMs));
      }

      function recordStream(source, lengthInMs) {
        const stream = source.current.captureStream();
        const mediaRecorder = new MediaRecorder(stream);
        let data = [];
    
        mediaRecorder.ondataavailable = e => data.push(e.data);
        mediaRecorder.start();
        console.log(mediaRecorder.state + ' for ' + (lengthInMs/1000) + ' seconds...');
    
        const stopped = new Promise ((resolve, reject) => {
          mediaRecorder.onstop = resolve;
          mediaRecorder.onerror = e => reject (e.name);
        });
    
        const recorded = wait(lengthInMs).then(
          () => mediaRecorder.state === 'recording' && mediaRecorder.stop()
        );

        return Promise.all([
          stopped,
          recorded
        ])
        .then(() => {
          const blob = new Blob(data, { 'type' : 'video/mp4'});
          console.log(blob)
          recordedRef.current.src = URL.createObjectURL(blob);
          setTimeout(setIsRecorded(true), 20);
          });
      }
    }
  }, [])


  useEventListener('click', startRecording);
  
  return (
    <Grid >
      <Grid.Row>
      <video 
        ref={previewRef}
        onCanPlay={handleCanPlay}
        autoPlay
        playsInline
        muted
        hidden={isRecorded}/>
      <video
        ref={recordedRef}
        controls
        width='300'
        height='300'
        hidden={!isRecorded}/>
      </Grid.Row>
      <Grid.Row>
        <Button id='start' icon labelPosition='left'>
        <Icon name='play' />
        Start
        </Button>
      </Grid.Row>
    </Grid>

  )
}

export default Camera;