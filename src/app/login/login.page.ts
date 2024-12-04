import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {
  SignInWithApple,
  SignInWithAppleResponse,
  SignInWithAppleOptions,
} from '@capacitor-community/apple-sign-in';


@Component({

  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  user : any


  constructor(
  private alertController: AlertController,
  private router: Router,
) { }

  ngOnInit() {
  }

  openAppleSignIn() {

    let options: SignInWithAppleOptions = {
      clientId: 'com.appiosid.ttwashexpress',
      redirectURI: '',
      scopes: 'email name',
      state: '12345',
      nonce: 'nonce',
    };

   /* SignInWithApple.authorize(options)
     .then((result: SignInWithAppleResponse) => {
       // Handle user information
       // Validate token with server and create new session
     })
     .catch(error => {
       // Handle error
     });  */
     SignInWithApple.authorize(options)
     .then(async (res) => {
       if (res.response && res.response.identityToken) {
         this.user = res.response;
         this.presentAlert(res.response.identityToken);
       } else {
         //this.presentAlert(0);
         this.router.navigate(['/tabs']);
       }
     })
     .catch((response) => {
      // this.presentAlert(0);
       this.router.navigate(['/tabs']);
     }); 
     

 
   }


   async presentAlert(x : any) {
    if(x == 0 ) {
    const alert = await this.alertController.create({
      header: 'Login Failed',
      message: 'Please try again later',
      buttons: ['OK'],
    });
    await alert.present();
    
  }
  else {
    const alert = await this.alertController.create({
      header: 'Wellcome',
      message: x,
      buttons: ['OK'],
    });
    await alert.present();
  }

  }




}


