import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements AfterViewInit {

  activeTab: 'all' | 'frontend' | 'backend' | 'tools' = 'all';

  constructor(
    private animationService: AnimationService,
    private el: ElementRef
  ) {}

  ngAfterViewInit(): void {
    const header = this.el.nativeElement.querySelector('.section-header');
    if (header) this.animationService.revealElement(header);

    const tabs = this.el.nativeElement.querySelector('.skills-tabs');
    if (tabs) this.animationService.revealElement(tabs, 0.1);

    this.revealCards();
  }

  setTab(tab: 'all' | 'frontend' | 'backend' | 'tools'): void {
    this.activeTab = tab;
    // Re-trigger reveal after DOM update
    setTimeout(() => this.revealCards(), 50);
  }

  private revealCards(): void {
    const cards = this.el.nativeElement.querySelectorAll('.skill-card');
    if (cards.length) {
      this.animationService.revealStagger(Array.from(cards), 0.07);
    }
  }
}
