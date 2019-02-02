webpackJsonp([7],{

/***/ 222:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 222;

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/estate-detail/estate-detail.module": [
		754,
		6
	],
	"../pages/estate-home/estate-home.module": [
		755,
		5
	],
	"../pages/estates/estates.module": [
		756,
		4
	],
	"../pages/locations/locations.module": [
		757,
		3
	],
	"../pages/map/map.module": [
		758,
		2
	],
	"../pages/my-estates/my-estates.module": [
		759,
		1
	],
	"../pages/similar/similar.module": [
		760,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 266;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstateDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_elite_api_elite_api__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_settings_user_settings__ = __webpack_require__(92);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EstateDetailPage = /** @class */ (function () {
    function EstateDetailPage(navCtrl, navParams, eliteApi, alertController, toastController, userSettings) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.eliteApi = eliteApi;
        this.alertController = alertController;
        this.toastController = toastController;
        this.userSettings = userSettings;
        this.estate = {};
        this.estateStanding = {};
        this.useDateFilter = false;
        this.isSaveing = false;
        this.estate = this.navParams.get('estate');
    }
    EstateDetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.locationData = this.eliteApi.getCurrentLocation();
        //console.log('this.locationData ' + JSON.stringify(this.locationData));
        this.estates = __WEBPACK_IMPORTED_MODULE_2_lodash__["chain"](this.locationData.estates)
            .filter(function (g) { return g.estate1Id === _this.estate.id || g.estate2Id === _this.estate.id; })
            .map(function (g) {
            return {
                location: g.location,
                locationUrl: g.locationUrl
            };
        })
            .value();
        this.userSettings.isFavoriteEstate(this.estate.id).then(function (value) { return _this.isSaveing = value; });
    };
    EstateDetailPage.prototype.toggleSave = function () {
        var _this = this;
        if (this.isSaveing) {
            var confirm_1 = this.alertController.create({
                title: "Unsave?",
                message: "Are you sure you want to remove from saved estates?",
                buttons: [
                    {
                        text: "Yes",
                        handler: function () {
                            _this.isSaveing = false;
                            _this.userSettings.unfavoriteEstate(_this.estate);
                            var toast = _this.toastController.create({
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
            confirm_1.present();
        }
        else {
            this.isSaveing = true;
            this.userSettings.favoriteEstate(this.estate, this.locationData.location.id, this.locationData.location.name);
        }
    };
    EstateDetailPage.prototype.refreshAll = function (refresher) {
        var _this = this;
        this.eliteApi.refreshCurrentLocation().subscribe(function () {
            refresher.complete();
            _this.ionViewDidLoad();
        });
    };
    EstateDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-estate-detail',template:/*ion-inline-start:"/home/stanimir/royalEstates/src/pages/estate-detail/estate-detail.html"*/'<ion-header>\n  <ion-navbar></ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-refresher (ionRefresh)="refreshAll($event)">\n      <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <ion-card>\n    <img src= {{estate.image}}>\n      <ion-card-content>\n\n        <ion-col text-right>\n            <button ion-button small icon-left outline (click)="toggleSave()" *ngIf="!isSaveing">\n                <ion-icon name="bookmark"></ion-icon>\n                SAVE TO MY ESTATES\n            </button>\n            <button ion-button small icon-only (click)="toggleSave()" *ngIf="isSaveing">\n                <ion-icon name="star"></ion-icon>\n            </button>\n        </ion-col>        \n        <!-- Grid start -->\n        <ion-grid>\n            <ion-row>\n                <ion-col>\n                {{estate.type}}\n                </ion-col>\n                <ion-col>\n                Area: {{estate.area}} m²\n                </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col>\n                <ion-badge>{{estate.bedrooms}}</ion-badge> Bedrooms\n                </ion-col>\n                <ion-col>\n                Price: {{estate.price | currency:\'USD\':\'symbol-narrow\':\'4.2-2\'}}\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n        <p>{{estate.address}}</p>\n      </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/home/stanimir/royalEstates/src/pages/estate-detail/estate-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_elite_api_elite_api__["a" /* EliteApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_settings_user_settings__["a" /* UserSettingsProvider */]])
    ], EstateDetailPage);
    return EstateDetailPage;
}());

//# sourceMappingURL=estate-detail.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstateHomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EstateHomePage = /** @class */ (function () {
    function EstateHomePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.estate = {};
        this.estateDetailTab = __WEBPACK_IMPORTED_MODULE_2__pages__["a" /* EstateDetailPage */];
        this.mapTab = __WEBPACK_IMPORTED_MODULE_2__pages__["e" /* MapPage */];
        this.overviewTab = __WEBPACK_IMPORTED_MODULE_2__pages__["g" /* SimilarPage */];
        this.estate = this.navParams.get('estate');
    }
    EstateHomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EstateHomePage');
    };
    EstateHomePage.prototype.goHome = function () {
        this.navCtrl.popToRoot();
    };
    EstateHomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-estate-home',template:/*ion-inline-start:"/home/stanimir/royalEstates/src/pages/estate-home/estate-home.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Ref No. {{estate.refNumber}}</ion-title>\n    <ion-buttons end>\n        <button ion-button icon-only (click)="goHome()">\n            <ion-icon name="home"></ion-icon>\n        </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-tabs>\n  <ion-tab tabTitle="Similar" [root]="estateDetailTab" [rootParams]="{estate: estate}" tabIcon="alert"></ion-tab>\n  <ion-tab tabTitle="Map" [root]="mapTab" [rootParams]="{estate: estate}" tabIcon="map"></ion-tab>\n  <ion-tab tabTitle="Similar" [root]="overviewTab" [rootParams]="{estate: estate}" tabIcon="albums"></ion-tab>\n</ion-tabs>\n\n'/*ion-inline-end:"/home/stanimir/royalEstates/src/pages/estate-home/estate-home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], EstateHomePage);
    return EstateHomePage;
}());

//# sourceMappingURL=estate-home.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyEstatesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_elite_api_elite_api__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_settings_user_settings__ = __webpack_require__(92);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyEstatesPage = /** @class */ (function () {
    function MyEstatesPage(navCtrl, navParams, loadingController, eliteApi, userSettings) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingController = loadingController;
        this.eliteApi = eliteApi;
        this.userSettings = userSettings;
        this.favorites = [];
    }
    MyEstatesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.userSettings.getAllFavorites().then(function (favs) { return _this.favorites = favs; });
    };
    MyEstatesPage.prototype.goToLocations = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages__["d" /* LocationsPage */]);
    };
    MyEstatesPage.prototype.favoriteTapped = function ($event, favorite) {
        var _this = this;
        var loader = this.loadingController.create({
            content: 'Getting data...'
        });
        loader.present();
        this.eliteApi.getLocationData(favorite.locationId)
            .subscribe(function (t) {
            loader.dismiss();
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages__["b" /* EstateHomePage */], { estate: favorite.estate });
        });
    };
    MyEstatesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-estates',template:/*ion-inline-start:"/home/stanimir/royalEstates/src/pages/my-estates/my-estates.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <button menuToggle ion-button icon-only>\n            <ion-icon name="menu"></ion-icon>\n            <ion-title>Royal Estates</ion-title>\n        </button>\n    </ion-navbar>\n    <ion-toolbar color="secondary">\n        <ion-title>My Estates</ion-title>\n    </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n    <ion-card *ngIf="favorites">\n      <ion-card-header class="my-estates-header">Saved Estates</ion-card-header>\n        <ion-list>\n            <button icon-left ion-item *ngFor="let item of favorites" (click)="favoriteTapped($event, item)">\n                \n                <ion-thumbnail item-start>\n                    <img src= {{item.estate.image}}>\n                </ion-thumbnail>\n        \n                <h2>Ref No. {{item.estate.refNumber}}</h2>\n                <p>{{item.estate.type}}, {{item.estate.bedrooms}} Bedrooms</p>\n                <p>{{item.locationName}}, {{item.estate.region}}</p>\n            </button>\n        </ion-list>\n        <ion-card-content>\n            <p>To save more estates, select a location,\n                then you can save estates from their estate overview page.</p>    \n            <button icon-left ion-button full (click)="goToLocations()">\n                <ion-icon name="search"></ion-icon>\n                Find a Location\n            </button>\n        </ion-card-content>\n  </ion-card>\n  <ion-card *ngIf="!favorites">\n    <ion-card-content>\n        <p>To save more estates, select a location, then you can save estates from overview page.</p>\n        <button ion-button (click)="goToLocations()" icon-left full>\n            <ion-icon name="search"></ion-icon>\n            Find a Location\n        </button>\n    </ion-card-content>\n  </ion-card>\n  \n</ion-content>\n'/*ion-inline-end:"/home/stanimir/royalEstates/src/pages/my-estates/my-estates.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_elite_api_elite_api__["a" /* EliteApiProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_settings_user_settings__["a" /* UserSettingsProvider */]])
    ], MyEstatesPage);
    return MyEstatesPage;
}());

//# sourceMappingURL=my-estates.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstatesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_elite_api_elite_api__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EstatesPage = /** @class */ (function () {
    function EstatesPage(navCtrl, navParams, eliteApi, loadingController) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.eliteApi = eliteApi;
        this.loadingController = loadingController;
        this.estates = [];
    }
    EstatesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var selectedLocation = this.navParams.data;
        this.publicSelectedLocation = this.navParams.data;
        var loader = this.loadingController.create({
            content: 'Getting data...'
        });
        loader.present().then(function () {
            _this.eliteApi.getLocationData(selectedLocation.id).subscribe(function (data) {
                console.log('---From estates.ts---- data.estates is: ' + data.estates);
                _this.allEstates = data.estates;
                // subdivide the estates into regions
                _this.allEstateRegions =
                    __WEBPACK_IMPORTED_MODULE_4_lodash__["chain"](data.estates)
                        .groupBy('region')
                        .toPairs()
                        .map(function (item) { return __WEBPACK_IMPORTED_MODULE_4_lodash__["zipObject"](['regionName', 'regionEstates'], item); })
                        .value();
                _this.estates = _this.allEstateRegions;
                loader.dismiss();
            });
        });
    };
    EstatesPage.prototype.itemTapped = function ($event, estate) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages__["b" /* EstateHomePage */], { estate: estate });
    };
    EstatesPage.prototype.updateEstates = function () {
        var queryTextLower = this.queryText.toLowerCase();
        var filteredEstates = [];
        __WEBPACK_IMPORTED_MODULE_4_lodash__["forEach"](this.allEstateRegions, function (td) {
            var estates = __WEBPACK_IMPORTED_MODULE_4_lodash__["filter"](td.regionEstates, function (t) { return t.name.toLowerCase().includes(queryTextLower); });
            if (estates.length) {
                filteredEstates.push({ regionName: td.regionName, regionEstates: estates });
            }
        });
        this.estates = filteredEstates;
    };
    EstatesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-estates',template:/*ion-inline-start:"/home/stanimir/royalEstates/src/pages/estates/estates.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Estates</ion-title>\n  </ion-navbar>\n  <ion-toolbar>\n      <ion-searchbar placeholder="Search"\n          [(ngModel)]="queryText"\n          (ionInput)="updateEstates()">\n      </ion-searchbar>\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content padding>\n  <ion-item-group *ngFor="let region of estates">\n      <ion-item-divider color="secondary" >{{region.regionName}}</ion-item-divider>\n      <button ion-item *ngFor="let estate of region.regionEstates" (click)="itemTapped($event, estate)">\n        \n        <ion-thumbnail item-start>\n            <img src= {{estate.image}}>\n        </ion-thumbnail>\n\n        <h2>Ref No. {{estate.refNumber}}</h2>\n        <p>{{estate.type}}, {{estate.bedrooms}} Bedrooms</p>\n        <p>{{publicSelectedLocation.name}}, {{estate.region}}</p>\n        \n      </button>\n  </ion-item-group>\n</ion-content>'/*ion-inline-end:"/home/stanimir/royalEstates/src/pages/estates/estates.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_elite_api_elite_api__["a" /* EliteApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], EstatesPage);
    return EstatesPage;
}());

//# sourceMappingURL=estates.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_elite_api_elite_api__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LocationsPage = /** @class */ (function () {
    function LocationsPage(navCtrl, navParams, eliteApi, loadingController) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.eliteApi = eliteApi;
        this.loadingController = loadingController;
    }
    LocationsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loader = this.loadingController.create({
            content: 'Getting locations...',
            spinner: 'dots'
        });
        loader.present().then(function () {
            _this.eliteApi.getLocations().subscribe(function (locations) {
                _this.locations = locations;
                loader.dismiss();
            });
        });
    };
    LocationsPage.prototype.itemTapped = function ($event, item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages__["c" /* EstatesPage */], item);
    };
    LocationsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-locations',template:/*ion-inline-start:"/home/stanimir/royalEstates/src/pages/locations/locations.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Select a Location</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <button ion-item *ngFor="let item of locations" (click)="itemTapped($event, item)">\n        {{item.name}}\n    </button>\n</ion-content>\n'/*ion-inline-end:"/home/stanimir/royalEstates/src/pages/locations/locations.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_elite_api_elite_api__["a" /* EliteApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], LocationsPage);
    return LocationsPage;
}());

//# sourceMappingURL=locations.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_elite_api_elite_api__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MapPage = /** @class */ (function () {
    function MapPage(navCtrl, navParams, eliteApi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.eliteApi = eliteApi;
        this.map = {};
    }
    MapPage.prototype.ionViewDidLoad = function () {
        var estates = this.navParams.data;
        console.log(JSON.stringify(estates));
        this.map = {
            lat: estates.estate.latitude,
            lng: estates.estate.longitude,
            zoom: 12
        };
        //console.log(JSON.stringify(estates) + '------' + JSON.stringify(this.map));
    };
    MapPage.prototype.getDirections = function () {
        window.location = "geo:" + this.map.lat + "," + this.map.lng + ";u=35";
    };
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-map',template:/*ion-inline-start:"/home/stanimir/royalEstates/src/pages/map/map.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Map</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="map-page">\n    <agm-map id="map" [latitude]="map.lat" [longitude]="map.lng" [zoom]="map.zoom">\n        <agm-marker [latitude]="map.lat" [longitude]="map.lng" [title]="map.markerLabel"></agm-marker>\n    </agm-map>\n    <ion-fab left bottom>\n        <button ion-fab (click)="getDirections()">\n            <ion-icon name="navigate"></ion-icon>\n        </button>\n    </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/stanimir/royalEstates/src/pages/map/map.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_elite_api_elite_api__["a" /* EliteApiProvider */]])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SimilarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_elite_api_elite_api__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SimilarPage = /** @class */ (function () {
    function SimilarPage(navCtrl, navParams, eliteApi, loadingController) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.eliteApi = eliteApi;
        this.loadingController = loadingController;
        this.estates = [];
        this.estate = {};
        this._location = {};
        this.locationFilter = 'all';
        this.currentEstates = [];
    }
    SimilarPage.prototype.ionViewDidLoad = function () {
        this.declareEstates();
    };
    SimilarPage.prototype.declareEstates = function () {
        var _this = this;
        var selectedLocation = this.eliteApi.getCurrentLocation(); //this.navParams.data;
        this.selectedPublicLocation = this.eliteApi.getCurrentLocation();
        this.publicSelectedLocation = this.navParams.data;
        this.estate = this.navParams.get('estate');
        this.selectedPublicRegion = this.estate.region;
        this._location = this.navParams.get('locations-data');
        var _getCur = this.eliteApi.getCurrentLocation();
        // console.log('this.estate------>> ' + JSON.stringify(this.estate));
        // console.log('this._location------>> ' + JSON.stringify(this._location));
        // console.log('selectedLocation------>> ' + JSON.stringify(selectedLocation));
        // console.log('publicSelectedLocation------>> ' + JSON.stringify(this.publicSelectedLocation));
        // console.log('_getCur------>> ' + JSON.stringify(_getCur));
        // console.log('selectedPublicRegion---------->' + this.selectedPublicRegion);
        var loader = this.loadingController.create({
            content: 'Getting data...'
        });
        this.eliteApi.getLocationData(selectedLocation.location.id).subscribe(function (data) {
            _this.allEstates = data.estates;
            // subdivide the estates into regions
            _this.allEstateRegions =
                __WEBPACK_IMPORTED_MODULE_4_lodash__["chain"](data.estates)
                    .groupBy('region')
                    .toPairs()
                    .map(function (item) { return __WEBPACK_IMPORTED_MODULE_4_lodash__["zipObject"](['regionName', 'regionEstates'], item); })
                    .value();
            _this.estates = _this.allEstateRegions;
            console.log('this.estates------>> ' + JSON.stringify(_this.estates));
            loader.dismiss();
        });
    };
    SimilarPage.prototype.itemTapped = function ($event, estate) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages__["b" /* EstateHomePage */], { estate: estate });
    };
    SimilarPage.prototype.updateEstates = function () {
        var queryTextLower = this.queryText.toLowerCase();
        var filteredEstates = [];
        __WEBPACK_IMPORTED_MODULE_4_lodash__["forEach"](this.allEstateRegions, function (td) {
            var estates = __WEBPACK_IMPORTED_MODULE_4_lodash__["filter"](td.regionEstates, function (t) { return t.name.toLowerCase().includes(queryTextLower); });
            if (estates.length) {
                filteredEstates.push({ regionName: td.regionName, regionEstates: estates });
            }
        });
        this.estates = filteredEstates;
    };
    SimilarPage.prototype.trasFilter = function (category, tog) {
        this.declareEstates();
        var togg = tog;
        console.log('Toggled? ' + togg);
        var val = category;
        console.log('Value: ' + val);
        if (!togg) {
            return;
        }
        else {
            if (val !== '') {
                this.estates.forEach(function (region, i) {
                    region.regionEstates = region.regionEstates.filter(function (imot) {
                        return imot.type == val;
                    });
                });
                this.estates = this.estates.filter(function (reg) {
                    return reg.regionEstates.length > 0;
                });
            }
            console.log('filtered estates: ' + JSON.stringify(this.estates));
        }
    };
    SimilarPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-similar',template:/*ion-inline-start:"/home/stanimir/royalEstates/src/pages/similar/similar.html"*/'<ion-header>\n  <ion-navbar></ion-navbar>\n  <ion-toolbar>\n      <ion-segment secondary [(ngModel)]="locationFilter">\n          <ion-segment-button value="location">\n              Region\n          </ion-segment-button>\n          <ion-segment-button value="all">\n              All\n          </ion-segment-button>\n\n      </ion-segment>\n</ion-toolbar>\n</ion-header>\n\n<ion-content>\n    <ion-card>\n        <ion-card-content>\n            <ion-item>\n                <ion-label>Filter By Type: {{value}}</ion-label>\n                <ion-select [(ngModel)]="typeFilter" (ionChange)="trasFilter(typeFilter, toggleFlag)">\n                    <ion-option value="Apartment">Apartment</ion-option>\n                    <ion-option value="House">House</ion-option>\n                    <ion-option value="Studio">Studio</ion-option>\n                </ion-select>\n                <ion-toggle [(ngModel)]="toggleFlag" (ionChange)="trasFilter(typeFilter, toggleFlag)" end color=“secondary” checked=“false” ></ion-toggle>\n            </ion-item>            \n        </ion-card-content>\n    </ion-card>\n\n    <div [ngSwitch]="locationFilter">\n        <ion-list *ngSwitchCase="\'location\'">\n            <ion-item-group *ngFor="let region of estates">\n                \n                <ng-container *ngIf=\'selectedPublicRegion == region.regionName\'>\n                    <ion-item-divider color="secondary" >{{region.regionName}}</ion-item-divider>\n                    <button ion-item *ngFor="let estate of region.regionEstates" (click)="itemTapped($event, estate)">\n                        \n                        <ion-thumbnail item-start>\n                            <img src= {{estate.image}}>\n                        </ion-thumbnail>\n                \n                        <h2>Ref No. {{estate.refNumber}}</h2>\n                        <p>{{estate.type}}, {{estate.bedrooms}} Bedrooms</p>\n                        <p>{{selectedPublicLocation.location.name}}, {{estate.region}}</p>\n                        \n                    </button>\n                </ng-container>     \n\n            </ion-item-group>\n        </ion-list>\n        \n        <ion-list *ngSwitchCase="\'all\'">\n            <ion-item-group *ngFor="let region of estates">\n\n                <ion-item-divider color="secondary" >{{region.regionName}}</ion-item-divider>\n                <button ion-item *ngFor="let estate of region.regionEstates" (click)="itemTapped($event, estate)">\n                    \n                    <ion-thumbnail item-start>\n                        <img src= {{estate.image}}>\n                    </ion-thumbnail>\n            \n                    <h2>Ref No. {{estate.refNumber}}</h2>\n                    <p>{{estate.type}}, {{estate.bedrooms}} Bedrooms</p>\n                    <p>{{selectedPublicLocation.location.name}}, {{estate.region}}</p>\n\n                </button>\n\n            </ion-item-group>                    \n        </ion-list>\n    </div>    \n    \n</ion-content>'/*ion-inline-end:"/home/stanimir/royalEstates/src/pages/similar/similar.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_elite_api_elite_api__["a" /* EliteApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], SimilarPage);
    return SimilarPage;
}());

//# sourceMappingURL=similar.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(463);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EliteApiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__ = __webpack_require__(717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(718);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__(719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(720);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_of__ = __webpack_require__(721);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_of__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { Observable } from 'rxjs/Observable';






var EliteApiProvider = /** @class */ (function () {
    function EliteApiProvider(http) {
        this.http = http;
        this.baseUrl = 'https://royal-estates-app-c7ec1.firebaseio.com/';
        this.currentLocation = {};
        this.locationData = {};
        console.log('Hello EliteApiProvider Provider');
    }
    EliteApiProvider.prototype.getLocations = function () {
        return this.http.get(this.baseUrl + "/locations.json")
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    EliteApiProvider.prototype.getLocationData = function (locationId, forceRefresh) {
        var _this = this;
        if (forceRefresh === void 0) { forceRefresh = false; }
        if (!forceRefresh && this.locationData[locationId]) {
            this.currentLocation = this.locationData[locationId];
            console.log('**no need to make HTTP call, just return the data');
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].of(this.currentLocation);
        }
        // don't have data yet
        console.log('**about to make HTTP call');
        return this.http.get(this.baseUrl + "/locations-data/" + locationId + ".json")
            .map(function (response) {
            _this.locationData[locationId] = response;
            _this.currentLocation = _this.locationData[locationId];
            return _this.currentLocation;
        });
    };
    EliteApiProvider.prototype.refreshCurrentLocation = function () {
        return this.getLocationData(this.currentLocation.location.id, true);
    };
    EliteApiProvider.prototype.handleError = function (err) {
        console.error(err);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(err);
    };
    EliteApiProvider.prototype.getCurrentLocation = function () {
        return this.currentLocation;
    };
    EliteApiProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], EliteApiProvider);
    return EliteApiProvider;
}());

//# sourceMappingURL=elite-api.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agm_core__ = __webpack_require__(740);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(753);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_pages__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_elite_api_elite_api__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_user_settings_user_settings__ = __webpack_require__(92);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_pages__["f" /* MyEstatesPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_pages__["a" /* EstateDetailPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_pages__["c" /* EstatesPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_pages__["b" /* EstateHomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_pages__["d" /* LocationsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_pages__["e" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_pages__["g" /* SimilarPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/estate-detail/estate-detail.module#EstateDetailPageModule', name: 'EstateDetailPage', segment: 'estate-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/estate-home/estate-home.module#EstateHomePageModule', name: 'EstateHomePage', segment: 'estate-home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/estates/estates.module#EstatesPageModule', name: 'EstatesPage', segment: 'estates', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/locations/locations.module#LocationsPageModule', name: 'LocationsPage', segment: 'locations', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/map/map.module#MapPageModule', name: 'MapPage', segment: 'map', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/my-estates/my-estates.module#MyEstatesPageModule', name: 'MyEstatesPage', segment: 'my-estates', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/similar/similar.module#SimilarPageModule', name: 'SimilarPage', segment: 'similar', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: 'AIzaSyAi91xerL_8t_7tnCR7GstQ2W0uxUT6ILk'
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_pages__["f" /* MyEstatesPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_pages__["a" /* EstateDetailPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_pages__["c" /* EstatesPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_pages__["b" /* EstateHomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_pages__["d" /* LocationsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_pages__["e" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_pages__["g" /* SimilarPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_11__providers_elite_api_elite_api__["a" /* EliteApiProvider */],
                __WEBPACK_IMPORTED_MODULE_12__providers_user_settings_user_settings__["a" /* UserSettingsProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__my_estates_my_estates__ = __webpack_require__(338);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__my_estates_my_estates__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__estate_detail_estate_detail__ = __webpack_require__(336);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__estate_detail_estate_detail__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__estates_estates__ = __webpack_require__(339);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__estates_estates__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__locations_locations__ = __webpack_require__(340);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__locations_locations__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__estate_home_estate_home__ = __webpack_require__(337);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__estate_home_estate_home__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__map_map__ = __webpack_require__(341);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__map_map__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__similar_similar__ = __webpack_require__(342);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__similar_similar__["a"]; });







//# sourceMappingURL=pages.js.map

/***/ }),

/***/ 745:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_pages__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_user_settings_user_settings__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_elite_api_elite_api__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, userSettings, loadingController, eliteApi, events) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.userSettings = userSettings;
        this.loadingController = loadingController;
        this.eliteApi = eliteApi;
        this.events = events;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_pages__["f" /* MyEstatesPage */];
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.events.subscribe('favorites:changed', function () { return _this.refreshFavorites(); });
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.goHome = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__pages_pages__["f" /* MyEstatesPage */]);
    };
    MyApp.prototype.goToLocations = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__pages_pages__["d" /* LocationsPage */]);
    };
    MyApp.prototype.refreshFavorites = function () {
        var _this = this;
        this.userSettings.getAllFavorites().then(function (favs) { return _this.favoriteEstates = favs; });
        console.log('test ' + JSON.stringify(this.favoriteEstates));
    };
    MyApp.prototype.goToEstate = function (favorite) {
        var _this = this;
        var loader = this.loadingController.create({
            content: 'Getting data...',
            dismissOnPageChange: true
        });
        loader.present();
        this.eliteApi.getLocationData(favorite.tournamentId).subscribe(function (l) { return _this.nav.push(__WEBPACK_IMPORTED_MODULE_4__pages_pages__["b" /* EstateHomePage */], favorite.estate); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/stanimir/royalEstates/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Royal Estates</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n        <ion-list-header>Navigate</ion-list-header>\n        <button menuClose ion-item  (click)="goHome()">Home</button>\n        <button menuClose ion-item  (click)="goToLocations()">Find a Location</button>\n    </ion-list>\n    <ion-list>\n        <ion-list-header>Favorites</ion-list-header>\n        <button menuClose ion-item *ngFor="let fav of favoriteEstates" (click)="goToEstate(fav)">\n          {{fav.estate.name}}\n        </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/home/stanimir/royalEstates/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5__providers_user_settings_user_settings__["a" /* UserSettingsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_elite_api_elite_api__["a" /* EliteApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 753:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = /** @class */ (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage.prototype.sayHello = function () {
        console.log("Hello, World!");
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/stanimir/royalEstates/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>Ionic Menu Starter</h3>\n  <button ion-button (click)="sayHello()">Hello</button>\n  <p>\n    If you get lost, the <a href="http://ionicframework.com/docs/v2">docs</a> will show you the way.\n  </p>\n\n  <button ion-button secondary menuToggle>Toggle Menu</button>\n</ion-content>\n'/*ion-inline-end:"/home/stanimir/royalEstates/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserSettingsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserSettingsProvider = /** @class */ (function () {
    function UserSettingsProvider(storage, events) {
        this.storage = storage;
        this.events = events;
    }
    UserSettingsProvider.prototype.favoriteEstate = function (estate, locationId, locationName) {
        var _this = this;
        var item = { estate: estate, locationId: locationId, locationName: locationName };
        this.storage.set(estate.id.toString(), JSON.stringify(item)).then(function () {
            _this.events.publish('favorites:changed');
        });
    };
    UserSettingsProvider.prototype.unfavoriteEstate = function (estate) {
        this.storage.remove(estate.id.toString());
        this.events.publish('favorites:changed');
    };
    UserSettingsProvider.prototype.isFavoriteEstate = function (estateId) {
        return this.storage.get(estateId.toString()).then(function (value) { return value ? true : false; });
    };
    UserSettingsProvider.prototype.getAllFavorites = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var results = [];
            _this.storage.forEach(function (data) {
                results.push(JSON.parse(data));
            });
            return resolve(results);
        });
    };
    UserSettingsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* Events */]])
    ], UserSettingsProvider);
    return UserSettingsProvider;
}());

//# sourceMappingURL=user-settings.js.map

/***/ })

},[343]);
//# sourceMappingURL=main.js.map