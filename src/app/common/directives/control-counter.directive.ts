import { ComponentRef, Directive, ElementRef, Input, OnDestroy, OnInit, ViewContainerRef, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { EMPTY, Subject, fromEvent, merge, takeUntil } from 'rxjs';
import { ControlCounterCharactersComponent } from '../components/control-counter-characters/control-counter-characters.component';

@Directive({
	selector: 'textarea[formControl], textarea[formControlName]',
	standalone: true,
    inputs: ['maxLength'], // Definir la propiedad de entrada maxLength
})
export class ControlCounterDirective implements OnInit, OnDestroy {
	private readonly ngControl = inject(NgControl);
	private readonly destroy$ = new Subject<void>();
	private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
	private readonly vcr = inject(ViewContainerRef);

	private componentRef!: ComponentRef<ControlCounterCharactersComponent>;

	private readonly keyUpEvent$ = fromEvent(this.elementRef.nativeElement, 'keyup');
    private readonly maxLengthAttribute = this.elementRef.nativeElement.getAttribute('maxlength');


    @Input() maxLength: number = 100; // Valor predeterminado 
    
    ngOnInit(): void {

        if (this.maxLengthAttribute) {
            // Parse the value to an integer
            this.maxLength = parseInt(this.maxLengthAttribute, 10);
          }

        merge(this.keyUpEvent$, this.ngControl.statusChanges!)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.setError(`${this.ngControl.control?.value.length}/${this.maxLength}`);
            });
    }
    
    setError(text: string) {
        if (!this.componentRef) {
            this.componentRef = this.vcr.createComponent(ControlCounterCharactersComponent);
        }
        this.componentRef.instance.error = text;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}