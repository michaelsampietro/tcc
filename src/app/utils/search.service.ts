import { Injectable } from '@angular/core';
import { UserService } from './user/user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  looksReference = '';

  constructor(private userService: UserService, private database: AngularFireDatabase) {
    this.looksReference = `/looks/${this.userService.GetUserId()}`;
  }
  
}
