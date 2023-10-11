import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
const ERRORS_DEFAULT: ValidationErrors = {
	required: 'Por favor, asegúrate de llenar este campo. Es requerido',
	email: 'Por favor, ingrese una dirección de correo electrónico válida.',
	min: 'El valor minimo permitido es ${min}, el valor actual es ${current}.',
	max: 'El valor máximo permitido es ${max}, el valor actual es ${current}.',
	minLength:'Este campo no tiene la longitud minima permitida (${minLength}).',
	maxLength: 'Este campo excede la longitud máxima permitida (${maxLength}).',
	pattern: 'El valor no cumple el patrón permitido.'
};
export const getFormControlError = (formControl: AbstractControl): string => {
	if (!formControl.errors) return '';
	const firstErrorKey = Object.keys(formControl.errors!)[0];

	if (formControl.errors[firstErrorKey] === true) {
		return ERRORS_DEFAULT[firstErrorKey];
	}

	return formControl.errors![firstErrorKey] || '';
};

export const getFormControlValueAsType = <T>(formGroup: FormGroup, controlName: string): T | null => {
	const control = formGroup.get(controlName);
	if (control) {
		return control.value as T;
	}
	return null;
};