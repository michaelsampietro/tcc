import { Component } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { UserService } from "../utils/user/user.service";
import { CameraService } from "../utils/camera/camera.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {

  imagens: string[];

  constructor(
    public afAuth: AngularFireAuth,
    private userService: UserService,
    private cameraService: CameraService
  ) {
    this.imagens = new Array<string>();
    userService.ControlPageAccess();
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
    this.imagens.push("https://firebasestorage.googleapis.com/v0/b/tcc-especializacao.appspot.com/o/solar-green20190924224618.png?alt=media&token=93cd1536-6264-4f75-9990-96049848e667");
    this.imagens.push("https://firebasestorage.googleapis.com/v0/b/tcc-especializacao.appspot.com/o/ozweego-black-carbon20190923224411.png?alt=media&token=54c5916e-ef3c-40fe-b0f6-b7f660552ed8");
    this.imagens.push("https://firebasestorage.googleapis.com/v0/b/tcc-especializacao.appspot.com/o/CW1203_01_laydown.jpg?alt=media&token=0a74256f-7250-4f56-b5cd-7dca1f311b6a");
  }
}
