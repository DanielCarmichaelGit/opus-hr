class AudioProcessor extends AudioWorkletProcessor {
    process(inputs, outputs, parameters) {
      const input = inputs[0];
      if (input.length > 0) {
        const inputData = input[0];
        const buffer = new ArrayBuffer(inputData.length * 2);
        const view = new DataView(buffer);
  
        for (let i = 0; i < inputData.length; i++) {
          view.setInt16(i * 2, inputData[i] * 0x7fff, true);
        }
  
        this.port.postMessage(buffer);
      }
      return true;
    }
  }
  
  registerProcessor('audio-processor', AudioProcessor);
  