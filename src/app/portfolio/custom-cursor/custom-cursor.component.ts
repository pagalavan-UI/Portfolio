import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  templateUrl: './custom-cursor.component.html',
  styleUrls: ['./custom-cursor.component.css']
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  public isVisible: boolean = false;
  public isHovered: boolean = false;
  public isClicking: boolean = false;
  public badgeText: string | null = null;

  public dotX: number = -100;
  public dotY: number = -100;
  public ringX: number = -100;
  public ringY: number = -100;

  private targetX: number = -100;
  private targetY: number = -100;
  private animId: number = 0;

  ngOnInit(): void {
    this.startInertiaLoop();
  }

  ngOnDestroy(): void {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.isVisible = true;
    this.targetX = e.clientX;
    this.targetY = e.clientY;
    this.dotX = e.clientX;
    this.dotY = e.clientY;

    const target = e.target as HTMLElement | null;
    this.detectHoverContext(target);
  }

  @HostListener('window:mousedown')
  onMouseDown(): void {
    this.isClicking = true;
  }

  @HostListener('window:mouseup')
  onMouseUp(): void {
    this.isClicking = false;
  }

  @HostListener('window:mouseleave')
  onMouseLeave(): void {
    this.isVisible = false;
  }

  private detectHoverContext(target: HTMLElement | null): void {
    if (!target) {
      this.isHovered = false;
      this.badgeText = null;
      return;
    }

    const interactiveEl = target.closest('a, button, [role="button"], .interactive, .tech-pill, .showcase-card, .metric-card') as HTMLElement | null;

    if (!interactiveEl) {
      this.isHovered = false;
      this.badgeText = null;
      return;
    }

    this.isHovered = true;

    if (interactiveEl.closest('.showcase-card') || interactiveEl.closest('.browser-chrome')) {
      this.badgeText = 'VIEW ↗';
    } else if (interactiveEl.tagName === 'BUTTON' || interactiveEl.classList.contains('btn')) {
      this.badgeText = 'OPEN';
    } else if (interactiveEl.classList.contains('tech-pill')) {
      this.badgeText = 'TECH';
    } else if (interactiveEl.classList.contains('coord-item')) {
      this.badgeText = 'COPY';
    } else {
      this.badgeText = null;
    }
  }

  private startInertiaLoop(): void {
    const loop = () => {
      // Damped follower ring inertia
      this.ringX += (this.targetX - this.ringX) * 0.16;
      this.ringY += (this.targetY - this.ringY) * 0.16;

      this.animId = requestAnimationFrame(loop);
    };

    loop();
  }
}
