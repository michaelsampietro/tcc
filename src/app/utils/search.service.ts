import { Injectable } from '@angular/core';
import { UserService } from './user/user.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  looksReference = '';
  constructor(private userService: UserService, private database: AngularFireDatabase) {
    this.looksReference = `/looks/${this.userService.GetUserId()}`;
  }

  searchLooks(term: string, type: string) {
    const child = type === 'tags' ? 'tags' : 'name';
    this.database.list(this.looksReference, ref => ref.orderByChild(type));
  }
}
