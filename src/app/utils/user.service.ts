import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController, AlertController } from '@ionic/angular';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private alertController: AlertController) { }

  // Esse método controla se o usuário pode acessar a view desejada ou não.
  // Caso não possa, ele é redirecionado para a tela de login.
  ControlPageAccess() {
    if (!this.UserIsLogged()) {
      this.RedirectToLogin()
    }
  }

  LoginGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(_ => {
      this.navCtrl.navigateRoot("/tabs/tab1");
    }).catch(async error => {
      const alerta = await this.alertController.create({
        header: 'Erro!',
        subHeader: 'Não foi possível logar',
        message: 'Por favor, tente com outro método ou tente novamente mais tarde!',
        buttons: ['OK']
      });
      alerta.present();
      console.log(error);
    });
  }

  LoginFacebook() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then(_ => {
      this.navCtrl.navigateRoot("/tabs/tab1");
    }).catch(async error => {
      const alerta = await this.alertController.create({
        header: 'Erro!',
        subHeader: 'Não foi possível logar',
        message: 'Por favor, tente com outro método ou tente novamente mais tarde!',
        buttons: ['OK']
      });
      alerta.present();
      console.log(error);
    });
  }

  // Faz logout com o usuário atualmente logado.
  Logout() {
    this.afAuth.auth.signOut();
  }

  // Verifica se o usuário está logado ou não no firebase.
  private UserIsLogged(): boolean {
    return this.afAuth.auth.currentUser ? true : false;
  }

  // Redireciona para a tela de login do aplicativo.
  private RedirectToLogin(): void {
    this.navCtrl.navigateRoot("/login");
  }

}