interface WorkerMessage {
  type: string;
  payload: any;
}

const sendMessageToWorker = (message: WorkerMessage) => {
  navigator.serviceWorker.ready.then((registration) => {
    navigator.serviceWorker.controller?.postMessage(message);
  });
};

export default sendMessageToWorker;
