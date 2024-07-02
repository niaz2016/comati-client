import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComatiPaymentComponent } from './add-payment.component';

describe('ComatiPaymentComponent', () => {
  let component: ComatiPaymentComponent;
  let fixture: ComponentFixture<ComatiPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComatiPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComatiPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
