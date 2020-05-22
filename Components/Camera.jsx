import React, { useState, useEffect, useRef, useCallback  } from 'react';
import { Button, Icon, Grid } from 'semantic-ui-react';

// util
function useUserMedia(requestedMedia) {
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);

        setMediaStream(stream);
      } catch (err) {
        // handle
      }
    }

    if (!mediaStream) {
      enableStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      }
    }
  }, [mediaStream, requestedMedia]);
  return mediaStream;
}

function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {

      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      const eventListener = event => savedHandler.current(event);

      element.addEventListener(eventName, eventListener);

      return function cleanup() {
        element.removeEventListener(eventName, eventListener);
      }

    }, 
    [eventName, element] // only rerun if eventName or element changes
  );
};

// -----------------------------------------------------------------

// component

const Camera = () => {

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


      //if (blob && recordedRef.current && !recordedRef.current.srcObject) { }


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
          });
      }

      
    }
  }, [])

  const stopRecording = useCallback(e => {
    if (e.target.id === 'stop') {
      console.log(e.target.id + ' was clicked')

      
    }
  }, [])

  // <video ref={recordedRef} onCanPlay={handleCanPlayRec} autoPlay playsInline muted />

  useEventListener('click', startRecording);
  useEventListener('click', stopRecording);

  return (
    <Grid >
      <Grid.Row>
      <video ref={previewRef} onCanPlay={handleCanPlay} autoPlay playsInline muted />
      <video ref={recordedRef} controls/>
      </Grid.Row>
      <Grid.Row>
        <Button id='start' icon labelPosition='left'>
        <Icon name='play' />
        Start
        </Button>
        <Button id='stop' icon labelPosition='right'>
        <Icon name='stop' />
        Stop
      </Button>
      </Grid.Row>
    </Grid>

  )
}

export default Camera;