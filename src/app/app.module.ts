import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import {IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyEstatesPage, EstateDetailPage, EstatesPage, GamePage, EstateHomePage, LocationsPage, MapPage , SimilarPage} from '../pages/pages'; //TournamentsPage
import { EliteApiProvider } from '../providers/elite-api/elite-api';
import { UserSettingsProvider } from '../providers/user-settings/user-settings';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MyEstatesPage,
    //TournamentsPage,
    EstateDetailPage,
    EstatesPage,
    GamePage,
    EstateHomePage,
    LocationsPage,
    MapPage,
    SimilarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAi91xerL_8t_7tnCR7GstQ2W0uxUT6ILk'
    })  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MyEstatesPage,
    //TournamentsPage,
    EstateDetailPage,
    EstatesPage,
    GamePage,
    EstateHomePage,
    LocationsPage,
    MapPage,
    SimilarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EliteApiProvider,
    UserSettingsProvider
  ]
})
export class AppModule {}
