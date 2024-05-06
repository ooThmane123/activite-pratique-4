import { Component } from '@angular/core';
import {createSecureContext} from "node:tls";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'enset 12345';
}
