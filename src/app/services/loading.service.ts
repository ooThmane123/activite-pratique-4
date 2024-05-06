import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // un subject c'est un type d'observable particulier qui peut lui-meme etre un observateur
  // c'est just une convention => $ => quand on a un observable
  // si vous l'utilisez il faut faire un subscribe
  public isLoading$ = new Subject<boolean>();
  constructor() { }

  showLoadingSpinner():void {
    // next() => je vais émettre , je vais envoyer à n'importe quel composant qui m'écoute je vais lui envoyer true
    this.isLoading$.next(true);
  }

  hideLoadingSpinner():void {
    this.isLoading$.next(false);
  }
}
