import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactLocationComponent } from './contact-location.component';

describe('ContactLocationComponent', () => {
  let component: ContactLocationComponent;
  let fixture: ComponentFixture<ContactLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
