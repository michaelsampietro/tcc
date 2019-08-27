import { Component } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { UserService } from "../utils/user.service";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  constructor(
    public afAuth: AngularFireAuth,
    private userService: UserService,
    private camera: Camera
  ) {
    userService.ControlPageAccess();
  }

  AbrirCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        const base64Image = "data:image/jpeg;base64," + imageData;
        console.log(base64Image);
      }
    );
  }
}
