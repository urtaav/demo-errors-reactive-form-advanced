import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCounterCharactersComponent } from './control-counter-characters.component';

describe('ControlCounterCharactersComponent', () => {
  let component: ControlCounterCharactersComponent;
  let fixture: ComponentFixture<ControlCounterCharactersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlCounterCharactersComponent]
    });
    fixture = TestBed.createComponent(ControlCounterCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
