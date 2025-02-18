const helloController = (req, res) => {
  res.send("Hello World!");
};

const datasetController = (req, res) => {
  res.send("dataset controller");
};

module.exports = { helloController, datasetController };
