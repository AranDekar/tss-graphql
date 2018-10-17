import request from 'request-promise';
/* eslint-disable import/prefer-default-export */

/**
 * returns a list of strategies posted by a user, using the practice service
 * @param postedBy user to fetch strategies for
 */
export const getStrategiesByUser = (postedBy) => {
  const options = {
    method: 'GET',
    uri: `${process.env.HTTP_STRATEGY}/api/v1/strategies?postedBy=${postedBy}`,
    qs: {},
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.API_KEY}:${process.env.API_SECRET}`).toString('base64')}`,
      'api-key': '1234',
    },
    json: true, // Automatically parses the JSON string in the response
  };
  return request(options)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));
};

/**
 * returns a list of strategies posted by a user, using the practice service
 * @param postedBy user to fetch strategies for
 */
export const getEvents = () => {
  const options = {
    method: 'GET',
    uri: `${process.env.HTTP_STRATEGY}/api/v1/events`,
    qs: {},
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.API_KEY}:${process.env.API_SECRET}`).toString('base64')}`,
      'api-key': '1234',
    },
    json: true, // Automatically parses the JSON string in the response
  };
  return request(options)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));
};
/**
 * returns a list of reports by a strategyId, using the practice service
 * @param strategyId strategyId for the reports
 */
export const getReportByStrategyId = (strategyId) => {
  const options = {
    method: 'GET',
    uri: `${process.env.HTTP_STRATEGY}/api/v1/strategies/${strategyId}/yearly_report`,
    qs: {},
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.API_KEY}:${process.env.API_SECRET}`).toString('base64')}`,
      'api-key': '1234',
    },
    json: true, // Automatically parses the JSON string in the response
  };
  return request(options)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));
};

/**
 * returns a list of reports by a strategyId and instrument, using the practice service
 * @param strategyId strategyId for the reports
 * @param instrument instrument for the reports
 */
export const getReportByStrategyIdInstrument = (strategyId, instrument) => {
  const options = {
    method: 'GET',
    uri: `${process.env.HTTP_STRATEGY}/api/v1/strategies/${instrument}/${strategyId}/monthly_report`,
    qs: {},
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.API_KEY}:${process.env.API_SECRET}`).toString('base64')}`,
      'api-key': '1234',
    },
    json: true, // Automatically parses the JSON string in the response
  };
  return request(options)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));
};

/**
 * returns a strategies by a strategyId, using the practice service
 * @param strategyId strategyId for the reports
 */
export const getStrategy = (strategyId) => {
  const options = {
    method: 'GET',
    uri: `${process.env.HTTP_STRATEGY}/api/v1/strategies/${strategyId}`,
    qs: {},
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.API_KEY}:${process.env.API_SECRET}`).toString('base64')}`,
      'api-key': '1234',
    },
    json: true, // Automatically parses the JSON string in the response
  };
  return request(options)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));
};

/**
 * runs a backtest for a startegy by a startegyId, using the practice service
 * @param startegyId startegyId for the reports
 */
export const backtest = (startegyId) => {
  const options = {
    method: 'POST',
    uri: `${process.env.HTTP_STRATEGY}/api/v1/strategies/${startegyId}/backtest`,
    qs: {},
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.API_KEY}:${process.env.API_SECRET}`).toString('base64')}`,
      'api-key': '1234',
      'Content-Type': 'application/json',
    },
    json: true, // Automatically parses the JSON string in the response
  };
  return request(options)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));
};

/**
 * deletes a startegy by a startegyId, using the practice service
 * @param startegyId startegyId for the reports
 */
export const deleteStrategy = (startegyId) => {
  const options = {
    method: 'DELETE',
    uri: `${process.env.HTTP_STRATEGY}/api/v1/strategies/${startegyId}`,
    qs: {},
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.API_KEY}:${process.env.API_SECRET}`).toString('base64')}`,
      'api-key': '1234',
      'Content-Type': 'application/json',
    },
    json: true, // Automatically parses the JSON string in the response
  };
  return request(options)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));
};


/**
 * creates a new strategy
 * @param name strategy name
 * @param postedBy owner of the strategy
 * @param code the code to run for strategy
 * @param events events the strategy listens to
 */
export const postStrategy = ({ name, postedBy, code, description, events }) => {
  const options = {
    method: 'POST',
    uri: `${process.env.HTTP_STRATEGY}/api/v1/strategies`,
    qs: {},
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.API_KEY}:${process.env.API_SECRET}`).toString('base64')}`,
      'api-key': '1234',
      'Content-Type': 'application/json',
    },
    body: { name, postedBy, code, events, description },
    json: true, // Automatically parses the JSON string in the response
  };
  return request(options)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));
};

/* eslint-enable import/prefer-default-export */
