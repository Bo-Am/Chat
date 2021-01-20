module.exports = (app) => {
  // Обработка ошибок при 404 запросе
  app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  });
  
// Обработка ошибок при 500 запросе
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });

  return app;
};
