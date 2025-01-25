import { BAD_REQUEST_SCHEMA, NOT_FOUND_SCHEMA, UNAUTHORIZED_SCHEMA } from '@common/exceptions/errors.schema';
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export type DisplayErrorsResponseVariables = 'NotFound' | 'BadRequest' | 'Unauthorized';
export type DisplaySuccessResponseVariables = 'OK' | 'Created';

export function SwaggerRouteComposeDecorator({
  enabledErrorsDisplayResponseVariables,
  response,
}: {
  enabledErrorsDisplayResponseVariables: DisplayErrorsResponseVariables[];
  response: {
    type: Type<unknown>;
    variable: DisplaySuccessResponseVariables;
  };
}): <TFunction extends (...args: never) => unknown, Y>(
  target: TFunction | object,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void {
  const errorResponseDecorators = enabledErrorsDisplayResponseVariables.map((variable) => {
    switch (variable) {
      case 'NotFound': {
        return ApiNotFoundResponse({ schema: NOT_FOUND_SCHEMA });
      }
      case 'BadRequest': {
        return ApiBadRequestResponse({ schema: BAD_REQUEST_SCHEMA });
      }
      case 'Unauthorized': {
        return ApiUnauthorizedResponse({ schema: UNAUTHORIZED_SCHEMA });
      }
    }
  });

  let responseDecorator: MethodDecorator;

  switch (response.variable) {
    case 'Created':
      responseDecorator = ApiCreatedResponse({
        type: response.type,
      });
      break;
    case 'OK':
      responseDecorator = ApiOkResponse({
        type: response.type,
      });
      break;
    default:
      responseDecorator = ApiOkResponse({
        type: response.type,
      });
  }

  return applyDecorators(...errorResponseDecorators, responseDecorator);
}
