import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInputsComponent } from './contact-inputs.component';

describe('ContactInputsComponent', () => {
  let component: ContactInputsComponent;
  let fixture: ComponentFixture<ContactInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactInputsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
