import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements AfterViewInit {

  constructor(
    private animationService: AnimationService,
    private el: ElementRef
  ) {}

  ngAfterViewInit(): void {
    const header = this.el.nativeElement.querySelector('.section-header');
    if (header) this.animationService.revealElement(header);

    const cards = this.el.nativeElement.querySelectorAll('.metric-card');
    if (cards.length) this.animationService.revealStagger(Array.from(cards), 0.1);

    const certs = this.el.nativeElement.querySelectorAll('.cert-item');
    if (certs.length) this.animationService.revealStagger(Array.from(certs), 0.1);
  }
}
