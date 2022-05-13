import {
  registerDecorator,
  ValidationArguments,
  ValidationError,
  ValidationOptions,
} from "class-validator";

import { AppError } from "@shared/errors/AppError";

import { validateCpf } from "./StringHelpers";

type FormattedErrorType = {
  [key: string]: string[];
};

export function getErrors(errors: ValidationError[]): FormattedErrorType | null {
  const formattedErros: FormattedErrorType = {};
  if (errors && errors.length > 0) {
    errors.forEach((error) => {
      const constraintsKeys = Object.keys(error.constraints!);
      formattedErros[error.property] = [];

      constraintsKeys.forEach((key) => {
        formattedErros[error.property].push(error.constraints![key]);
      });
    });

    return formattedErros;
  }

  return null;
}

export function IsValidCpf(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: "IsValidCpf",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === "string" && validateCpf(value);
        },
      },
    });
  };
}

export function IsValidString(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: "IsValidString",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === "string" && value !== null && value !== undefined;
        },
      },
    });
  };
}
