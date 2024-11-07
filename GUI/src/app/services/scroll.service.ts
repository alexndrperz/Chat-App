import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }


  public scrollToBottom(scrollContainer: ElementRef) {
    scrollContainer.nativeElement.scroll({
      top: scrollContainer.nativeElement.scrollHeight ,
      left: 0,
      behavior: 'smooth'
    });
    
  }
}
