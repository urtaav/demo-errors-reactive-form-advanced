import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

const VALIDATOR_MESSAGE_DEFAULT = {
  required: 'Por favor, asegúrate de llenar este campo. Es requerido',
  email: 'Por favor, ingrese una dirección de correo electrónico válida.',
  min: 'El valor minimo permitido es ${min}, el valor actual es ${current}.',
  max: 'El valor máximo permitido es ${max}, el valor actual es ${current}.',
  minLength:'Este campo no tiene la longitud minima permitida (${minLength}).',
  maxLength: 'Este campo excede la longitud máxima permitida (${maxLength}).',
  pattern: 'El valor no cumple el patrón permitido.'
};


export class NgxValidators {
  static required(message?: string): ValidatorFn {
    return (control) => {
      const error = Validators.required(control);
      return error ? { required: this._getMessage('required', message) } : null;
    };
  }

  static email(message?: string): ValidatorFn {
    return (control) => {
      const error = Validators.email(control);
      return error ? { email: this._getMessage('email', message) } : null;
    };
  }

  static max(max: number, message?: string): ValidatorFn {
    return (control) => {
      const maxfunction = Validators.max(max);
      const error = maxfunction(control);

      return error ? { max: this._getMessage('max', message, [{ max: max, current: control.value.length }]) } : null;
    };
  }

  static url(message?: string): ValidatorFn {
    return (control) => {
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

      if (control.value && !urlPattern.test(control.value)) {
        return { pattern: this._getMessage('pattern', message) };
      }

      return null;
    }
  }
  static minLength(minLength: number, message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const maxFunction = Validators.minLength(minLength);
      const error = maxFunction(control);

      if (error) {
        return {
          minLength: this._getMessage('minLength', message, [{ 'minLength': minLength, current: control.value.length, }]),
        };
      }

      return null;
    };
  }
  static maxLength(maxLength: number, message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const maxFunction = Validators.maxLength(maxLength);
      const error = maxFunction(control);

      if (error) {
        return {
          maxLength: this._getMessage('maxLength', message, [{ 'maxLength': maxLength, current: control.value.length, }]),
        };
      }

      return null;
    };
  }
  private static _getMessage(
    control: keyof typeof VALIDATOR_MESSAGE_DEFAULT,
    message?: string,
    paramsMessage?: { [key: string]: unknown }[]
  ) {
    if (message) {
      return message;
    }

    let messageControl = VALIDATOR_MESSAGE_DEFAULT[control];

    if (paramsMessage && paramsMessage.length > 0) {
      for (const params of paramsMessage) {
        Object.entries(params)
          .filter(([key, value]) => value)
          .forEach(([key, value]) => {
            messageControl = messageControl.replace(`\${${key}}`, value!.toString());
          });
      }
    }

    return messageControl;
  }

}