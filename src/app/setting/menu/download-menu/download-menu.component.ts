import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReqUrl } from '../../domain/req-url';
import { ApplicationHttpClient } from '../../../util/http.client';

@Component({
  selector: 'app-download-menu',
  templateUrl: './download-menu.component.html',
  styleUrls: ['./download-menu.component.css']
})
export class DownloadMenuComponent implements OnInit {

  @Input() reqUrl:ReqUrl;
  @Input() visible:boolean;
  @Output() onHide:EventEmitter<any>=new EventEmitter<any>();

  constructor(private http:ApplicationHttpClient) { }

  ngOnInit() {
  }

  downloadJson(){
    this.http.fileDownload("/download/api/json?method="+this.reqUrl.method + "&url=" + btoa(this.reqUrl.url))
    this.hide();
  }
  downloadExcel(){
    this.http.fileDownload("/download/api/excel?method="+this.reqUrl.method + "&url=" + btoa(this.reqUrl.url))
    this.hide();
  }

  hide(){
    this.visible = false;
    this.onHide.emit();
  }

}
