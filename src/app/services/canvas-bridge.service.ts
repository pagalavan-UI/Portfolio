import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanvasBridgeService {
  private highlightNodeSubject = new Subject<string | null>();
  public highlightNode$: Observable<string | null> = this.highlightNodeSubject.asObservable();

  public highlightNode(nodeName: string | null): void {
    this.highlightNodeSubject.next(nodeName);
  }
}
