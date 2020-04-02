import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { NewLookPage } from "./new-look.page";
import { TagInputModule } from 'ngx-chips';

const routes: Routes = [
  {
    path: "",
    component: NewLookPage
  }
];

@NgModule({
  imports: [
    TagInputModule,
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forChild(routes)
  ],
  declarations: [NewLookPage]
})
export class NewLookPageModule {}
