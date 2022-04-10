import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeBookFormComponent } from './recipe-book-form.component';

describe('RecipeBookFormComponent', () => {
  let component: RecipeBookFormComponent;
  let fixture: ComponentFixture<RecipeBookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeBookFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeBookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
