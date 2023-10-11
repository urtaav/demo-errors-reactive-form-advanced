import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject } from '@angular/core';

@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss'],
  standalone:true,
  imports:[NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent {
  textError = '';
  private cdr = inject(ChangeDetectorRef);

  @Input() set error(value: string) {
    if (value !== this.textError) {
      this.textError = value;
      this.cdr.detectChanges();
    }
  }
}
