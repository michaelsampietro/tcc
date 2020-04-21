import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLookPage } from './view-look.page';

describe('ViewLookPage', () => {
  let component: ViewLookPage;
  let fixture: ComponentFixture<ViewLookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLookPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
