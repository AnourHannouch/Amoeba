import React, { useState, useEffect, useRef, useCallback  } from 'react';
import { Button, Icon, Grid } from 'semantic-ui-react';

import { useUserMedia, useEventListener} from '../util/general';
/*TODO
* Component needs to be updated to use useEffect for mounting/dismounting 
* preview / recorded. 
*/

// component
const Camera = () => {
  // state to check if clip has been recorded
  const [isRecorded, setIsRecorded] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);

  // video constraints
  const CAPTURE_OPTIONS = {
    audio: false,
    video: {
      width : { ideal: 300 },
      height: { ideal: 300 }
    }
  }

  const previewRef = useRef(); // reference to preview Video
  const recordedRef = useRef(); // reference to recorded video
  const mediaStream = useUserMedia(CAPTURE_OPTIONS); // start media stream with constraints

  // if the capture is started, the videoRef exists and it does not have a source, add source from stream
  if (mediaStream && previewRef.current && !previewRef.current.srcObject) {
    previewRef.current.srcObject = mediaStream;
  }

  // when stream is ready to play, play
  function handleCanPlay() {
    previewRef.current.play();
  }
  
  // when eventListener is triggered by a click and the target is start button, start recording
  const startRecording = useCallback(e => {
    console.log(e.target.id + ' was clicked');
      
      try {
        recordStream(previewRef, 6000);
      } catch (err) {
        console.log(err);
      }
      
      function wait (delayInMs) {
        return new Promise(resolve => setTimeout(resolve, delayInMs));
      }

      function recordStream(source, lengthInMs) {
        const stream = source.current.captureStream();
        const mediaRecorder = new MediaRecorder(stream);
        let data = [];
    
        mediaRecorder.ondataavailable = e => data.push(e.data);
        try {
          mediaRecorder.start();
        } catch (err) {
          console.log(err)
        }
        
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
          const url = URL.createObjectURL(blob);
          recordedRef.current.src = url;
          setFileUrl(url);
          setTimeout(setIsRecorded(true), 20);
          });
      }
  }, [])

  const downloadBlob = () => {
    const url = fileUrl;
    let a = document.createElement('a');
    a.href = url;
    a.download = url + '.mp4';
    a.click();
  }


  useEventListener('click', clickEventHandler);

  function clickEventHandler(e) {
    switch (e.target.id) {
      case 'start':
        if (isRecorded) {
          setIsRecorded(false);
          previewRef.current.srcObject = mediaStream;
          setTimeout(20);
        } 
        startRecording(e);
        break;
      
      default:
        return;
    }
    
  }

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
        <Button id='download' icon labelPosition='right' onClick={downloadBlob}>
          <Icon name='download' />
          Download
        </Button>
      </Grid.Row>
    </Grid>

  )
}

export default Camera;