import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, AfterViewInit {
  selectedProject: string | null = null;

  webProject: boolean = false
  mobileProject: boolean = false

  projects = {
    shoerack: {
      title: 'Shoe Rack (Featured)',
      image: 'assets/Shopping.png', // Using shopping cart image as fallback until shoe rack specific image is uploaded
      description: 'A premium, fully-responsive e-commerce interface for a high-end shoe retailer. Features dynamic product filtering, seamless shopping cart experience, and modern dark-mode aesthetics.',
      features: [
        'Dynamic product grid with advanced filtering',
        'Interactive shopping cart and checkout flow',
        'Responsive mobile-first design',
        'Modern dark theme UI with glassmorphism',
        'Performance optimized asset loading'
      ],
      technologies: ['Angular', 'TypeScript', 'SCSS', 'GSAP', 'Bootstrap 5']
    },
    ecommerce: {
      title: 'Smart Deal Zone (Web)',
      image: 'assets/project1.jpg',
      description: 'A city-based multi-vendor B2C e-commerce platform with 500+ active product listings and real users.',
      features: [
        'Merchant onboarding with tiered subscriptions (Free/Standard/Premium)',
        'End-to-end modules for merchants, service providers, and delivery partners',
        'Real-time order tracking and KYC-based onboarding for delivery partners',
        'Multi-zone delivery channel with WhatsApp escalation',
        'COD workflows, payment integration, and admin dashboards',
        'Performance optimized with lazy loading and OnPush change detection'
      ],
      technologies: ['Angular 12', 'TypeScript', 'Bootstrap 5', 'REST API', 'MySQL', 'Razorpay', 'WhatsApp Business API', 'Google Maps API']
    },
    shopping: {
      title: 'Smart Deal Zone (Mobile)',
      image: 'assets/Shopping.png',
      description: 'An Android mobile application for the Smart Deal Zone ecosystem built from a single codebase.',
      features: [
        'Developed Android mobile app using Ionic and Angular from a single codebase',
        'Real-time order tracking synchronized with backend services',
        'Delivery partner workflow with push notifications and proof-of-delivery',
        'Integrated cinema module with live showtimes and seat selection',
        'Optimized UI responsiveness across multiple devices using adaptive layouts'
      ],
      technologies: ['Ionic 5', 'Angular 12', 'TypeScript', 'Capacitor', 'REST API', 'Push Notifications', 'Android Studio']
    },
    bloodbank: {
      title: 'Blood Bank Management System',
      image: 'assets/blood.jpg',
      description: 'A comprehensive healthcare management system designed to streamline blood bank operations, connecting donors with recipients efficiently while maintaining strict quality control standards.',
      features: [
        'Donor registration and management',
        'Blood inventory tracking',
        'Quality control and testing',
        'Emergency request system',
        'Hospital integration',
        'Donation appointment scheduling',
        'Blood type compatibility matching',
        'Reporting and analytics dashboard'
      ],
      technologies: ['Angular', 'Node.js', 'MySQL', 'Express', 'JWT', 'Rest Api', 'AWS', 'Vanta JS']
    },
    inventory: {
      title: 'Inventory Management System',
      image: 'assets/inventory.jpg',
      description: 'A comprehensive inventory management system for tracking products, managing inventory, and generating reports.',
      features: [
        'Product tracking and management',
        'Inventory tracking and management',
        'Reporting and analytics dashboard'
      ],
      technologies: ['Angular', 'Node.js', 'MySQL', 'Express', 'JWT', 'Rest Api', 'AWS']
    }
  };

  constructor(
    private animationService: AnimationService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initializeProjectFilters();

    // GSAP Animations
    const header = this.el.nativeElement.querySelector('.section-header');
    if (header) this.animationService.revealElement(header);

    const cards = this.el.nativeElement.querySelectorAll('.project-card');
    if (cards.length > 0) {
      this.animationService.revealStagger(Array.from(cards), 0.15);
    }
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
    if (!this.selectedProject) return '';
    return this.projects[this.selectedProject as keyof typeof this.projects]?.title || '';
  }

  getProjectImage(): string {
    if (!this.selectedProject) return '';
    return this.projects[this.selectedProject as keyof typeof this.projects]?.image || '';
  }

  getProjectDescription(): string {
    if (!this.selectedProject) return '';
    return this.projects[this.selectedProject as keyof typeof this.projects]?.description || '';
  }

  getProjectFeatures(): string[] {
    if (!this.selectedProject) return [];
    return this.projects[this.selectedProject as keyof typeof this.projects]?.features || [];
  }

  getProjectTech(): string[] {
    if (!this.selectedProject) return [];
    return this.projects[this.selectedProject as keyof typeof this.projects]?.technologies || [];
  }

  private initializeProjectFilters(): void {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            (card as HTMLElement).style.display = 'block';
          } else {
            (card as HTMLElement).style.display = 'none';
          }
        });
      });
    });
  }
}
