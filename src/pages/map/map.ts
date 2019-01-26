import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: any = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public eliteApi: EliteApiProvider) {
  }

  ionViewDidLoad() {
    let estates = this.navParams.data;
    // let locationData = this.eliteApi.getCurrentLocation();
    console.log(JSON.stringify(estates));
    // let location = locationData.locations[estates.locationId];
 
    this.map = {
      lat: estates.estate.latitude,
      lng: estates.estate.longitude,
      zoom: 12
      //markerLabel: estates.estates.location
    };
    //console.log(JSON.stringify(estates) + '------' + JSON.stringify(this.map));
  }

  getDirections() {
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`;
  }

}