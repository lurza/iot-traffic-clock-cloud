export function sendError(res, status, error) {
  res.status(status).json({ error: error.message, data: null });
}

export function sendData(res, object) {
  res.json({ error: null, data: object });
}
