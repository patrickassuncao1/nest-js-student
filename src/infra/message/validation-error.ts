import { BadRequestException, ValidationError } from '@nestjs/common';

export const defaultErrorValidatorMessage = (errors: ValidationError[]) => {
  const firstError = errors[0];
  
  const result = {
    property: firstError.property,
    message: firstError.constraints[Object.keys(firstError.constraints)[0]],
    statusCode: 400,
    error: "Bad Request"
  };

  return new BadRequestException(result);
};
