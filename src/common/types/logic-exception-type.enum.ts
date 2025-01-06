export enum LogicExceptionType {
  AUTH_INVALID_TOKEN = 'auth_invalid_token',
  AUTH_MISSING_TOKEN = 'auth_missing_token',

  USER_NOT_FOUND = 'user_not_found',
  USER_ALREADY_EXISTS = 'user_already_exists',

  SESSION_NOT_FOUND = 'session_not_found',
  USER_ALREADY_HAS_ACTIVE_SESSION = 'user_already_has_active_session',
}
