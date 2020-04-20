import { Component } from '@angular/core';
import { UserService } from '../utils/user/user.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private userService: UserService,
              private loadingController: LoadingController) {}

  async logout() {
    const loading = await this.loadingController.create({
      message: 'Saindo...'
    });
    await loading.present();

    this.userService.Logout();

    await loading.dismiss();
  }

}
