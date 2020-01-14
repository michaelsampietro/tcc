import { Injectable } from '@angular/core';
import { Upload } from 'src/app/models/upload';
import * as firebase from "firebase/app";
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private user: UserService) { }

  UploadImage(base64Imge: string){
    const locale = firebase.storage().ref(`images/user_${this.user.GetUserId()}/${this.ParseTime()}`);
    locale.putString(base64Imge, 'data_url');
  }

  private ParseTime(): string {
    return new Date().toJSON().match(/\d+/g).join(''); // pega apenas os numeros da data e junta em uma string
  }
}
