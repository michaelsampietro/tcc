import { Component, OnInit } from "@angular/core";
import { UserService } from '../utils/user/user.service';
import { Item } from '../models/item';

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})

export class Tab2Page implements OnInit{

  looks: Item[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.GetUserBooks().snapshotChanges().subscribe(dataSnapshot => {
      this.looks = [];
      dataSnapshot.forEach(snapshot => {
        const item: any = snapshot.payload.toJSON();
        item.tags = Object.values(item.tags);
        this.looks.push(item as Item);
        console.log(item);
      });
    });
  }
}
