import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import { UserService } from '../user/user.service';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private user: UserService, private loadingController: LoadingController) { }

  async UploadImage(base64Imge: string) {
    const loading = await this.loadingController.create({
      message: 'Subindo imagem...',
      spinner: 'crescent'
    });

    await loading.present();
    const locale = firebase.storage().ref(`images/user_${this.user.GetUserId()}/${this.ParseTime()}`);
    locale.putString(base64Imge, 'data_url')
    await loading.dismiss();
  }

  // Função interna para auxiliar no nome dos arquivos a serem gerados.
  private ParseTime(): string {
    return new Date().toJSON().match(/\d+/g).join(''); // Pega apenas os numeros da data e junta em uma string
  }
}
