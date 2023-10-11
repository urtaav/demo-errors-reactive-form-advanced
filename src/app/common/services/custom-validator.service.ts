import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  private qualifyings = [
    'bruto',
    'idiota',
    'estupido',
    'negligente',
    'incompetente',
    'grosero',
    'insensible',
    'irresponsable',
    'inepto',
    'irrespetuoso'
  ];

  checkIfQualifyingExists(value: string) {
    return of(this.qualifyings.some((qualifying) => value.search(qualifying) > -1)).pipe(delay(1000));
  }


  emailExists(email: string): Observable<boolean> {
    return of(email).pipe(
      delay(500),
      map((email) => {
        const emails = ['facebook@gmail.com', 'google@gmail.com', 'test@test.com', 'prueba@gmail.com'];
        return emails.includes(email);
      })
    );
  }
}
