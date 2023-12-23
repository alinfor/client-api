const errorHandler = (error, res) => {
    console.error(error);
  
    res.status(error.status || 500).json({
      message: error.message,
    });
  };
  
  module.exports = errorHandler;
  