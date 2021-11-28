import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeInterfaceComponent } from './recipe-interface.component';

describe('RecipeInterfaceComponent', () => {
  let component: RecipeInterfaceComponent;
  let fixture: ComponentFixture<RecipeInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
