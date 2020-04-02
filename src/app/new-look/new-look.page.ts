import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-new-look",
  templateUrl: "./new-look.page.html",
  styleUrls: ["./new-look.page.scss"],
})
export class NewLookPage implements OnInit {

  newLookForm: FormGroup;
  items = [];
  options = ['teste', 'teste2', 'uhu'];

  constructor(private formBuilder: FormBuilder) {
    this.newLookForm = this.formBuilder.group({
      name: ["", Validators.required],
      tags: ["", Validators.required],
      image: ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  teste(event: string) {
    console.log(event);
  }



}
