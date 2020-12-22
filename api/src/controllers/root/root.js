const rootController = () => () => ({
  status: 200,
  body: { message: 'yolo' },
});

module.exports = rootController;
