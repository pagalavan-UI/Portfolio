import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  @ViewChild('portraitFrame') portraitFrameRef!: ElementRef<HTMLElement>;

  public activeLayer = 'components';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  selectLayer(layer: string): void {
    this.activeLayer = layer;
  }

  ngAfterViewInit(): void {
    this.initPortraitTilt();
    this.initMagneticButtons();
  }

  private initPortraitTilt(): void {
    const frame = this.portraitFrameRef?.nativeElement;
    if (!frame) return;

    frame.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = frame.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      frame.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(10px)`;
    });

    frame.addEventListener('mouseleave', () => {
      frame.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    });
  }

  private initMagneticButtons(): void {
    const buttons = this.el.nativeElement.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach((btn: HTMLElement) => {
      btn.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}

