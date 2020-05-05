import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../models/item';
import { UserService } from '../utils/user/user.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-view-look',
  templateUrl: './view-look.page.html',
  styleUrls: ['./view-look.page.scss'],
})
export class ViewLookPage implements OnInit {

  look: Item = null;

  relatedItems: Item[] = [];

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    if (this.route.snapshot.data.look) {
      this.look = this.route.snapshot.data.look;
      this.look.tags = Object.values(this.look.tags);
      this.getRelatedItems();
    } else {
      alert('Não foi possível abrir o look no momento! Tente novamente mais tarde.');
      this.router.navigate(['/tabs/inicio']);
    }
  }

  openLookPage(look: Item) {
    this.dataService.setData(look.id, look);
    this.router.navigate([`/view-look/${look.id}`]);
  }

  private getRelatedItems() {
    this.userService.GetUserLooks().snapshotChanges().subscribe(dataSnapshot => {
      dataSnapshot.forEach((snapshot) => {
        const look = snapshot.payload.toJSON() as Item;
        look.tags = Object.values(look.tags);

        console.log(look);
        console.log(this.look);
        if (look.tags.some(tag => this.look.tags.includes(tag)) && look.id !== this.look.id) {
          this.relatedItems.push(look);
        }

      });
    });
  }

}
