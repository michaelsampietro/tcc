import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

const options: CameraOptions = {
	quality: 100,
	destinationType: this.camera.DestinationType.FILE_URI,
	encodingType: this.camera.EncodingType.JPEG,
	mediaType: this.camera.MediaType.PICTURE
}

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

	constructor(private camera: Camera) { }

	getPicture() {
		this.camera.getPicture(options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64 (DATA_URL):
			let base64Image = 'data:image/jpeg;base64,' + imageData;
			console.log(base64Image);
		}, (err) => {
			// Handle error
		});
	}

}