import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { UserService } from "../utils/user/user.service";
import { Item } from "../models/item";
import { DataService } from "../services/data.service";
import { Router, NavigationEnd } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ToastController, IonInfiniteScroll } from "@ionic/angular";
import { Subscription } from "rxjs";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  routerSubscription: Subscription;

  allLooks: Item[] = [];
  looks: Item[] = [];
  tags: string[] = [];
  searchForm: FormGroup;
  searchValue = "";
  isSearching = true;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private userService: UserService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router
  ) {
    this.routerSubscription = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && val.url === "/tabs/buscar;update=true") {
        this.allLooks = [];
        this.looks = [];
        this.getLooks();
      }
    });

    this.searchForm = this.formBuilder.group({
      query: ["", Validators.required],
      type: ["tags", Validators.required],
    });
  }

  ngOnInit(): void {
    this.isSearching = true;
    this.allLooks = [];
    this.getLooks();
  }

  openLookPage(look: Item) {
    this.dataService.setData(look.id, look);
    this.router.navigate([`/view-look/${look.id}`]);
  }

  async search(formValue: any) {
    this.isSearching = true;
    this.infiniteScroll.disabled = false;
    if (formValue.query === "") {
      const toast = await this.toastController.create({
        message: "Por favor, digite um termo para buscar.",
        duration: 2000,
      });
      toast.present();
      this.isSearching = false;
    } else {
      this.searchForm.patchValue({ query: this.searchForm.get("query").value });
      this.searchValue = formValue.query;

      this.userService
        .GetUserLooks()
        .snapshotChanges()
        .subscribe((dataSnapshot) => {
          this.looks = [];
          dataSnapshot.forEach((snapshot) => {
            const look = snapshot.payload.toJSON() as Item;
            look.key = snapshot.payload.key;

            if (formValue.type === "name") {
              if (this.exists(look.name, formValue.query)) {
                this.addLook(look);
              }
            } else {
              if (
                Object.values(look.tags).some((tag) =>
                  this.exists(tag, formValue.query)
                )
              ) {
                this.addLook(look);
              }
            }
          });
          this.isSearching = false;
        });
    }
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.getLooks(this.looks[this.looks.length - 1].id);
    }, 500);
  }

  cancelSearch() {
    this.looks = this.allLooks;
    this.searchValue = "";
    this.searchForm.patchValue({ query: "" });
    this.isSearching = false;
  }

  private getLooks(nodeId: number = 0) {
    this.userService
      .GetUserLooks(nodeId)
      .snapshotChanges()
      .subscribe((dataSnapshot) => {
        if (dataSnapshot.length === 0) {
          this.infiniteScroll.disabled = true;
        }
        dataSnapshot.forEach((snapshot) => {
          const item = snapshot.payload.toJSON() as Item;
          item.key = snapshot.payload.key;
          this.allLooks.push(item as Item);
          this.addLook(item);
        });
        this.isSearching = false;
      });
  }

  private exists(lookName: string, search: string) {
    return lookName.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) >= 0
      ? true
      : false;
  }

  private addLook(look: Item) {

    if (this.looks.some(l => l.id === look.id)) { // Não adicionar repetidos
      return;
    }

    look.tags = Object.values(look.tags);
    this.looks.push(look);
  }
}
