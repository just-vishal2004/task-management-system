function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error: {
        message: "Invalid JSON payload.",
      },
    });
  }

  return res.status(500).json({
    error: {
      message: "Something went wrong on the server.",
    },
  });
}

module.exports = errorHandler;