import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchBuilderComponent } from './switch-builder.component';

describe('SwitchBuilderComponent', () => {
  let component: SwitchBuilderComponent;
  let fixture: ComponentFixture<SwitchBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
