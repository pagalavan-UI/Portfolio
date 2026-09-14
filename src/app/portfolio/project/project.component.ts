import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, AfterViewInit {
  @ViewChild('showcaseCard') showcaseCardRef!: ElementRef<HTMLElement>;

  public selectedProject: string | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initCardTilt();
  }

  private initCardTilt(): void {
    const card = this.showcaseCardRef?.nativeElement;
    if (!card) return;

    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1200px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) translateY(0px)';
    });
  }

  openProjectModal(projectId: string = 'shoerack'): void {
    this.selectedProject = projectId;
    document.body.style.overflow = 'hidden';
  }

  closeProjectModal(): void {
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }
}

