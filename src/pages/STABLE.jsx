import React, { useState, useRef, useEffect } from "react";
import { useSocket } from "../Providers/socketContext"; // Update the path accordingly


const AudioTesting = () => {
  const socket = useSocket();
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [error, setError] = useState(null);
  const audioChunks = useRef([]);

  useEffect(() => {
    console.log(audioChunks);
  }, [audioChunks]);

  useEffect(() => {
    if (mediaRecorder && socket) {
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
        socket.emit("AUDIO_STREAM", event.data);
        console.log("Audio Chunk: ", event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        socket.emit("AUDIO_STREAM", "END");
        setAudioURL(audioUrl);
        audioChunks.current = [];
      };
    }
  }, [mediaRecorder, socket]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { type: "audio/wav" });
      setMediaRecorder(recorder);
      recorder.start();
      setRecording(true);
    } catch (err) {
      setError(
        "No microphone found. Please connect a microphone and try again."
      );
      console.error("Error accessing microphone: ", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      <h1>Audio Testing</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!recording ? (
        <button onClick={startRecording}>Record</button>
      ) : (
        <button onClick={stopRecording}>Stop</button>
      )}
      {audioURL && <audio controls src={audioURL}></audio>}
    </div>
  );
};

export default AudioTesting;
