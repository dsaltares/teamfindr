const withTimeout = <T>(promise: Promise<T>, timeMs: number): Promise<T> => {
  let timer: NodeJS.Timeout;

  return Promise.race([
    promise,
    new Promise(
      (_resolve, reject) =>
        (timer = setTimeout(() => {
          reject(new Error('operation timed out'));
        }, timeMs))
    ),
  ]).finally(() => clearTimeout(timer)) as Promise<T>;
};

export default withTimeout;
