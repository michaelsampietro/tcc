import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../models/item';
import { UploadService } from '../utils/upload/upload.service';
import { LoadingController } from '@ionic/angular';
import { TagService } from '../utils/tag.service';

@Component({
  selector: 'app-new-look',
  templateUrl: './new-look.page.html',
  styleUrls: ['./new-look.page.scss'],
})
export class NewLookPage implements OnInit {

  newLookForm: FormGroup;
  items = [];
  options = [];

  constructor(private formBuilder: FormBuilder,
              private uploadService: UploadService,
              private tagService: TagService,
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
    this.getTags();
    if (this.route.snapshot.data.image) {
      this.newLookForm.patchValue({ image: this.route.snapshot.data.image});
    } else {
      alert('Erro! Por favor, enviar a imagem novamente.');
      this.router.navigate(['/tabs/inicio']);
    }
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
      this.router.navigate(['/tabs/buscar']);
      await loading.dismiss();
    }).catch( async err => {
      console.log(err);
      await loading.dismiss();
    });
  }

  getTags() {
    this.tagService.GetAllTags().snapshotChanges().subscribe(dataSnapshot => {
      this.options = [];
      dataSnapshot.forEach(snapshot => {
        console.log(this.options);
        const values: string[] = Object.values(snapshot.payload.toJSON());
        console.log(values);
        values.forEach(value => {
          if (!this.options.some(option => option === value)) {
            this.options.push(value);
          }
        });
      });
    });
  }

}
