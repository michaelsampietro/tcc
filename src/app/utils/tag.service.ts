import { Injectable } from '@angular/core';
import { UserService } from './user/user.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  userTags: AngularFireList<any> = null;
  tagReference = '';
  tags: string[] = [];

  constructor(private userService: UserService, private database: AngularFireDatabase) {
    this.tagReference = `/tags/${this.userService.GetUserId()}`;
  }

  GetAllTags() {
    this.userTags = this.database.list(this.tagReference);
    return this.userTags;
  }

  UploadNewTag(tags: string[]) {
    console.log(tags);
    this.GetAllTags().snapshotChanges().subscribe(dataSnapshot => {
      this.tags = [];
      dataSnapshot.forEach(snapshot => {
        const teste = snapshot.payload.toJSON();
        console.log(teste);
      });
    });

    this.userTags.push(tags);
  }

}
