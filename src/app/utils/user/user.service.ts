import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { NavController, AlertController } from "@ionic/angular";
import { auth } from "firebase";
import * as firebase from "firebase/app";
import { SpinnerDialog } from "@ionic-native/spinner-dialog/ngx";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Item } from 'src/app/models/item';

@Injectable({
  providedIn: "root"
})
export class UserService {
  userEmail: string;
  userPassword: string;

  constructor(
    public afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private alertController: AlertController,
    private spinnerDialog: SpinnerDialog,
    private database: AngularFireDatabase
  ) {}

  // Esse método controla se o usuário pode acessar a view desejada ou não.
  // Caso não possa, ele é redirecionado para a tela de login.
  ControlPageAccess() {
    if (!this.UserIsLogged()) {
      this.RedirectToLogin();
    }
  }

  LoginGoogle() {
    this.spinnerDialog.show("Entrando...", "Aguarde, por favor.");
    this.afAuth.auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(_ => {
        this.afAuth.auth
          .signInWithPopup(new auth.GoogleAuthProvider())
          .then(_ => {
            this.SaveUserToLocalStorage();
            this.spinnerDialog.hide();
            this.navCtrl.navigateRoot("/tabs/inicio");
          })
          .catch(async error => {
            this.spinnerDialog.hide();
            const alerta = await this.alertController.create({
              header: "Erro!",
              subHeader: "Não foi possível logar",
              message:
                "Por favor, tente com outro método ou tente novamente mais tarde!",
              buttons: ["OK"]
            });
            alerta.present();
            console.log(error);
          });
      });
  }

  CreateUserUsingEmailAndPassword(email: string, password: string) {
    this.spinnerDialog.show("Entrando...", "Aguarde, por favor.");
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(_ => {
        this.SaveUserToLocalStorage();
        this.spinnerDialog.hide();
        this.LoginUsingEmailAndPassword(email, password);
      })
      .catch(async error => {
        this.spinnerDialog.hide();
        let msgErro = "Erro não identificado!";
        if (error.code) {
          if (error.code === "auth/weak-password") {
            msgErro = "A senha deve conter no mínimo 6 caracteres";
          } else if (error.code === "auth/invalid-email") {
            msgErro = "O email informado é invalido";
          } else {
            msgErro = "O email informado ja está cadastrado";
          }
        }

        const alerta = await this.alertController.create({
          header: "Erro!",
          subHeader: "Não foi possível logar",
          message: msgErro,
          buttons: ["OK"]
        });
        alerta.present();
        console.log(error);
      });
  }

  LoginUsingEmailAndPassword(email: string, password: string) {
    this.spinnerDialog.show("Entrando...", "Aguarde, por favor.");
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(_ => {
        this.SaveUserToLocalStorage();
        this.spinnerDialog.hide();
        this.navCtrl.navigateRoot("/tabs/inicio");
      })
      .catch(async error => {
        this.spinnerDialog.hide();
        const alerta = await this.alertController.create({
          header: "Erro!",
          subHeader: "Não foi possível logar",
          message:
            "Por favor, tente com outro método ou tente novamente mais tarde!",
          buttons: ["OK"]
        });
        alerta.present();
        console.log(error);
      });
  }

  // Faz logout com o usuário atualmente logado.
  Logout() {
    this.afAuth.auth.signOut();
    localStorage.removeItem("user");
    this.RedirectToLogin();
  }

  GetUserId(): string {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.uid : "";
  }

  GetUserLooks(): AngularFireList<Item> {
    const userId = this.GetUserId();
    return this.database.list<Item>(`/looks/${this.GetUserId()}`);
  }

  GetRecentLooks(): AngularFireList<Item> {
    const userId = this.GetUserId();
    return this.database.list<Item>(`/looks/${this.GetUserId()}`);
  }

  // Verifica se o usuário está logado ou não no firebase.
  private UserIsLogged(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? true : false;
  }

  // Redireciona para a tela de login do aplicativo.
  private RedirectToLogin(): void {
    this.navCtrl.navigateRoot("/login");
  }

  private SaveUserToLocalStorage() {
    localStorage.setItem("user", JSON.stringify(this.afAuth.auth.currentUser));
  }
}
