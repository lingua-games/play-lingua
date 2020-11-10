(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-main-main-module"],{

/***/ "./src/app/core/models/Mario.model.ts":
/*!********************************************!*\
  !*** ./src/app/core/models/Mario.model.ts ***!
  \********************************************/
/*! exports provided: MarioModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarioModel", function() { return MarioModel; });
class MarioModel {
    constructor() { }
    setStyle(style) {
        this.style = style;
    }
    moveLeft(distance) {
        distance = distance || 1;
        const left = parseInt(this.style.left, null);
        if (left >= distance) {
            this.style.left = left - distance + '%';
        }
        else {
            this.style.left = '0%';
        }
    }
    moveRight(distance) {
        distance = distance || 1;
        const right = parseInt(this.style.left, null);
        if (right + parseInt(this.style.width, null) + distance < 100) {
            this.style.left = right + distance + '%';
        }
        else {
            this.style.left = 100 - parseInt(this.style.width, null) + '%';
        }
    }
    jump(height) {
        if (this.isJumping) {
            return;
        }
        height = height || 30;
        this.originalBottom = this.style.bottom;
        this.isJumping = true;
        const interval = setInterval(() => {
            this.style.bottom = parseInt(this.style.bottom, null) + 1 + '%';
            if (parseInt(this.style.bottom, null) >=
                height + parseInt(this.originalBottom, null)) {
                clearInterval(interval);
                this.comeDown();
            }
        }, 10);
    }
    comeDown() {
        const interval = setInterval(() => {
            if (parseInt(this.style.bottom, null) <= parseInt(this.originalBottom, null)) {
                clearInterval(interval);
                this.isJumping = false;
                return;
            }
            this.style.bottom = parseInt(this.style.bottom, null) - 1 + '%';
        }, 10);
    }
}


/***/ }),

/***/ "./src/app/core/models/mario-enemy.model.ts":
/*!**************************************************!*\
  !*** ./src/app/core/models/mario-enemy.model.ts ***!
  \**************************************************/
/*! exports provided: MarioEnemy, MarioEnemyStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarioEnemy", function() { return MarioEnemy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarioEnemyStatus", function() { return MarioEnemyStatus; });
class MarioEnemy {
}
var MarioEnemyStatus;
(function (MarioEnemyStatus) {
    MarioEnemyStatus[MarioEnemyStatus["WaitingForStart"] = -1] = "WaitingForStart";
    MarioEnemyStatus[MarioEnemyStatus["Start"] = 0] = "Start";
    MarioEnemyStatus[MarioEnemyStatus["IsMoving"] = 1] = "IsMoving";
    MarioEnemyStatus[MarioEnemyStatus["Finished"] = 2] = "Finished";
})(MarioEnemyStatus || (MarioEnemyStatus = {}));


/***/ }),

/***/ "./src/app/core/service/games.service.ts":
/*!***********************************************!*\
  !*** ./src/app/core/service/games.service.ts ***!
  \***********************************************/
/*! exports provided: GamesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GamesService", function() { return GamesService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");



class GamesService {
    constructor() {
    }
    getGameWords() {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])([
            'Apple',
            'Banana',
            'Orange',
            'Pineapple',
            'Cherry',
        ]);
    }
}
GamesService.ɵfac = function GamesService_Factory(t) { return new (t || GamesService)(); };
GamesService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: GamesService, factory: GamesService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GamesService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/modules/main/dashboard/dashboard.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/modules/main/dashboard/dashboard.component.ts ***!
  \***************************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




function DashboardComponent_div_4_img_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 7);
} if (rf & 2) {
    const gameMenu_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", gameMenu_r1.image, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
function DashboardComponent_div_4_span_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Coming soon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function DashboardComponent_div_4_span_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Play");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const gameMenu_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", gameMenu_r1.route);
} }
function DashboardComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, DashboardComponent_div_4_img_4_Template, 1, 1, "img", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, DashboardComponent_div_4_span_6_Template, 2, 0, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, DashboardComponent_div_4_span_7_Template, 2, 1, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const gameMenu_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", gameMenu_r1.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", gameMenu_r1.image);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !gameMenu_r1.isDesigned);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", gameMenu_r1.isDesigned);
} }
class DashboardComponent {
    constructor() {
        this.gameMenus = [];
    }
    ngOnInit() {
        this.gameMenus.push({
            name: 'Super Mario',
            image: './../../../../assets/images/GameMenu/super-mario.png',
            route: 'super-mario',
            isDesigned: true,
        });
        this.gameMenus.push({
            name: 'Falling Star',
            image: './../../../../assets/images/GameMenu/falling-star.png',
            route: 'falling-stars',
            isDesigned: true,
        });
        this.gameMenus.push({
            name: 'Game',
            image: './../../../../assets/images/GameMenu/game.jpg',
            isDesigned: false,
        });
        this.gameMenus.push({
            name: 'Game',
            image: './../../../../assets/images/GameMenu/game.jpg',
            isDesigned: false,
        });
        this.gameMenus.push({
            name: 'Game',
            image: './../../../../assets/images/GameMenu/game.jpg',
            isDesigned: false,
        });
        this.gameMenus.push({
            name: 'Game',
            image: './../../../../assets/images/GameMenu/game.jpg',
            isDesigned: false,
        });
        this.gameMenus.push({
            name: 'Game',
            image: './../../../../assets/images/GameMenu/game.jpg',
            isDesigned: false,
        });
        this.gameMenus.push({
            name: 'Game',
            image: './../../../../assets/images/GameMenu/game.jpg',
            isDesigned: false,
        });
    }
}
DashboardComponent.ɵfac = function DashboardComponent_Factory(t) { return new (t || DashboardComponent)(); };
DashboardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DashboardComponent, selectors: [["app-dashboard"]], decls: 5, vars: 1, consts: [[1, "game-menu-body"], [1, "title-container"], ["class", "game-container", 4, "ngFor", "ngForOf"], [1, "game-container"], ["class", "game-menu-images", 3, "src", 4, "ngIf"], ["class", "play-button", 4, "ngIf"], ["class", "play-button", 3, "routerLink", 4, "ngIf"], [1, "game-menu-images", 3, "src"], [1, "play-button"], [1, "play-button", 3, "routerLink"]], template: function DashboardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Select a game");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, DashboardComponent_div_4_Template, 8, 4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.gameMenus);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], styles: [".game-menu-body[_ngcontent-%COMP%] {\n  background-color: #2DADB7;\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n}\n\n.title-container[_ngcontent-%COMP%] {\n  color: #FFFFFF;\n  font-size: 2.5vw;\n  padding: 35px;\n  text-align: left;\n  border-bottom: solid 1px #FFFFFF;\n  margin-bottom: 1%;\n  width: 30%;\n}\n\n.game-container[_ngcontent-%COMP%] {\n  background-color: #FFFFFF;\n  color: #F5612C;\n  font-weight: 600;\n  text-align: center;\n  padding: 2%;\n  margin: 1.5% 0px 1.5% 4%;\n  width: 20%;\n  min-height: 40vh;\n  display: inline-block;\n  border-radius: 10px;\n  opacity: 0.8;\n}\n\n.game-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1.5vw;\n}\n\n.game-container[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n.game-menu-images[_ngcontent-%COMP%] {\n  width: 70%;\n  height: 25vh;\n  padding: 10%;\n  padding-bottom: 15%;\n}\n\n.play-button[_ngcontent-%COMP%] {\n  background-color: #F5612C;\n  color: #FFFFFF;\n  border-radius: 10px;\n  padding: 5px 15px 5px 15px;\n  box-shadow: 4px 10px 4px #f7b457;\n  cursor: pointer;\n  text-decoration: none;\n  font-size: 1.5vw;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7RUFDSSx5QkFIRztFQUlILFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QUFGSjs7QUFLQTtFQUNJLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGdDQUFBO0VBQ0EsaUJBQUE7RUFDQSxVQUFBO0FBRko7O0FBS0E7RUFDSSx5QkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLHdCQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFGSjs7QUFHSTtFQUNJLGdCQUFBO0FBRFI7O0FBS0E7RUFDSSxVQUFBO0FBRko7O0FBS0E7RUFDSSxVQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtBQUZKOztBQUtBO0VBQ0kseUJBakRLO0VBa0RMLGNBaERHO0VBaURILG1CQUFBO0VBQ0EsMEJBQUE7RUFDQSxnQ0FBQTtFQUNBLGVBQUE7RUFDQSxxQkFBQTtFQUNBLGdCQUFBO0FBRkoiLCJmaWxlIjoic3JjL2FwcC9tb2R1bGVzL21haW4vZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiRvcmFuZ2U6ICNGNTYxMkM7XHJcbiRibHVlOiAjMkRBREI3O1xyXG4kd2hpdGU6I0ZGRkZGRjtcclxuLmdhbWUtbWVudS1ib2R5IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICRibHVlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG59XHJcblxyXG4udGl0bGUtY29udGFpbmVyIHtcclxuICAgIGNvbG9yOiAjRkZGRkZGO1xyXG4gICAgZm9udC1zaXplOiAyLjV2dztcclxuICAgIHBhZGRpbmc6IDM1cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4ICNGRkZGRkY7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxJTtcclxuICAgIHdpZHRoOiAzMCU7XHJcbn1cclxuXHJcbi5nYW1lLWNvbnRhaW5lciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xyXG4gICAgY29sb3I6ICNGNTYxMkM7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgcGFkZGluZzogMiU7XHJcbiAgICBtYXJnaW46IDEuNSUgMHB4IDEuNSUgNCU7XHJcbiAgICB3aWR0aDogMjAlO1xyXG4gICAgbWluLWhlaWdodDogNDB2aDtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBvcGFjaXR5OiAwLjg7XHJcbiAgICBwIHtcclxuICAgICAgICBmb250LXNpemU6IDEuNXZ3O1xyXG4gICAgfVxyXG59XHJcblxyXG4uZ2FtZS1jb250YWluZXI6aG92ZXIge1xyXG4gICAgb3BhY2l0eTogMS4wO1xyXG59XHJcblxyXG4uZ2FtZS1tZW51LWltYWdlcyB7XHJcbiAgICB3aWR0aDogNzAlO1xyXG4gICAgaGVpZ2h0OiAyNXZoO1xyXG4gICAgcGFkZGluZzogMTAlO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDE1JTtcclxufVxyXG5cclxuLnBsYXktYnV0dG9uIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICRvcmFuZ2U7XHJcbiAgICBjb2xvcjogJHdoaXRlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIHBhZGRpbmc6IDVweCAxNXB4IDVweCAxNXB4O1xyXG4gICAgYm94LXNoYWRvdzogNHB4IDEwcHggNHB4IHJnYigyNDcsIDE4MCwgODcpO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgZm9udC1zaXplOiAxLjV2dztcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DashboardComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-dashboard',
                templateUrl: './dashboard.component.html',
                styleUrls: ['./dashboard.component.scss'],
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/modules/main/game/falling-stars/falling-stars.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/modules/main/game/falling-stars/falling-stars.component.ts ***!
  \****************************************************************************/
/*! exports provided: FallingStarsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FallingStarsComponent", function() { return FallingStarsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _core_service_games_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core/service/games.service */ "./src/app/core/service/games.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");






function FallingStarsComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Are you ready to start?");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FallingStarsComponent_div_1_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.startGame(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Start!");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function FallingStarsComponent_span_3_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("@fade.done", function FallingStarsComponent_span_3_span_1_Template_span_animation_fade_done_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const word_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.boxAnimationDone(word_r4); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const word_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@fade", word_r4.animating)("ngStyle", word_r4.style);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", word_r4.value, " ");
} }
function FallingStarsComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, FallingStarsComponent_span_3_span_1_Template, 2, 3, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const word_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", word_r4.animating);
} }
class FallingStarsComponent {
    constructor(gamesService) {
        this.gamesService = gamesService;
        this.words = [];
        this.scoreBoard = {};
    }
    ngOnInit() {
        this.getGameWords();
    }
    getGameWords() {
        this.words = [];
        this.gamesService.getGameWords().subscribe((res) => {
            this.scoreBoard.total = res.length;
            this.scoreBoard.correct = 0;
            res.forEach((element, index) => {
                this.words.push({
                    value: element,
                    // To get random 2 digit number
                    style: { left: `${this.getRandomNumber()}%` },
                    typingWord: '',
                    animating: false
                });
            });
        });
    }
    showReadyBox() {
        return !this.words.find(x => x.animating);
    }
    startGame() {
        this.words[0].animating = true;
    }
    boxAnimationDone(word) {
        word.animating = false;
        const index = this.words.indexOf(word);
        if (this.words.length === index + 1) {
            // It means the game is finish
        }
        else {
            this.words[index + 1].animating = true;
        }
    }
    getRandomNumber() {
        const result = Math.floor(Math.random() * 90 + 10);
        // If left of the object would be more than 95%,
        // then the object overflow from right side of the screen
        return result > 95 ? result - 10 : result;
    }
    checkTypingWord(event) {
        const activeWord = this.words.find(x => x.animating);
        if (event.toLowerCase() === activeWord.value.toLowerCase()) {
            this.scoreBoard.correct++;
            this.typingWord = '';
            this.boxAnimationDone(activeWord);
        }
    }
}
FallingStarsComponent.ɵfac = function FallingStarsComponent_Factory(t) { return new (t || FallingStarsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_core_service_games_service__WEBPACK_IMPORTED_MODULE_2__["GamesService"])); };
FallingStarsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FallingStarsComponent, selectors: [["app-falling-stars"]], decls: 17, vars: 5, consts: [[1, "game-board-container"], ["class", "ready-container", 4, "ngIf"], [1, "falling-container"], [4, "ngFor", "ngForOf"], [1, "text-center"], [1, "typing-container"], ["placeholder", "type the falling word", 1, "form-control", "mt-2", 3, "ngModel", "ngModelChange"], [1, "action-container", "m-2"], [1, "btn", "btn-primary"], [1, "btn", "btn-danger", "ml-1"], [1, "score-container"], [1, "ready-container"], [1, "btn", "btn-success", 3, "click"], ["class", "box", 3, "ngStyle", 4, "ngIf"], [1, "box", 3, "ngStyle"]], template: function FallingStarsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, FallingStarsComponent_div_1_Template, 5, 0, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, FallingStarsComponent_span_3_Template, 2, 1, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function FallingStarsComponent_Template_input_ngModelChange_6_listener($event) { return ctx.typingWord = $event; })("ngModelChange", function FallingStarsComponent_Template_input_ngModelChange_6_listener($event) { return ctx.checkTypingWord($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Reset");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Pause");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showReadyBox());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.words);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.typingWord);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Total: ", ctx.scoreBoard.total, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Correct: ", ctx.scoreBoard.correct, "");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgStyle"]], styles: [".game-board-container[_ngcontent-%COMP%] {\n  background-color: lightgrey;\n  width: 100%;\n  height: 100vh;\n}\n\n.falling-container[_ngcontent-%COMP%] {\n  height: 90%;\n  border-bottom: solid 1px;\n  position: relative;\n  overflow: hidden;\n}\n\n.typing-container[_ngcontent-%COMP%] {\n  text-align: center;\n  width: 30%;\n  left: 35%;\n  position: absolute;\n}\n\n.action-container[_ngcontent-%COMP%] {\n  float: left;\n}\n\n.box[_ngcontent-%COMP%] {\n  position: absolute;\n  border: solid 1px;\n  border-radius: 50%;\n  padding: 0.5rem;\n}\n\n.ready-container[_ngcontent-%COMP%] {\n  border: solid 1px gray;\n  position: absolute;\n  width: 30%;\n  top: 20%;\n  left: 35%;\n  text-align: center;\n  border-radius: 10px;\n  box-shadow: 10px 10px 10px red;\n  padding-top: 10px;\n  z-index: 150;\n}\n\n.ready-container[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin: 50px 0 10px 0;\n}\n\n.score-container[_ngcontent-%COMP%] {\n  float: right;\n  width: 30%;\n  text-align: left;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9tYWluL2dhbWUvZmFsbGluZy1zdGFycy9mYWxsaW5nLXN0YXJzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsMkJBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtBQUNGOztBQUVBO0VBQ0UsV0FBQTtFQUNBLHdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0FBQ0Y7O0FBQUU7RUFDRSxxQkFBQTtBQUVKOztBQUVBO0VBQ0UsWUFBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtBQUNGIiwiZmlsZSI6InNyYy9hcHAvbW9kdWxlcy9tYWluL2dhbWUvZmFsbGluZy1zdGFycy9mYWxsaW5nLXN0YXJzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmdhbWUtYm9hcmQtY29udGFpbmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyZXk7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxufVxyXG5cclxuLmZhbGxpbmctY29udGFpbmVyIHtcclxuICBoZWlnaHQ6IDkwJTtcclxuICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHg7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi50eXBpbmctY29udGFpbmVyIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgd2lkdGg6IDMwJTtcclxuICBsZWZ0OiAzNSU7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG59XHJcblxyXG4uYWN0aW9uLWNvbnRhaW5lciB7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbn1cclxuXHJcbi5ib3gge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBib3JkZXI6c29saWQgMXB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBwYWRkaW5nOiAuNXJlbTtcclxufVxyXG5cclxuLnJlYWR5LWNvbnRhaW5lciB7XHJcbiAgYm9yZGVyOiBzb2xpZCAxcHggZ3JheTtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgd2lkdGg6IDMwJTtcclxuICB0b3A6MjAlO1xyXG4gIGxlZnQ6IDM1JTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICBib3gtc2hhZG93OiAxMHB4IDEwcHggMTBweCByZWQ7XHJcbiAgcGFkZGluZy10b3A6IDEwcHg7XHJcbiAgei1pbmRleDogMTUwO1xyXG4gIC5idG4ge1xyXG4gICAgbWFyZ2luOiA1MHB4IDAgMTBweCAwO1xyXG4gIH1cclxufVxyXG5cclxuLnNjb3JlLWNvbnRhaW5lciB7XHJcbiAgZmxvYXQ6IHJpZ2h0O1xyXG4gIHdpZHRoOiAzMCU7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxufVxyXG4iXX0= */"], data: { animation: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('fade', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('void => true', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ top: '-10%' }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])(5000, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ top: '100%' }))
                ])
            ])
        ] } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FallingStarsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-falling-stars',
                templateUrl: './falling-stars.component.html',
                styleUrls: ['./falling-stars.component.scss'],
                animations: [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('fade', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('void => true', [
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ top: '-10%' }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])(5000, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ top: '100%' }))
                        ])
                    ])
                ]
            }]
    }], function () { return [{ type: _core_service_games_service__WEBPACK_IMPORTED_MODULE_2__["GamesService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/modules/main/game/super-mario/super-mario.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/modules/main/game/super-mario/super-mario.component.ts ***!
  \************************************************************************/
/*! exports provided: SuperMarioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuperMarioComponent", function() { return SuperMarioComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _core_models_Mario_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/models/Mario.model */ "./src/app/core/models/Mario.model.ts");
/* harmony import */ var _core_models_mario_enemy_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core/models/mario-enemy.model */ "./src/app/core/models/mario-enemy.model.ts");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _core_service_games_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../core/service/games.service */ "./src/app/core/service/games.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");







function SuperMarioComponent_div_3_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const enemy_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", enemy_r1.style);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", enemy_r1.text, " ");
} }
function SuperMarioComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, SuperMarioComponent_div_3_div_1_Template, 2, 2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const enemy_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", enemy_r1.status === 0);
} }
class SuperMarioComponent {
    constructor(gamesService) {
        this.gamesService = gamesService;
        this.mario = new _core_models_Mario_model__WEBPACK_IMPORTED_MODULE_1__["MarioModel"]();
        this.jumpHeight = 30;
    }
    keyDownEvent(event) {
        switch (event.code) {
            case 'ArrowLeft':
                this.startMovingLeft();
                break;
            case 'ArrowRight':
                this.startMovingRight();
                break;
            case 'Space':
                this.jump();
                break;
        }
    }
    keyUpEvent(event) {
        switch (event.code) {
            case 'ArrowLeft':
                this.stopMovingLeft();
                break;
            case 'ArrowRight':
                this.stopMovingRight();
                break;
        }
    }
    ngOnInit() {
        this.mario.setStyle({
            border: '1px solid',
            position: 'absolute',
            bottom: '10%',
            width: '2%',
            height: '5%',
            left: '10%',
            transition: '10ms',
        });
        this.startGame();
    }
    startGame() {
        this.getWords();
    }
    getWords() {
        this.enemies = [];
        this.gamesService.getGameWords().subscribe((res) => {
            res.forEach((element) => {
                this.enemies.push({
                    text: element,
                    status: _core_models_mario_enemy_model__WEBPACK_IMPORTED_MODULE_2__["MarioEnemyStatus"].WaitingForStart,
                    style: {
                        position: 'absolute',
                        // random number between floor and max top of the Mario
                        bottom: Math.floor(Math.random() * (this.jumpHeight + Math.abs(1) + 1)) +
                            10 +
                            '%',
                        left: '100%',
                        border: 'solid 1px gray',
                        borderRadius: '10%',
                        padding: '5px',
                        height: '5%',
                        width: '5%',
                        textAlign: 'center',
                    },
                });
            });
            this.startAnimating(this.enemies[0]);
        }, () => { });
    }
    // The method does not have test yet because it is not finalized.
    startAnimating(enemy) {
        enemy.status = _core_models_mario_enemy_model__WEBPACK_IMPORTED_MODULE_2__["MarioEnemyStatus"].Start;
        const animateInterval = setInterval(() => {
            enemy.style.transition = '100ms';
            enemy.style.left = (parseInt(enemy.style.left, null) -
                1 +
                '%').toString();
            // Managing left-right hit
            const enemyLeft = parseInt(enemy.style.left, null);
            const enemyRight = parseInt(enemy.style.left, null) + parseInt(enemy.style.width, null);
            const marioLeft = parseInt(this.mario.style.left, null);
            const marioRight = parseInt(this.mario.style.left, null) +
                parseInt(this.mario.style.width, null);
            const enemyTop = parseInt(enemy.style.bottom, null) + parseInt(enemy.style.height, null);
            const enemyButton = parseInt(enemy.style.bottom, null);
            const marioButton = parseInt(this.mario.style.bottom, null);
            const marioTop = marioButton + parseInt(this.mario.style.height, null);
            if (((marioLeft > enemyLeft && marioLeft < enemyRight) ||
                (marioRight > enemyLeft && marioRight < enemyRight)) &&
                ((marioTop < enemyTop && marioTop > enemyButton) ||
                    (marioButton < enemyTop && marioButton > enemyButton))) {
                clearInterval(animateInterval);
                const index = this.enemies.indexOf(enemy);
                if (index + 1 < this.enemies.length) {
                    enemy.status = _core_models_mario_enemy_model__WEBPACK_IMPORTED_MODULE_2__["MarioEnemyStatus"].Finished;
                    this.startAnimating(this.enemies[index + 1]);
                }
            }
            if (parseInt(enemy.style.left, null) <= -5) {
                clearInterval(animateInterval);
                const index = this.enemies.indexOf(enemy);
                if (index + 1 < this.enemies.length) {
                    enemy.status = _core_models_mario_enemy_model__WEBPACK_IMPORTED_MODULE_2__["MarioEnemyStatus"].Finished;
                    this.startAnimating(this.enemies[index + 1]);
                }
            }
        }, 50);
    }
    stopMovingLeft() {
        clearInterval(this.movingLeftInterval);
        this.movingLeftInterval = null;
    }
    startMovingLeft() {
        if (!this.movingLeftInterval) {
            this.movingLeftInterval = +setInterval(() => {
                this.mario.moveLeft(1);
            }, 30);
        }
    }
    stopMovingRight() {
        clearInterval(this.movingRightInterval);
        this.movingRightInterval = null;
    }
    startMovingRight() {
        if (!this.movingRightInterval) {
            this.movingRightInterval = +setInterval(() => {
                this.mario.moveRight(1);
            }, 30);
        }
    }
    jump() {
        this.mario.jump(this.jumpHeight);
    }
}
SuperMarioComponent.ɵfac = function SuperMarioComponent_Factory(t) { return new (t || SuperMarioComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_core_service_games_service__WEBPACK_IMPORTED_MODULE_4__["GamesService"])); };
SuperMarioComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SuperMarioComponent, selectors: [["app-super-mario"]], hostBindings: function SuperMarioComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keydown", function SuperMarioComponent_keydown_HostBindingHandler($event) { return ctx.keyDownEvent($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveDocument"])("keyup", function SuperMarioComponent_keyup_HostBindingHandler($event) { return ctx.keyUpEvent($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveDocument"]);
    } }, decls: 4, vars: 2, consts: [[1, "main-container", 2, "overflow", "hidden"], [1, "mario", 3, "ngStyle"], [1, "ground"], [4, "ngFor", "ngForOf"], [3, "ngStyle", 4, "ngIf"], [3, "ngStyle"]], template: function SuperMarioComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, SuperMarioComponent_div_3_Template, 2, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", ctx.mario.style);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.enemies);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgStyle"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"]], styles: [".main-container[_ngcontent-%COMP%] {\n  background-color: lightgrey;\n  height: 100vh;\n  width: 100%;\n  position: relative;\n}\n\n.ground[_ngcontent-%COMP%] {\n  border-bottom: 1px solid;\n  position: absolute;\n  top: 90%;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9tYWluL2dhbWUvc3VwZXItbWFyaW8vc3VwZXItbWFyaW8uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSwyQkFBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7QUFDRjs7QUFFQTtFQUNFLHdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsV0FBQTtBQUNGIiwiZmlsZSI6InNyYy9hcHAvbW9kdWxlcy9tYWluL2dhbWUvc3VwZXItbWFyaW8vc3VwZXItbWFyaW8uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbi1jb250YWluZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JleTtcclxuICBoZWlnaHQ6IDEwMHZoO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG5cclxuLmdyb3VuZCB7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDkwJTtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuIl19 */"], data: { animation: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["trigger"])('move', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])('void => true', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ right: '0' }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])(6000, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ right: '100%' })),
                ]),
            ]),
        ] } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SuperMarioComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-super-mario',
                templateUrl: './super-mario.component.html',
                styleUrls: ['./super-mario.component.scss'],
                animations: [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["trigger"])('move', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])('void => true', [
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ right: '0' }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])(6000, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ right: '100%' })),
                        ]),
                    ]),
                ],
            }]
    }], function () { return [{ type: _core_service_games_service__WEBPACK_IMPORTED_MODULE_4__["GamesService"] }]; }, { keyDownEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['document:keydown ', ['$event']]
        }], keyUpEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['document:keyup', ['$event']]
        }] }); })();


/***/ }),

/***/ "./src/app/modules/main/main-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/modules/main/main-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: MainRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainRoutingModule", function() { return MainRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _game_falling_stars_falling_stars_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game/falling-stars/falling-stars.component */ "./src/app/modules/main/game/falling-stars/falling-stars.component.ts");
/* harmony import */ var _main_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main.component */ "./src/app/modules/main/main.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/modules/main/dashboard/dashboard.component.ts");
/* harmony import */ var _game_super_mario_super_mario_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game/super-mario/super-mario.component */ "./src/app/modules/main/game/super-mario/super-mario.component.ts");








const routes = [
    {
        path: '',
        component: _main_component__WEBPACK_IMPORTED_MODULE_3__["MainComponent"],
        children: [
            {
                path: '',
                component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_4__["DashboardComponent"]
            },
            {
                path: 'falling-stars',
                component: _game_falling_stars_falling_stars_component__WEBPACK_IMPORTED_MODULE_2__["FallingStarsComponent"]
            },
            {
                path: 'super-mario',
                component: _game_super_mario_super_mario_component__WEBPACK_IMPORTED_MODULE_5__["SuperMarioComponent"]
            }
        ]
    },
];
class MainRoutingModule {
}
MainRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: MainRoutingModule });
MainRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function MainRoutingModule_Factory(t) { return new (t || MainRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](MainRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MainRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/modules/main/main.component.ts":
/*!************************************************!*\
  !*** ./src/app/modules/main/main.component.ts ***!
  \************************************************/
/*! exports provided: MainComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainComponent", function() { return MainComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class MainComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() { }
    showLeftSideMenu() {
        return this.router.url === '/home';
    }
}
MainComponent.ɵfac = function MainComponent_Factory(t) { return new (t || MainComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
MainComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MainComponent, selectors: [["app-main"]], decls: 1, vars: 0, template: function MainComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: [".left-side-container[_ngcontent-%COMP%] {\n  text-align: center;\n  display: inline-block;\n  width: 20%;\n  height: 100vh;\n  border-right: 1px solid;\n}\n\n.collapse-container[_ngcontent-%COMP%] {\n  position: fixed;\n  border: 1px solid #212f3c;\n  color: #212f3c;\n  padding: 0.5rem;\n  border-radius: 50%;\n  z-index: 100;\n}\n\n.collapse-container[_ngcontent-%COMP%]:hover {\n  background-color: #212f3c;\n  cursor: pointer;\n  color: white;\n}\n\n.collapse-container[_ngcontent-%COMP%] {\n  float: right;\n  margin: 20px;\n}\n\n.page-container[_ngcontent-%COMP%] {\n  display: flex;\n}\n\n.router-container[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 80%;\n  height: 100vh;\n  padding: 0px 10px;\n}\n\n.full-width-container[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0;\n}\n\n.menu-container[_ngcontent-%COMP%] {\n  border: solid 1px gray;\n  margin: 1rem;\n  padding: 0.5rem;\n  color: gray;\n}\n\n.menu-container[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n  color: white;\n  background-color: gray;\n}\n\n.menu-container[_ngcontent-%COMP%]:focus, .collapse-container[_ngcontent-%COMP%]:focus {\n  outline: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9tYWluL21haW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0EsVUFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtFQUNBLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7RUFDQSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRSxxQkFBQTtFQUNBLFVBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxVQUFBO0FBQ0Y7O0FBRUE7RUFDRSxzQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtBQUNGOztBQUVBO0VBQ0UsVUFBQTtBQUNGIiwiZmlsZSI6InNyYy9hcHAvbW9kdWxlcy9tYWluL21haW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubGVmdC1zaWRlLWNvbnRhaW5lciB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICB3aWR0aDogMjAlO1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQ7XHJcbn1cclxuXHJcbi5jb2xsYXBzZS1jb250YWluZXIge1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMzMsIDQ3LCA2MCk7XHJcbiAgY29sb3I6IHJnYigzMywgNDcsIDYwKTtcclxuICBwYWRkaW5nOiAuNXJlbTtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgei1pbmRleDogMTAwO1xyXG59XHJcblxyXG4uY29sbGFwc2UtY29udGFpbmVyOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzMsIDQ3LCA2MCk7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLmNvbGxhcHNlLWNvbnRhaW5lciB7XHJcbiAgZmxvYXQ6IHJpZ2h0O1xyXG4gIG1hcmdpbjogMjBweDtcclxufVxyXG5cclxuLnBhZ2UtY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcblxyXG4ucm91dGVyLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIHdpZHRoOiA4MCU7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxuICBwYWRkaW5nOiAwcHggMTBweDtcclxufVxyXG5cclxuLmZ1bGwtd2lkdGgtY29udGFpbmVyIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBwYWRkaW5nOiAwO1xyXG59XHJcblxyXG4ubWVudS1jb250YWluZXIge1xyXG4gIGJvcmRlcjogc29saWQgMXB4IGdyYXk7XHJcbiAgbWFyZ2luOiAxcmVtO1xyXG4gIHBhZGRpbmc6IC41cmVtO1xyXG4gIGNvbG9yOiBncmF5O1xyXG59XHJcblxyXG4ubWVudS1jb250YWluZXI6aG92ZXIge1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcclxufVxyXG5cclxuLm1lbnUtY29udGFpbmVyOmZvY3VzLCAuY29sbGFwc2UtY29udGFpbmVyOmZvY3VzIHtcclxuICBvdXRsaW5lOiAwO1xyXG59XHJcblxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MainComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-main',
                templateUrl: './main.component.html',
                styleUrls: ['./main.component.scss'],
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }]; }, null); })();


/***/ }),

/***/ "./src/app/modules/main/main.module.ts":
/*!*********************************************!*\
  !*** ./src/app/modules/main/main.module.ts ***!
  \*********************************************/
/*! exports provided: MainModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainModule", function() { return MainModule; });
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/modules/main/dashboard/dashboard.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _main_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main.component */ "./src/app/modules/main/main.component.ts");
/* harmony import */ var _main_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./main-routing.module */ "./src/app/modules/main/main-routing.module.ts");
/* harmony import */ var _game_falling_stars_falling_stars_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game/falling-stars/falling-stars.component */ "./src/app/modules/main/game/falling-stars/falling-stars.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/__ivy_ngcc__/fesm2015/angular-fontawesome.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _game_super_mario_super_mario_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./game/super-mario/super-mario.component */ "./src/app/modules/main/game/super-mario/super-mario.component.ts");
/* harmony import */ var _common_material_material_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../common/material/material.module */ "./src/app/modules/common/material/material.module.ts");













class MainModule {
    constructor(iconLibrary) {
        this.iconLibrary = iconLibrary;
        iconLibrary.addIcons(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__["faArrowLeft"]);
    }
}
MainModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: MainModule });
MainModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function MainModule_Factory(t) { return new (t || MainModule)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FaIconLibrary"])); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _main_routing_module__WEBPACK_IMPORTED_MODULE_4__["MainRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
            _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeModule"],
            _common_material_material_module__WEBPACK_IMPORTED_MODULE_10__["MaterialModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](MainModule, { declarations: [_main_component__WEBPACK_IMPORTED_MODULE_3__["MainComponent"],
        _game_falling_stars_falling_stars_component__WEBPACK_IMPORTED_MODULE_5__["FallingStarsComponent"],
        _game_super_mario_super_mario_component__WEBPACK_IMPORTED_MODULE_9__["SuperMarioComponent"],
        _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__["DashboardComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
        _main_routing_module__WEBPACK_IMPORTED_MODULE_4__["MainRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
        _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeModule"],
        _common_material_material_module__WEBPACK_IMPORTED_MODULE_10__["MaterialModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MainModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _main_component__WEBPACK_IMPORTED_MODULE_3__["MainComponent"],
                    _game_falling_stars_falling_stars_component__WEBPACK_IMPORTED_MODULE_5__["FallingStarsComponent"],
                    _game_super_mario_super_mario_component__WEBPACK_IMPORTED_MODULE_9__["SuperMarioComponent"],
                    _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__["DashboardComponent"],
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                    _main_routing_module__WEBPACK_IMPORTED_MODULE_4__["MainRoutingModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                    _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeModule"],
                    _common_material_material_module__WEBPACK_IMPORTED_MODULE_10__["MaterialModule"],
                ],
            }]
    }], function () { return [{ type: _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FaIconLibrary"] }]; }, null); })();


/***/ })

}]);
//# sourceMappingURL=modules-main-main-module.js.map