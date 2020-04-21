import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { UserService } from '../user/user.service';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from 'src/app/models/item';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { TagService } from '../tag.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  looks: AngularFireList<any>;
  looksReference = '';

  constructor(private user: UserService,
              private loadingController: LoadingController,
              private firestore: AngularFirestore,
              private database: AngularFireDatabase,
              private tagService: TagService) {
    this.looksReference = `/looks/${this.user.GetUserId()}`;
    this.looks = this.database.list(this.looksReference);
    console.log(this.looks);
  }

  async UploadImage(base64Imge: string) {
    const loading = await this.loading('Subindo imagem...');
    const locale = firebase.storage().ref(`images/user_${this.user.GetUserId()}/${this.ParseTime()}`);
    await locale.putString(base64Imge, 'data_url');
    await loading.dismiss();
    return locale.getDownloadURL();
  }

  async UploadLook(look: Item) {
    look.user = this.user.GetUserId();
    await this.looks.push(look);
    this.tagService.UploadNewTag(look.tags);
    console.log(this.database.list(this.looksReference));
  }

  // Função interna para auxiliar no nome dos arquivos a serem gerados.
  private ParseTime(): string {
    return new Date().getTime().toString();
  }

  private async loading(message: string) {
    const loading = await this.loadingController.create({
      message,
      spinner: 'crescent'
    });

    await loading.present();
    return loading;
  }
}
