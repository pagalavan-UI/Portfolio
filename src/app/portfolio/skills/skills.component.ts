import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements AfterViewInit {

  constructor(
    private animationService: AnimationService,
    private el: ElementRef
  ) {}

  ngAfterViewInit(): void {
    const header = this.el.nativeElement.querySelector('.section-header');
    if (header) this.animationService.revealElement(header);

    const cards = this.el.nativeElement.querySelectorAll('.domain-card');
    if (cards.length) {
      this.animationService.revealStagger(Array.from(cards), 0.12);
    }
  }
}
