/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type, applyDecorators } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { TransformConditional } from './transform-conditional.decorator';

export const ApiResponseWrapper = <T extends Type<any>>(
  model: T,
  message: string = 'Success',
  code: number = 200,
) => {
  return applyDecorators(
    TransformConditional(model),
    ApiResponse({
      status: code,
      schema: {
        allOf: [
          {
            properties: {
              code: {
                type: 'number',
                example: code,
              },
              message: {
                type: 'string',
                example: message,
              },
              data: {
                $ref: getSchemaPath(model),
              },
            },
          },
        ],
      },
    }),
  );
};
