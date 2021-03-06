import { MessagingService } from './../services/messaging.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { ToastController, LoadingController } from '@ionic/angular';
import { NavetteService } from '../services/navette.service';

import * as moment from 'moment';

/**
 * @name HomePage
 * @desc Page d'accueil de l'application
 * @author IDea Factory (dev-team@ideafactory.fr) - Fév. 2019
 * @version 1.0.0
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public hideCard: Boolean = false;
  public tourDate: Date = new Date();
  private deferredPrompt: any;
  public tournee: any;
  private dateReference: moment.Moment;

  public isFirst: boolean = true;
  public isLast: boolean = false;

  // tslint:disable-next-line:no-inferrable-types
  public showAddToHomeScreenButton: boolean = false;

  constructor(
    private messagingService: MessagingService,
    private navetteService: NavetteService,
    private toastController: ToastController,
    private loadingController: LoadingController) {
      this.tournee = {};
    }

  public ngOnInit() {
    this.messagingService.getToken();

    // Ecoute les notifications
    this.messagingService.listenToNotifications().subscribe((message) => {
      this.presentToast(message.notification);
    });

    this.getTour();

    // Timeout de n secondes avant masquage du ion-card
    setTimeout( () => {this.hideCard = true; }, 5000);
  }

  public nextDate() {
    this.getNextTour();
  }

  public previousDate() {
    this.getPreviousTour();
  }

  public ionViewWillEnter() {
    // Ajoute les listeners
    window.addEventListener(
      'beforeinstallprompt',
      (event: any): any => {
        console.log('beforeappinstall fired');
        event.preventDefault(); // Only prevent Chrome < 67

        // Remise l'événement, qui pourra être déclenché plus tard
        this.deferredPrompt = event;
      }
    );

    window.addEventListener(
      'appinstalled',
      (event: any): any => {
        console.log('Application ajoutée à l\'écran d\'accueil');
      }
    );

    if (!this.isStandalone()) {
      console.log('Application non installée !');
      this.showAddToHomeScreenButton = true;
    } else {
      console.log('Application déjà installée');
    }
  }

  public addToHomeScreen(event: any) {
    this.deferredPrompt.prompt();

    this.deferredPrompt.userChoice.
      then((result) => {
        if (result.outcome === 'accepted') {
          console.log('Application ajoutée à l\'écran d\'accueil');
        } else {
          console.log('Abandon par l\'utilisateur');
        }

        this.deferredPrompt = null;
      });
  }

  /**
   * Détermine si l'application est déjà ajoutée à l'écran d'accueil
   */
  private isStandalone(): Boolean {
    if ( !('serviceWorker' in window.navigator )) {
      return false;
    }

    // Contrôle pour Android
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return true;
    }

    // Contrôle IOS
    if (window.navigator['standalone'] === true ) {
      return true;
    }

    return false;
  }

  async presentToast(message: any) {
    // Process message
    const toast = await this.toastController.create({
      message: message.title + '\n' + message.body,
      duration: 3000
    });

    toast.present();
  }

  async getTour() {
    const loading = await this.loadingController.create({
      message: 'Chargement en cours...',
      spinner: 'crescent'
    });
    await loading.present();

    await this.navetteService.getTours().subscribe((result) => {
      this.tournee = result;
      this.dateReference = moment(this.tournee.dateReference);
      loading.dismiss();
    }, (error) => {
      loading.dismiss();
    });
  }

  async getNextTour() {
    const nextDate: moment.Moment = moment(this.tournee.date).clone().add(1, 'day');

    const loading = await this.loadingController.create({
      message: 'Chargement en cours...',
      spinner: 'crescent'
    });
    await loading.present();

    await this.navetteService.getTours(nextDate.format('YYYY-MM-DD')).subscribe((result) => {
      this.tournee = result;
      const lastDate: moment.Moment = this.dateReference.clone().add(7, 'days');

      this.isLast = lastDate.isSame(this.tournee.date, 'day');
      loading.dismiss();
    }, (error) => {
      loading.dismiss();
    });
  }

  async getPreviousTour() {
    const previousDate: moment.Moment = moment(this.tournee.date).clone().subtract(1, 'day');

    const loading = await this.loadingController.create({
      message: 'Chargement en cours...',
      spinner: 'crescent'
    });
    await loading.present();

    await this.navetteService.getTours(previousDate.format('YYYY-MM-DD')).subscribe((result) => {
      this.tournee = result;
      this.isFirst = (moment(this.tournee.date).isSame(this.dateReference, 'day'));
      loading.dismiss();
    }, (error) => {
      loading.dismiss();
    });
  }
}
