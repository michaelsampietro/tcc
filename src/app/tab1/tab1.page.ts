import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { UserService } from "../utils/user/user.service";
import { CameraService } from "../utils/camera/camera.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {

  imagens: string[];
  userName = '';

  constructor(
    public afAuth: AngularFireAuth,
    private userService: UserService,
    private cameraService: CameraService
  ) {
    this.imagens = new Array<string>();
    userService.ControlPageAccess();
  }

  ngOnInit(): void {
    this.afAuth.user.subscribe(u => {
      console.log(u);
      this.userName = u.displayName;
    });
  }

  ionViewDidEnter() {
    this.ObterImagensMaisRecentes();
  }

  AbrirCamera(): void {
    this.cameraService.AbrirCamera();
  }

  AbrirGaleria(): void {
    this.cameraService.AbrirGaleria();
  }

  ObterImagensMaisRecentes(): void {
    this.userService.GetRecentLooks().snapshotChanges().subscribe(dataSnapshot => {
      this.imagens = [];
      dataSnapshot.forEach( snapshot => {
        const item: any = snapshot.payload.toJSON();
        this.imagens.push(item.image);
        console.log(item);
      });
    });
  }
}
