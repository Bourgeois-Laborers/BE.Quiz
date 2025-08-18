import { ApiResponse } from '@/common/interfaces/api-response.interface';

export class ApiResponseUtil {
  static success<T>(
    data: T,
    message: string = 'Success',
    code: number = 200,
  ): ApiResponse<T> {
    return {
      code,
      message,
      data,
    };
  }

  static error<T = null>(
    message: string = 'Error',
    code: number = 400,
    data: T = null as T,
  ): ApiResponse<T> {
    return {
      code,
      message,
      data,
    };
  }

  static created<T>(data: T, message: string = 'Created'): ApiResponse<T> {
    return this.success(data, message, 201);
  }

  static noContent(message: string = 'No Content'): ApiResponse<null> {
    return this.success(null, message, 204);
  }
}
