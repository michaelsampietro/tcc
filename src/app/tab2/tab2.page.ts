import { Component, OnInit } from "@angular/core";
import { UserService } from '../utils/user/user.service';
import { Item } from '../models/item';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { TagService } from '../utils/tag.service';

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})

export class Tab2Page implements OnInit{

  looks: Item[] = [];
  tags: string[] = [];

  constructor(private userService: UserService,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.GetUserLooks().snapshotChanges().subscribe(dataSnapshot => {
      this.looks = [];
      dataSnapshot.forEach(snapshot => {
        const item: any = snapshot.payload.toJSON();
        item.tags = Object.values(item.tags);
        this.looks.push(item as Item);
        console.log(item);
      });
    });
  }

  openLookPage(look: Item) {
    this.dataService.setData(look.id, look);
    this.router.navigate([`/view-look/${look.id}`]);
  }
}
