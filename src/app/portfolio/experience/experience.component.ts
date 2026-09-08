import { Component, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements AfterViewInit {

  @ViewChild('timelineWrapper') timelineWrapperRef!: ElementRef<HTMLElement>;
  @ViewChild('timelineFill') timelineFillRef!: ElementRef<HTMLElement>;

  constructor(
    private animationService: AnimationService,
    private el: ElementRef
  ) {}

  ngAfterViewInit(): void {
    const header = this.el.nativeElement.querySelector('.section-header');
    if (header) this.animationService.revealElement(header);

    const nodes = this.el.nativeElement.querySelectorAll('.timeline-node');
    if (nodes.length) {
      this.animationService.revealStagger(Array.from(nodes), 0.15);
    }

    this.updateTimelineProgress();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.updateTimelineProgress();
  }

  private updateTimelineProgress(): void {
    const wrapper = this.timelineWrapperRef?.nativeElement;
    const fill = this.timelineFillRef?.nativeElement;
    if (!wrapper || !fill) return;

    const rect = wrapper.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Calculate how far into the timeline section the user has scrolled
    const startOffset = windowH * 0.75;
    const scrollDistance = startOffset - rect.top;
    const totalHeight = rect.height;

    let progress = (scrollDistance / totalHeight) * 100;
    progress = Math.max(0, Math.min(100, progress));

    fill.style.height = `${progress}%`;
  }
}
