import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApplicationHttpClient } from '../../../util/http.client';
import { ServerInfo } from './server-info';
import { LoginInfo } from './login-info';
import { CookieStoreService } from '../../../util/cookie-store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() 
  loginSuccess :EventEmitter<any> = new EventEmitter<any>();

  @Input() session;

  loginInfo:LoginInfo = new LoginInfo('','');
  serverInfo:ServerInfo;


  constructor(public http :ApplicationHttpClient, private cookieStore:CookieStoreService) { }

  ngOnInit() {
    this.serverInfo= this.cookieStore.getServerInfo();
    if (!this.serverInfo) {
      this.serverInfo = new ServerInfo("http://localhost:8080", null);
    }else{
      this.loginToken();
    }
  }


  loginToken(){
    this.loginInfo.token = this.serverInfo.token;
    this.login(true);
  }

  login(serverToken:boolean){
    if (!this.loginInfo.token) { return; }

    this.http.post<any>("/auth", this.loginInfo).toPromise().then(res => {
      this.serverInfo.token = res.token;
      this.loginSuccess.emit(this.serverInfo);
      this.session = true;
      this.cookieStore.setServerInfo(this.serverInfo);
    }).catch(err => {
      this.loginInfo.token = '';
      this.serverInfo.token = null;
      this.cookieStore.setServerInfo(this.serverInfo);
      if (!serverToken) {
        alert("login fail ");
      }
    });

  }

  
}
