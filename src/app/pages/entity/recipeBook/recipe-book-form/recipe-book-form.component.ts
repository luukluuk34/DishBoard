import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../../recipe/recipe.model';
import { AuthenticationService } from '../../user/authentication.service';
import { User } from '../../user/user.model';
import { Chapter, RecipeBook } from '../recipeBook.model';
import { RecipeBookService } from '../recipeBook.service';

@Component({
  selector: 'app-recipe-book-form',
  templateUrl: './recipe-book-form.component.html',
  styleUrls: ['./recipe-book-form.component.css'],
})
export class RecipeBookFormComponent implements OnInit {
  recipeBook: RecipeBook;

  currentUser$: Observable<User | undefined>;
  currentUser: User | undefined;
  addRecipeBookForm!: FormGroup;
  token!: string | string[];

  isRecipeListOpen: Boolean = false;
  currentChapterIndex: number = 0;

  _id!: string;

  constructor(
    private route: ActivatedRoute,
    private recipeBookService: RecipeBookService,
    private auth: AuthenticationService,
    private router: Router
  ) {
    this.currentUser$ = this.auth.currentUser$;
    this.currentUser$.subscribe((user) => (this.currentUser = user));
    this.auth
      .getTokenFromLocalStorage()
      .subscribe((element) => (this.token = element));
    this.recipeBook = new RecipeBook();
  }

  ngOnInit(): void {
    this.route.params.subscribe((paramId) => {
      this._id = paramId['id'] ?? '0';
    });
    if (this._id === '0') {
      console.log('add');
    } else {
      console.log(this._id);
      console.log(
        'update',
        this.recipeBookService.getById(this._id).subscribe((result) => {
          (this.recipeBook = result), console.log('In de sub', this.recipeBook);
        })
      );
    }

    console.log(this.recipeBook);
    this.addRecipeBookForm = new FormGroup({
      title: new FormControl(this.recipeBook.title, Validators.required),
      about: new FormControl(this.recipeBook.about, Validators.required),
      chapters: new FormArray([]),
      user: new FormControl(this.recipeBook.user),
    });
    this.addChapter();
    this.addRecipeBookForm.get('user')?.setValue(this.currentUser);
  }

  onSubmit() {
    console.log('On submit', this.addRecipeBookForm.value);
    if (this.addRecipeBookForm.invalid) {
      return;
    }
    let header = new HttpHeaders();
    header = header.set('Authorization', `Bearer ${this.token}`);

    if(this.recipeBook?._id){
      this.recipeBookService.update(this.addRecipeBookForm.value,this.recipeBook._id,header).subscribe();
    }else{
      this.recipeBookService.create(this.addRecipeBookForm.value,header).subscribe();
    }
    this.router.navigate([`/user-detail/${this.currentUser?._id}`]);
  }

  get chapters(): FormArray {
    return this.addRecipeBookForm.get('chapters') as FormArray;
  }

  addChapter() {
    this.isRecipeListOpen = false;
    this.chapters.push(this.newChapter());
  }

  populateChapter() {
    for (let i = 0; i < this.recipeBook.chapters.length - 1; i++) {
      this.chapters.push(this.updateChapter(this.recipeBook.chapters[i]));
    }
  }

  updateChapter(chapter: Chapter): FormGroup {
    return new FormGroup({
      chapterTitle: new FormControl(chapter.chapterTitle, Validators.required),
      chapterIntro: new FormControl(chapter.chapterIntro, Validators.required),
      recipeList: new FormArray([]),
    });
  }

  newChapter(): FormGroup {
    return new FormGroup({
      chapterTitle: new FormControl(null, Validators.required),
      chapterIntro: new FormControl(null, Validators.required),
      recipeList: new FormArray([]),
    });
  }

  getRecipes(index: number): FormArray {
    return this.chapters.at(index).get('recipeList') as FormArray;
  }

  deleteChapter(index: number) {
    this.isRecipeListOpen = false;
    this.chapters.removeAt(index);
  }

  openRecipeList(chapterIndex: number) {
    this.isRecipeListOpen = !this.isRecipeListOpen;
    this.currentChapterIndex = chapterIndex;
  }

  addRecipe(obj: object) {
    let number = Object.values(obj)[1];
    let recipe = Object.values(obj)[0];

    let recipeFormArray = this.getRecipes(number);
    let alreadyAdded = false;
    for (let d of recipeFormArray.controls) {
      if (d.value._id == recipe._id) {
        alreadyAdded = true;
      }
    }
    if (alreadyAdded == false) {
      this.getRecipes(number).push(
        new FormControl(recipe, Validators.required)
      );
    }
  }

  removeRecipe(chapterIndex: number, recipeIndex: number, recipe: Recipe) {
    this.getRecipes(chapterIndex).removeAt(recipeIndex);
  }
}
