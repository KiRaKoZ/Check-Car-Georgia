import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailsCardComponent } from './contact-details-card.component';

describe('ContactDetailsCardComponent', () => {
  let component: ContactDetailsCardComponent;
  let fixture: ComponentFixture<ContactDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactDetailsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
