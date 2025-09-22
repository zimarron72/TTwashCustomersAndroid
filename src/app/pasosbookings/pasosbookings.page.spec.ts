import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasosbookingsPage } from './pasosbookings.page';

describe('PasosbookingsPage', () => {
  let component: PasosbookingsPage;
  let fixture: ComponentFixture<PasosbookingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PasosbookingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
