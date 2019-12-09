/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "./navbar.component";
import * as i2 from "../../services/notes-data/notes-data.service";
var styles_NavbarComponent = [];
var RenderType_NavbarComponent = i0.ɵcrt({ encapsulation: 2, styles: styles_NavbarComponent, data: {} });
export { RenderType_NavbarComponent as RenderType_NavbarComponent };
export function View_NavbarComponent_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 9, "header", [], null, null, null, null, null)), (_l()(), i0.ɵeld(1, 0, null, null, 8, "div", [["class", "container navbar"]], null, null, null, null, null)), (_l()(), i0.ɵeld(2, 0, null, null, 1, "h1", [["class", "navbar-brand text-primary"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["Serverless Notes App"])), (_l()(), i0.ɵeld(4, 0, null, null, 5, "ul", [["class", "nav"]], null, null, null, null, null)), (_l()(), i0.ɵeld(5, 0, null, null, 4, "li", [["class", "nav-item"]], null, null, null, null, null)), (_l()(), i0.ɵeld(6, 0, null, null, 3, "button", [["class", "btn btn-primary"], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onShowNoteModal($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵeld(7, 0, null, null, 0, "i", [["class", "fas fa-edit"]], null, null, null, null, null)), (_l()(), i0.ɵeld(8, 0, null, null, 1, "span", [["class", "button-text"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["Add Note"]))], null, null); }
export function View_NavbarComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "app-navbar", [], null, null, null, View_NavbarComponent_0, RenderType_NavbarComponent)), i0.ɵdid(1, 114688, null, 0, i1.NavbarComponent, [i2.NotesDataService], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var NavbarComponentNgFactory = i0.ɵccf("app-navbar", i1.NavbarComponent, View_NavbarComponent_Host_0, {}, { showNoteModalEvent: "showNoteModalEvent", signOutUserEvent: "signOutUserEvent" }, []);
export { NavbarComponentNgFactory as NavbarComponentNgFactory };
