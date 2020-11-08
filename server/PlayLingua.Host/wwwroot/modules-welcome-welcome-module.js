(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-welcome-welcome-module"],{

/***/ "./src/app/modules/welcome/welcome-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/modules/welcome/welcome-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: WelcomeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomeRoutingModule", function() { return WelcomeRoutingModule; });
/* harmony import */ var _welcome_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./welcome.component */ "./src/app/modules/welcome/welcome.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");





const routes = [
    {
        path: '',
        component: _welcome_component__WEBPACK_IMPORTED_MODULE_0__["WelcomeComponent"],
    },
];
class WelcomeRoutingModule {
}
WelcomeRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: WelcomeRoutingModule });
WelcomeRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function WelcomeRoutingModule_Factory(t) { return new (t || WelcomeRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](WelcomeRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](WelcomeRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/modules/welcome/welcome.component.ts":
/*!******************************************************!*\
  !*** ./src/app/modules/welcome/welcome.component.ts ***!
  \******************************************************/
/*! exports provided: WelcomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomeComponent", function() { return WelcomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class WelcomeComponent {
    constructor() { }
    ngOnInit() {
    }
}
WelcomeComponent.ɵfac = function WelcomeComponent_Factory(t) { return new (t || WelcomeComponent)(); };
WelcomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: WelcomeComponent, selectors: [["app-welcome"]], decls: 14, vars: 0, consts: [[1, "welcome-body"], [1, "title-container"], [1, "title-header"], [1, "motto"], ["routerLink", "../main", 1, "start-button"], [1, "admin-button"]], template: function WelcomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " Play-Lingua");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Play & Learn a New Language!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Let's Get Started!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Admin");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLink"]], styles: [".welcome-body[_ngcontent-%COMP%] {\n  height: 100vh;\n  width: 100%;\n  background-image: url('welcome-background.png');\n  background-size: cover;\n  background-position: center center;\n  background-attachment: fixed;\n  position: relative;\n}\n\n.title-container[_ngcontent-%COMP%] {\n  background-color: #FFFFFF;\n  color: #F5612C;\n  position: absolute;\n  top: 1%;\n  left: 1%;\n  padding: 1%;\n  border-radius: 10px;\n  box-shadow: 10px 10px 10px rgba(245, 97, 44, 0.5);\n}\n\n.title-header[_ngcontent-%COMP%] {\n  font-size: 3vw;\n  margin-bottom: 7%;\n}\n\n.motto[_ngcontent-%COMP%] {\n  font-size: 2vw;\n}\n\n.start-button[_ngcontent-%COMP%] {\n  background-color: #F5612C;\n  color: #FFFFFF;\n  font-size: 1.7vw;\n  position: absolute;\n  top: 60%;\n  left: 3%;\n  padding: 2%;\n  border-radius: 10px;\n  box-shadow: 10px 10px 10px #f7b457;\n  cursor: pointer;\n  outline: none;\n}\n\n.start-button[_ngcontent-%COMP%]:hover {\n  background-color: #FFFFFF;\n  color: #F5612C;\n  border: #F5612C 2px solid;\n}\n\n.admin-button[_ngcontent-%COMP%] {\n  font-size: 1vw;\n  position: absolute;\n  top: 5%;\n  right: 4%;\n  padding: 5px;\n  border-radius: 10px;\n  background-color: #F5612C;\n  color: #FFFFFF;\n  cursor: pointer;\n  box-shadow: 10px 10px 10px #f7b457;\n}\n\n.admin-button[_ngcontent-%COMP%]:hover {\n  background-color: #FFFFFF;\n  color: #F5612C;\n  border: #F5612C 1px solid;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy93ZWxjb21lL3dlbGNvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7RUFDSSxhQUFBO0VBQ0EsV0FBQTtFQUNBLCtDQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQ0FBQTtFQUNBLDRCQUFBO0VBQ0Esa0JBQUE7QUFGSjs7QUFLQTtFQUNJLHlCQVpTO0VBYVQsY0FmVztFQWdCWCxrQkFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsaURBQUE7QUFGSjs7QUFLQTtFQUNJLGNBQUE7RUFDQSxpQkFBQTtBQUZKOztBQUtBO0VBQ0ksY0FBQTtBQUZKOztBQUtBO0VBQ0kseUJBbENXO0VBbUNYLGNBakNTO0VBa0NULGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsUUFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGtDQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7QUFGSjs7QUFLQTtFQUNJLHlCQTlDUztFQStDVCxjQWpEVztFQWtEWCx5QkFBQTtBQUZKOztBQUtBO0VBQ0ksY0FBQTtFQUNBLGtCQUFBO0VBQ0EsT0FBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSx5QkE1RFc7RUE2RFgsY0EzRFM7RUE0RFQsZUFBQTtFQUNBLGtDQUFBO0FBRko7O0FBS0E7RUFDSSx5QkFqRVM7RUFrRVQsY0FwRVc7RUFxRVgseUJBQUE7QUFGSiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvd2VsY29tZS93ZWxjb21lLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiJG9yYW5nZS1jb2xvcjogI0Y1NjEyQztcclxuJGJsdWUtY29sb3I6ICMyREFEQjc7XHJcbiR3aGl0ZS1jb2xvcjojRkZGRkZGO1xyXG4ud2VsY29tZS1ib2R5IHtcclxuICAgIGhlaWdodDogMTAwdmg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi8uLi8uLi9hc3NldHMvaW1hZ2VzL2JhY2tncm91bmQvd2VsY29tZS1iYWNrZ3JvdW5kLnBuZyk7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcclxuICAgIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbi50aXRsZS1jb250YWluZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHdoaXRlLWNvbG9yO1xyXG4gICAgY29sb3I6ICRvcmFuZ2UtY29sb3I7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDElO1xyXG4gICAgbGVmdDogMSU7XHJcbiAgICBwYWRkaW5nOiAxJTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBib3gtc2hhZG93OiAxMHB4IDEwcHggMTBweCByZ2IoMjQ1LCA5NywgNDQsIDAuNSk7XHJcbn1cclxuXHJcbi50aXRsZS1oZWFkZXIge1xyXG4gICAgZm9udC1zaXplOiAzdnc7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA3JTtcclxufVxyXG5cclxuLm1vdHRvIHtcclxuICAgIGZvbnQtc2l6ZTogMnZ3O1xyXG59XHJcblxyXG4uc3RhcnQtYnV0dG9uIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICRvcmFuZ2UtY29sb3I7XHJcbiAgICBjb2xvcjogJHdoaXRlLWNvbG9yO1xyXG4gICAgZm9udC1zaXplOiAxLjd2dztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNjAlO1xyXG4gICAgbGVmdDogMyU7XHJcbiAgICBwYWRkaW5nOiAyJTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBib3gtc2hhZG93OiAxMHB4IDEwcHggMTBweCByZ2IoMjQ3LCAxODAsIDg3KTtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbn1cclxuXHJcbi5zdGFydC1idXR0b246aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHdoaXRlLWNvbG9yO1xyXG4gICAgY29sb3I6ICRvcmFuZ2UtY29sb3I7XHJcbiAgICBib3JkZXI6ICRvcmFuZ2UtY29sb3IgMnB4IHNvbGlkO1xyXG59XHJcblxyXG4uYWRtaW4tYnV0dG9uIHtcclxuICAgIGZvbnQtc2l6ZTogMXZ3O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA1JTtcclxuICAgIHJpZ2h0OiA0JTtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkb3JhbmdlLWNvbG9yO1xyXG4gICAgY29sb3I6ICR3aGl0ZS1jb2xvcjtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIGJveC1zaGFkb3c6IDEwcHggMTBweCAxMHB4IHJnYigyNDcsIDE4MCwgODcpO1xyXG59XHJcblxyXG4uYWRtaW4tYnV0dG9uOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICR3aGl0ZS1jb2xvcjtcclxuICAgIGNvbG9yOiAkb3JhbmdlLWNvbG9yO1xyXG4gICAgYm9yZGVyOiAkb3JhbmdlLWNvbG9yIDFweCBzb2xpZDtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](WelcomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-welcome',
                templateUrl: './welcome.component.html',
                styleUrls: ['./welcome.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/modules/welcome/welcome.module.ts":
/*!***************************************************!*\
  !*** ./src/app/modules/welcome/welcome.module.ts ***!
  \***************************************************/
/*! exports provided: WelcomeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomeModule", function() { return WelcomeModule; });
/* harmony import */ var _welcome_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./welcome-routing.module */ "./src/app/modules/welcome/welcome-routing.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _welcome_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./welcome.component */ "./src/app/modules/welcome/welcome.component.ts");





class WelcomeModule {
}
WelcomeModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: WelcomeModule });
WelcomeModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function WelcomeModule_Factory(t) { return new (t || WelcomeModule)(); }, imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _welcome_routing_module__WEBPACK_IMPORTED_MODULE_0__["WelcomeRoutingModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](WelcomeModule, { declarations: [_welcome_component__WEBPACK_IMPORTED_MODULE_3__["WelcomeComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _welcome_routing_module__WEBPACK_IMPORTED_MODULE_0__["WelcomeRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](WelcomeModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [_welcome_component__WEBPACK_IMPORTED_MODULE_3__["WelcomeComponent"]],
                imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _welcome_routing_module__WEBPACK_IMPORTED_MODULE_0__["WelcomeRoutingModule"]],
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=modules-welcome-welcome-module.js.map