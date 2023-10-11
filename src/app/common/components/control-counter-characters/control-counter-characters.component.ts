import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject } from '@angular/core';

@Component({
  selector: 'app-control-counter-characters',
  templateUrl: './control-counter-characters.component.html',
  styleUrls: ['./control-counter-characters.component.scss'],
  standalone:true,
  imports:[NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlCounterCharactersComponent {
  quantity = '';
  private cdr = inject(ChangeDetectorRef);

  @Input() set error(value: string) {
    if (value !== this.quantity) {
      this.quantity = value;
      this.cdr.detectChanges();
    }
  }
}
