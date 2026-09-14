import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { AnimationService } from '../../services/animation.service';
import { CanvasBridgeService } from '../../services/canvas-bridge.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements AfterViewInit {

  constructor(
    private animationService: AnimationService,
    private bridgeService: CanvasBridgeService,
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

  onSkillHover(skillName: string): void {
    this.bridgeService.highlightNode(skillName);
  }

  onSkillLeave(): void {
    this.bridgeService.highlightNode(null);
  }
}
