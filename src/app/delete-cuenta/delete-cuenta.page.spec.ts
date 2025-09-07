import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteCuentaPage } from './delete-cuenta.page';

describe('DeleteCuentaPage', () => {
  let component: DeleteCuentaPage;
  let fixture: ComponentFixture<DeleteCuentaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
