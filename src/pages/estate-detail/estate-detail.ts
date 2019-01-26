import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import * as _ from 'lodash';
import moment from 'moment';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';
import { GamePage } from '../pages';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';

@IonicPage()
@Component({
  selector: 'page-estate-detail',
  templateUrl: 'estate-detail.html',
})
export class EstateDetailPage {
  estate: any = {};
  games: any[];
  private locationData: any;
  estateStanding: any = {};
  dateFilter: string;
  allGames: any[];
  useDateFilter = false;
  isSaveing = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public eliteApi: EliteApiProvider,
    public alertController: AlertController,
    public toastController: ToastController,
    public userSettings: UserSettingsProvider) {
    this.estate = this.navParams.get('estate');
  }

  ionViewDidLoad() {
    this.locationData = this.eliteApi.getCurrentLocation();
    this.games = _.chain(this.locationData.games)
    .filter(g => g.estate1Id === this.estate.id || g.estate2Id === this.estate.id)
    .map(g => {
        let isEstate1 = (g.estate1Id === this.estate.id);
        let opponentName = isEstate1 ? g.estate2 : g.estate1;
        let scoreDisplay = this.getScoreDisplay(isEstate1, g.estate1Score, g.estate2Score);
        return {
          gameId: g.id,
          opponent: opponentName,
          time: Date.parse(g.time),
          location: g.location,
          locationUrl: g.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: (isEstate1 ? "vs." : "at")
        };
    })
    .value();
    this.allGames = this.games;
    this.estateStanding = _.find(this.locationData.standings, { 'estateId': this.estate.id });
    this.userSettings.isFavoriteEstate(this.estate.id).then(value => this.isSaveing = value);
  }

  getScoreDisplay(isEstate1, estate1Score, estate2Score) {
    if (estate1Score && estate2Score) {
      var estateScore = (isEstate1 ? estate1Score : estate2Score);
      var opponentScore = (isEstate1 ? estate2Score : estate1Score);
      var winIndicator = estateScore > opponentScore ? "W: " : "L: ";
      return winIndicator + estateScore + "-" + opponentScore;
    }
    else {
      return "";
    }
  }

  gameClicked($event, game) {
    let sourceGame = this.locationData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  dateChanged() {
    if(this.useDateFilter) {
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
        this.games = this.allGames;
    }
  }

  getScoreWorL(game){
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  getScoreDisplayBadgeClass(game) {
    return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
  }

  toggleSave() {
    if(this.isSaveing) {
      let confirm = this.alertController.create({
        title: "Unsave?",
        message: "Are you sure you want to remove from saved estates?",
        buttons: [
          {
            text: "Yes",
            handler: () => {
              this.isSaveing = false;
              this.userSettings.unfavoriteEstate(this.estate);
              let toast = this.toastController.create({
                message: "You have unsaved this estate!",
                duration: 2000,
                position: "bottom"
              });
              toast.present();
            }
          },
          {
            text: "No"
          }
        ]
      });
      confirm.present();
    } else {
      this.isSaveing = true;
      this.userSettings.favoriteEstate(
        this.estate,
        this.locationData.location.id,
        this.locationData.location.name
      );
    }
  }

  refreshAll(refresher){
    this.eliteApi.refreshCurrentLocation().subscribe(() => {
      refresher.complete();
      this.ionViewDidLoad();
    });
  }
}
