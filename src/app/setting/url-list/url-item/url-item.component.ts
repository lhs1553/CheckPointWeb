import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReqUrl } from '../../domain/req-url';
import { UrlListMap } from '../url-list-map';
import { SettingService } from '../../setting.service';
import { ApplicationHttpClient } from '../../../util/http.client';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-url-item',
  templateUrl: './url-item.component.html',
  styleUrls: ['./url-item.component.css']
})
export class UrlItemComponent implements OnInit {

  @Input() urlMap:UrlListMap;
  @Output() urlChanged:EventEmitter<ReqUrl>=new EventEmitter<ReqUrl>();
  @Output() favoriteClick:EventEmitter<ReqUrl>=new EventEmitter<ReqUrl>();

   menuView=false;
  selectedUrl:ReqUrl;

  constructor(private settingService:SettingService, private http:ApplicationHttpClient) { }

  ngOnInit() {
  }
  selectUrl(url:ReqUrl){
    this.urlChanged.emit(url);
    this.selectedUrl=url;
  }
  selectFavorite(url:ReqUrl){
    url.favorite = !url.favorite;
    this.favoriteClick.emit(url);
  }

  delete(url:ReqUrl){
    if (confirm("are you delete?")) {
      this.settingService.delete(url).subscribe(res => {
        this.selectUrl(null);
        this.urlMap.urlList = this.urlMap.urlList.filter(u => u != url);
      },error => {
          if (error.status == 401) {
            window.location.reload();
          }
        })

    }
  }

  menuPopup(url:ReqUrl){
    this.menuView=true;
  }

}
