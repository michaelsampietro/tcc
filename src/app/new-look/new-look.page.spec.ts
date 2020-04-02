import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLookPage } from './new-look.page';

describe('NewLookPage', () => {
  let component: NewLookPage;
  let fixture: ComponentFixture<NewLookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLookPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
