import { useState, useRef, useEffect } from "react";
import { useSocket } from "../Providers/socketContext"; // Update the path accordingly

const AudioSynth = ({
  role,
  interviewerDone,
  setIntervieweeResponse,
  setAssistantResponse,
  setCurrentRole,
  interviewId,
  section_title,
  setChunks
}) => {
  const socket = useSocket();
  const [audioURL, setAudioURL] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [error, setError] = useState(null);
  const audioChunks = useRef([]);
  const [withinAllowedTime, setWithinAllowedTime] = useState(true);
  const [recordingTime, setRecordingTime] = useState(30000); // Initial recording time 30 seconds
  const timerRef = useRef(null);

  useEffect(() => {
    if (
      socket &&
      interviewerDone &&
      role === "interviewee" &&
      withinAllowedTime
    ) {
      console.log("STARTING");
      startRecording();
      timerRef.current = setTimeout(() => {
        setWithinAllowedTime(false);
        console.log("RECORDING SHOULD STOP");
        stopRecording();
      }, recordingTime); // Use recordingTime for timeout
    }

    return () => clearTimeout(timerRef.current);
  }, [socket, role, interviewerDone, recordingTime, withinAllowedTime]);

  useEffect(() => {
    if (socket) {
      socket.on("CREATED_FILE", () => {
        setCurrentRole("interviewer");
      });

      socket.on("TRANSCRIBED_TEXT", (data) => {
        setIntervieweeResponse(data);
      });

      socket.on("ASSISTANT_RESPONSE", (data) => {
        setAssistantResponse(data);
      });

      // socket.on("AUDIO_CHUNK", (chunk) => {
      //   setChunks(chunk)
      //   console.log(chunk)
      // });
    }
  }, [socket, setIntervieweeResponse]);

  useEffect(() => {
    if (mediaRecorder && socket) {
      console.log("Setting up mediaRecorder event listeners");
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && withinAllowedTime) {
          audioChunks.current.push(event.data);
          socket.emit("AUDIO_STREAM", { content: event.data, id: interviewId });
          console.log(event.data);
        } else {
          mediaRecorder.stop();
        }
      };

      mediaRecorder.onstop = async () => {
        console.log("Recorder stopped, processing data");
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        audioChunks.current = [];
        socket.emit("AUDIO_STREAM", {
          content: "END",
          id: interviewId,
          section_title,
        });
        console.log("Audio URL set");
      };
    }
  }, [mediaRecorder, socket, withinAllowedTime]);

  const startRecording = async () => {
    console.log("RECORDING");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.start(1000); // Capture chunks of audio every second
      setWithinAllowedTime(true);
      console.log("Recording started");
    } catch (err) {
      setError(
        "No microphone found. Please connect a microphone and try again."
      );
      console.error("Error accessing microphone: ", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      console.log("Recording stopped");
      clearTimeout(timerRef.current);
    }
  };

  const extendRecordingTime = () => {
    if (recordingTime + 15000 <= 60000) {
      setRecordingTime(recordingTime + 15000);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setWithinAllowedTime(false);
        console.log("ENDING");
        stopRecording();
      }, recordingTime + 15000);
    }
  };

  const endRecordingEarly = () => {
    setWithinAllowedTime(false);
    stopRecording();
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", columnGap: "10px" }}>
      {error && <p>{error}</p>}
      <button onClick={extendRecordingTime} disabled={recordingTime >= 60000}>
        Add 15s to Recording Time
      </button>
      <button onClick={endRecordingEarly} disabled={!withinAllowedTime}>
        End Recording Early
      </button>
    </div>
  );
};

export default AudioSynth;
