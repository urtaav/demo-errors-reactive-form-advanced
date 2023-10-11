

import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { CustomValidatorService } from '../services/custom-validator.service';

export const qualifyingValidator = (customValidatorService: CustomValidatorService): AsyncValidatorFn => {
	return (control: AbstractControl): Observable<ValidationErrors | null> => {
		return customValidatorService
			.checkIfQualifyingExists(control.value)
			.pipe(
				map((result: boolean) =>
					result ? { qualifierExists: "Por favor, evite incluir palabras ofensivas o negativas en la observación." } : null
				)
			);
	};
};


export const uniqueEmailValidator = (customValidatorService: CustomValidatorService): AsyncValidatorFn => {
	return (control: AbstractControl): Observable<ValidationErrors | null> => {
		return customValidatorService.emailExists(control.value).pipe(
			map((exists: boolean) => exists ? { emailExists: 'Por favor, ingrese una dirección de correo electrónico diferente,la ingresada esta en uso.' } : null)
		);
	};
}