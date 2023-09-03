import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

import { nameModelsPrismaType } from 'src/@types/prismaTypes';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
@ValidatorConstraint()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const [model, field] = validationArguments.constraints as [string, string];

    const exists = await this.prismaService[model].count({
      where: {
        [field]: value,
      },
    });

    return exists ? false : true;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    //eslint-disable-next-line
    const [model, field] = validationArguments.constraints as [string, string];

    return `${field} já cadastrado`;
  }
}

export function IsUnique(
  model: nameModelsPrismaType,
  field: string,
  validationOptions?: ValidationOptions,
) {
  //eslint-disable-next-line
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'IsUnique',
      async: true,
      target: object.constructor,
      propertyName: propertyName,
      constraints: [model, field],
      options: validationOptions,
      validator: IsUniqueConstraint,
    });
  };
}
