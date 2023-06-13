import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedormainComponent } from './fornecedormain.component';

describe('FornecedormainComponent', () => {
  let component: FornecedormainComponent;
  let fixture: ComponentFixture<FornecedormainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FornecedormainComponent]
    });
    fixture = TestBed.createComponent(FornecedormainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
