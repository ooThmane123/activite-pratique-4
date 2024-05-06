import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {AppStateService} from "./app-state.service";
import {LoadingService} from "./loading.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private appState:AppStateService,private loadingService:LoadingService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //1ere solution
    /*this.appState.setProductState({
      status:"LOADING"
    })*/
    this.loadingService.showLoadingSpinner();
    // crée copie de cette requette
    let req= request.clone({
      headers : request.headers.set("Authorization","Bearer JWT")
    });
    //pipe => écouter la réponse
    // finalize => quelque soit la réponse
    return next.handle(req).pipe(
      finalize(()=>{
        /*this.appState.setProductState({
          status:""
        })*/
        this.loadingService.hideLoadingSpinner();
      })
    );
  }
}
