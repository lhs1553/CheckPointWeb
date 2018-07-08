import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationHttpClient } from '../../../util/http.client';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CookieStoreService } from '../../../util/cookie-store';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  @Input() visible: boolean;
  @Output() onHide: EventEmitter<any> = new EventEmitter<any>();
  @Output() logout: EventEmitter<any> = new EventEmitter<any>();
  @Output() refresh: EventEmitter<any> = new EventEmitter<any>();

  importMenuView:boolean=false;

  constructor(public http: ApplicationHttpClient , private cookieStore:CookieStoreService) {
  }

  ngOnInit() {
  }

  refreshClick(){
    this.refresh.emit();
    this.hide();
  }

  getServerUrl() {
    let serverInfo = this.cookieStore.getServerInfo();
    if(!serverInfo ){
      return "";
    }
    return serverInfo.baseUrl;
  }

  selectLogout() {
    this.hide();
    this.logout.emit();
  }
  downloadJson() {
    this.http.fileDownload("/download/api/json/all");
    this.hide();
  }
  downloadExcel() {
    this.http.fileDownload("/download/api/excel/all");
    this.hide();
  }

  importJson(){
    this.importMenuView = true;
  }
  hide() {
    this.visible = false;
    this.onHide.emit();
  }
}
