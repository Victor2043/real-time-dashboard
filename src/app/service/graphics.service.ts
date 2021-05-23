import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {webSocket} from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class GraphicsService {

  socket = webSocket(`${environment.service}=bitcoin,ethereum,litecoin,dogecoin`)
  
  constructor() { }
  
  
}
