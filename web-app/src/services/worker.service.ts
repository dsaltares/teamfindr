interface WorkerMessage {
  type: string;
  payload: any;
}

const sendMessageToWorker = async (message: WorkerMessage) => {
  await navigator.serviceWorker.ready;
  navigator.serviceWorker.controller?.postMessage(message);
};

const workerService = {
  subscribeToPush: (pushPublicKey: string) => {
    sendMessageToWorker({
      type: 'SUBSCRIBE_TO_PUSH',
      payload: {
        pushPublicKey,
      },
    });
  },
};

export default workerService;
