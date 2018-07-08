import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/index";
import { CookieService } from 'ngx-cookie-service';
import { CookieStoreService } from './cookie-store';

export interface IRequestOptions {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: true;
    body?: any;
}


@Injectable()
export class ApplicationHttpClient {

    private getDefaultOptions(option:IRequestOptions, method: string): IRequestOptions {
        let serverInfo = this.cookieStore.getServerInfo();
        let opt = option;
        if (!opt){ opt = {}; }
        let headers = opt.headers;

        if( !headers){ headers  = new HttpHeaders(); }

        if (serverInfo && serverInfo.token) {
            headers = headers.append('Authorization', serverInfo.token);
        }
        if (method != 'GET') {
            headers = headers.append('Content-Type', 'application/json');
        }

        opt.headers = headers;

        return opt;
    }

    private prefix = '/setting';


    public getUrl(endPoint:string):string{
        
        let serverInfo = this.cookieStore.getData("serverInfo");
        let url = '';
        if ( serverInfo && serverInfo.baseUrl){
            url += serverInfo.baseUrl;
        }
        if ( this.prefix){
           url +=this.prefix 
        }
        return url += endPoint;
    }

    // Extending the HttpClient through the Angular DI.
    public constructor(public http: HttpClient, private cookieStore:CookieStoreService) {

    }

    /**
     * GET request
     * @param {string} endPoint it doesn't need / in front of the end point
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
        return this.http.get<T>(this.getUrl(endPoint), this.getDefaultOptions(options,"GET"));
    }

    /**
     * POST request
     * @param {string} endPoint end point of the api
     * @param {Object} params body of the request.
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public post<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
        return this.http.post<T>(this.getUrl(endPoint), params, this.getDefaultOptions(options, "POST"));
    }

    /**
     * PUT request
     * @param {string} endPoint end point of the api
     * @param {Object} params body of the request.
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public put<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
        return this.http.put<T>(this.getUrl(endPoint), params, this.getDefaultOptions(options,"PUT"));
    }

    /**
     * DELETE request
     * @param {string} endPoint end point of the api
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
        return this.http.delete<T>(this.getUrl(endPoint), this.getDefaultOptions(options,"DELETE"));
    }

    fileDownload(url: string) {
        url = this.getUrl(url);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url; a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    }
}
