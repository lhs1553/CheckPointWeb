import { Component, OnInit, ViewChild } from '@angular/core';
import { ReqUrl } from 'src/app/setting/domain/req-url';
import { UrlDetailComponent } from 'src/app/setting/url-detail/url-detail.component';
import { ApplicationHttpClient } from '../../util/http.client';
import { UrlListComponent } from '../url-list/url-list.component';
import { CookieStoreService } from '../../util/cookie-store';
import { ServerInfo } from './login/server-info';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selectUrl:ReqUrl=new ReqUrl();
  session:boolean;
  menuView:boolean=false;
  

  @ViewChild(UrlDetailComponent) UrlDetailComponent:UrlDetailComponent;
  @ViewChild(UrlListComponent) UrlListComponent:UrlListComponent;

  constructor(private cookieStore:CookieStoreService){ }

  ngOnInit() {
  }

  openMenu(){
    this.menuView = true;
  }

  getBaseUrl(){
    let serverinfo = this.cookieStore.getServerInfo();

    if(!serverinfo ){ return '' }
    return serverinfo.baseUrl;
  }

  logout(){
    let serverInfo:ServerInfo = this.cookieStore.getServerInfo();
    if(serverInfo){
      serverInfo.token = null;
    }
    this.cookieStore.setServerInfo(serverInfo)

    this.session = false;
    this.refresh();
  }

  refresh() {
    this.UrlListComponent.refresh();
    this.UrlDetailComponent.refresh();
  }
  loginSuccesss() {
    this.session = true;
    this.refresh();
  }

 

  urlChange(url: ReqUrl) {
    if (!url) {
      this.UrlDetailComponent.refresh();
    }
    else {
      this.UrlDetailComponent.refreshUrl(url);
    }
  }
}

