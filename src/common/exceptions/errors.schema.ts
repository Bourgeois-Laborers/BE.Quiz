export const BAD_REQUEST_SCHEMA = {
  type: 'object',
  properties: {
    statusCode: {
      type: 'integer',
      default: 400,
    },
    stringCode: {
      type: 'string',
    },
    message: {
      type: 'string',
    },
    timestamp: {
      type: 'string',
    },
    path: {
      type: 'string',
    },
  },
};

export const NOT_FOUND_SCHEMA = {
  type: 'object',
  properties: {
    statusCode: {
      type: 'integer',
      default: 404,
    },
    stringCode: {
      type: 'string',
    },
    message: {
      type: 'string',
    },
    timestamp: {
      type: 'string',
    },
    path: {
      type: 'string',
    },
  },
};

export const UNAUTHORIZED_SCHEMA = {
  type: 'object',
  properties: {
    statusCode: {
      type: 'integer',
      default: 401,
    },
    stringCode: {
      type: 'string',
    },
    message: {
      type: 'string',
    },
    timestamp: {
      type: 'string',
    },
    path: {
      type: 'string',
    },
  },
};
