import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EstateHomePage } from '../pages';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-similar',
  templateUrl: 'similar.html',
})
export class SimilarPage {
//   similar: any[];
//   estate: any = {};
//   allsimilar: any[];
//   locationFilter = 'location';  

//   constructor(
//     public navCtrl: NavController, 
//     public navParams: NavParams,
//     public eliteApi: EliteApiProvider) {
//   }

//   ionViewDidLoad() {
//     this.estate = this.navParams.get('estate');
//     let locationData = this.eliteApi.getCurrentLocation();
//     this.similar = locationData.similar;
//     this.allsimilar = locationData.similar;
//     this.filterDivision();
//   }

//   getHeader(record, recordIndex, records){
//     if (recordIndex === 0 || record.location !== records[recordIndex-1].location) {
//       return record.location;
//     }
//     return null;  
//   }

//   filterDivision(){
    
//     if(this.locationFilter === 'all'){
//       this.similar = this.allsimilar;
//     } else {
//       this.similar = _.filter(this.allsimilar, s => s.location === this.estate.location);
//     }
//   }

  estates = [];
  private allEstates: any;
  private allEstateRegions: any;
  public queryText: string;
  public publicSelectedLocation: any;
  estate: any = {};
  _location: any = {};
  public selectedPublicLocation: any;
  public selectedPublicRegion: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public eliteApi: EliteApiProvider,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let selectedLocation = this.eliteApi.getCurrentLocation();//this.navParams.data;
    this.selectedPublicLocation = this.eliteApi.getCurrentLocation();
    this.publicSelectedLocation = this.navParams.data;
    this.estate = this.navParams.get('estate');
    this.selectedPublicRegion = this.estate.region;

    this._location = this.navParams.get('locations-data');
    let _getCur = this.eliteApi.getCurrentLocation();

    console.log('this.estate------>> ' + JSON.stringify(this.estate));
    console.log('this._location------>> ' + JSON.stringify(this._location));
    console.log('selectedLocation------>> ' + JSON.stringify(selectedLocation));
    console.log('publicSelectedLocation------>> ' + JSON.stringify(this.publicSelectedLocation));
    console.log('_getCur------>> ' + JSON.stringify(_getCur));
    console.log('selectedPublicRegion---------->' + this.selectedPublicRegion);

    let loader = this.loadingController.create({
      content: 'Getting data...'
    });
    loader.present().then(() => {
      this.eliteApi.getLocationData(selectedLocation.location.id).subscribe(data => {
        this.allEstates = data.estates;
        // subdivide the estates into regions
        this.allEstateRegions =
          _.chain(data.estates)
          .groupBy('region')
          .toPairs()
          .map(item => _.zipObject(['regionName', 'regionEstates'], item))
          .value();
          this.estates = this.allEstateRegions;    
          loader.dismiss();  
      });
    });
    this.filterSimilar();
  }

  filterSimilar(){
      // if(this.locationFilter === 'all'){
      //   this.similar = this.allsimilar;
      // } else {
      //   this.similar = _.filter(this.allsimilar, s => s.location === this.estate.location);
      // }
    }

  itemTapped($event, estate) {
    this.navCtrl.push(EstateHomePage, {estate: estate});
  }

  updateEstates(){
    let queryTextLower = this.queryText.toLowerCase();
    let filteredEstates = [];
    _.forEach(this.allEstateRegions, td => {
      let estates = _.filter(td.regionEstates, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if (estates.length) {
        filteredEstates.push({ regionName: td.regionName, regionEstates: estates });
      }
    });

    this.estates = filteredEstates;
  }

}
