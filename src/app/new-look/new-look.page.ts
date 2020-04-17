import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../models/item';
import { UploadService } from '../utils/upload/upload.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-look',
  templateUrl: './new-look.page.html',
  styleUrls: ['./new-look.page.scss'],
})
export class NewLookPage implements OnInit {

  newLookForm: FormGroup;
  items = [];
  options = ['teste', 'teste2', 'uhu'];

  constructor(private formBuilder: FormBuilder,
              private uploadService: UploadService,
              private loadingController: LoadingController,
              private route: ActivatedRoute,
              private router: Router) {

    this.newLookForm = this.formBuilder.group({
      name: ['', Validators.required],
      tags: ['', Validators.required],
      image: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.newLookForm.patchValue({ image: 'https://placeimg.com/640/480/any'});
    // if (this.route.snapshot.data.special) {
    //   this.newLookForm.patchValue({ image: this.route.snapshot.data.special});
    // } else {
    //   this.newLookForm.patchValue({ image: 'https://placeimg.com/640/480/any'});
    // }
  }

  teste(event: string) {
    console.log(event);
  }

  get image() {
    return this.newLookForm.get('image');
  }

  async registerNewLook(values: any) {
    console.log(values);
    const tags = [];

    values.tags.map(tag => {
      tags.push(tag.value);
    });

    const look: Item = {
      id: new Date().getTime(),
      image: values.image,
      name: values.name,
      tags,
      user: ''
    };

    const loading = await this.loadingController.create({
      message: 'Subindo novo item...',
      spinner: 'crescent'
    });

    await loading.present();
    this.uploadService.UploadLook(look).then( async success => {
      console.log(success);
      await loading.dismiss();
    }).catch( async err => {
      console.log(err);
      await loading.dismiss();
    });
  }

}
