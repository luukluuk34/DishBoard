import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeBookDetailComponent } from './recipe-book-detail.component';

describe('RecipeBookDetailComponent', () => {
  let component: RecipeBookDetailComponent;
  let fixture: ComponentFixture<RecipeBookDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeBookDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeBookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
