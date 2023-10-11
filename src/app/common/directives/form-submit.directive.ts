import { ElementRef, inject } from "@angular/core";
import { Directive } from '@angular/core';
import { fromEvent, shareReplay } from "rxjs";

@Directive({ selector: 'form', standalone: true })
export class FormSubmitDirective {
    private readonly host: ElementRef<HTMLFormElement> = inject(ElementRef);

    submit$ = fromEvent(this.element, 'submit').pipe(shareReplay(1));

    get element() {
        return this.host.nativeElement;
    }
}