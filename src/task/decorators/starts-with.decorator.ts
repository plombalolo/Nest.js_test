import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

export function StartsWith(prefix: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyKey: string) {
    registerDecorator({
      name: 'startsWith',
      target: object.constructor,
      propertyName: propertyKey,
      options: validationOptions,
      constraints: [prefix],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && value.startsWith(args.constraints[0]);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must start with "${args.constraints[0]}"`;
        },
      },
    });
  };
}