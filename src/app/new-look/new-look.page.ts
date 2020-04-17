import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-new-look",
  templateUrl: "./new-look.page.html",
  styleUrls: ["./new-look.page.scss"],
})
export class NewLookPage implements OnInit {

  newLookForm: FormGroup;
  items = [];
  options = ["teste", "teste2", "uhu"];

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.newLookForm = this.formBuilder.group({
      name: ["", Validators.required],
      tags: ["", Validators.required],
      image: ["", Validators.required]
    });

  }

  ngOnInit() {
    if (this.route.snapshot.data.special) {
      this.newLookForm.patchValue({ image: this.route.snapshot.data.special});
    }
  }

  teste(event: string) {
    console.log(event);
  }

  get image() {
    return this.newLookForm.get("image");
  }

}
