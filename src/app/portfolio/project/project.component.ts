import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, AfterViewInit {
  selectedProject: string | null = null;

  projects = {
    ecommerce: {
      title: 'E-Commerce Platform',
      image: 'assets/project1.jpg',
      description: 'A comprehensive e-commerce solution built with modern web technologies, featuring advanced product management, secure payment processing, real-time inventory tracking, and an intuitive admin dashboard.',
      features: [
        'Advanced product catalog with filtering and search',
        'Secure payment gateway integration',
        'Real-time inventory management',
        'User authentication and profiles',
        'Order tracking and history',
        'Admin dashboard with analytics',
        'Mobile-responsive design',
        'Multi-language support'
      ],
      technologies: ['Angular 12+', 'TypeScript', 'Node.js', 'MongoDB', 'Express', 'Stripe API', 'Bootstrap 5']
    },
    shopping: {
      title: 'Smart Shopping Cart',
      image: 'assets/Shopping.png',
      description: 'An intelligent mobile shopping application that provides a seamless shopping experience with AI-powered product recommendations, one-click checkout, and personalized offers.',
      features: [
        'AI-powered product recommendations',
        'One-click checkout process',
        'Barcode scanning for quick add',
        'Offline shopping lists',
        'Price comparison across stores',
        'Loyalty program integration',
        'Push notifications for deals',
        'Social shopping features'
      ],
      technologies: ['Angular', 'Ionic', 'Capacitor', 'PWA', 'Firebase', 'Stripe', 'Google Maps API']
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

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initializeProjectFilters();
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
