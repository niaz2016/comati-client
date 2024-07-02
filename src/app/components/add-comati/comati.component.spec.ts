import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComatiComponent as AddComatiComponent } from './comati.component';

describe('ComatiComponent', () => {
  let component: AddComatiComponent;
  let fixture: ComponentFixture<AddComatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddComatiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddComatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
