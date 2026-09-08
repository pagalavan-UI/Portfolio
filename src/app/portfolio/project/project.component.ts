import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, AfterViewInit {

  @ViewChild('showcaseCard') showcaseCardRef!: ElementRef<HTMLElement>;

  selectedProject: string | null = null;

  projectData = {
    shoerack: {
      title: 'Shoe Rack — E-Commerce Interface',
      image: 'assets/Shopping.png',
      description: 'A premium, high-performance footwear retail application crafted with Angular, TypeScript, SCSS, and GSAP. Engineered for fast client-side filtering, reactive cart workflows, and elegant dark-mode aesthetics.',
      features: [
        'Dynamic multi-criteria product filtering and instant search',
        'Reactive shopping cart state and checkout micro-interactions',
        'Modular, component-driven architecture with SCSS tokens',
        'Performance-tuned asset loading and responsive layout',
        'Fluid GSAP-driven transitions with zero layout shift'
      ],
      technologies: ['Angular', 'TypeScript', 'SCSS', 'GSAP', 'Bootstrap 5']
    }
  };

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
      card.style.transform = `perspective(1200px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) translateY(0px)';
    });
  }

  openProjectModal(projectId: string): void {
    this.selectedProject = projectId;
    document.body.style.overflow = 'hidden';
  }

  closeProjectModal(): void {
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }

  getProjectTitle(): string {
    return this.projectData.shoerack.title;
  }

  getProjectDescription(): string {
    return this.projectData.shoerack.description;
  }

  getProjectFeatures(): string[] {
    return this.projectData.shoerack.features;
  }

  getProjectTech(): string[] {
    return this.projectData.shoerack.technologies;
  }
}
