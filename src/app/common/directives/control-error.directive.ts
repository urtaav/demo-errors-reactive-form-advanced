import { ComponentRef, Directive, ElementRef, OnDestroy, OnInit, ViewContainerRef, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { EMPTY, Subject, fromEvent, merge, takeUntil } from 'rxjs';
import { ControlErrorComponent } from '../components/control-error/control-error.component';
import { FormSubmitDirective } from './form-submit.directive';
import { getFormControlError } from '../utils/functions-form';

@Directive({
    selector: '[formControl], [formControlName]',
    standalone: true
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
    private readonly ngControl = inject(NgControl);
    private readonly form = inject(FormSubmitDirective, { optional: true });
    private readonly destroy$ = new Subject<void>();
    private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
    private readonly vcr = inject(ViewContainerRef);

    private componentRef!: ComponentRef<ControlErrorComponent>;

    private readonly submit$ = this.form ? this.form.submit$ : EMPTY;
    private readonly blurEvent$ = fromEvent(this.elementRef.nativeElement, 'blur');

    ngOnInit(): void {
        merge(this.submit$, this.blurEvent$, this.ngControl.statusChanges!)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                const errorControl = getFormControlError(this.ngControl.control!);
                this.setError(errorControl);
                this._isInputGroup();
            });
    }

    private _isInputGroup() {
        const parentElement = this.getParentElementWithClass(this.elementRef.nativeElement, 'p-inputgroup');

        if (parentElement) {
            this.insertElementAfterParent(parentElement, this.componentRef.location.nativeElement);
        }
    }

    private getParentElementWithClass = (element: HTMLElement, className: string): HTMLElement | null => {
        let parentElement = element.parentElement;
        while (parentElement) {
            if (parentElement.classList.contains(className)) {
                return parentElement;
            }
            parentElement = parentElement.parentElement;
        }

        return null; // Si no se encuentra el elemento con la clase, devolvemos null.
    }

    private insertElementAfterParent = (parent: HTMLElement, elementToInsert: HTMLElement) => {
        parent.insertAdjacentElement('afterend', elementToInsert);
    }

    setError(text: string) {
        if (!this.componentRef) {
            this.componentRef = this.vcr.createComponent(ControlErrorComponent);
        }
        this.componentRef.instance.error = text;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}