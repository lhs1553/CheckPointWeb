import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationHttpClient } from '../../../util/http.client';

@Component({
  selector: 'app-import-menu',
  templateUrl: './import-menu.component.html',
  styleUrls: ['./import-menu.component.css']
})
export class ImportMenuComponent implements OnInit {

  constructor(private http :ApplicationHttpClient) { }

  @Input() visible: boolean;
  @Output() onHide: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }
  getUploadUrl(){
    return this.http.getUrl("/upload/json");
  }
  hide() {
    this.visible = false;
    this.onHide.emit();
  }
  uploadCompleted(){
    alert("import completed!")
    this.hide();
  }


}
