const responseTemplate = (response,{ status = "success", statusCode = 200, message, data = null }) => {
  return response.status(statusCode).json({
    status,
    statusCode,
    message,
    data,
  });
};

export default responseTemplate;