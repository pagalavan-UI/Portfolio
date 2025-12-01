import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HeaderComponent } from './portfolio/header/header.component';
import { AboutComponent } from './portfolio/about/about.component';
import { ProjectComponent } from './portfolio/project/project.component';
import { SkillsComponent } from './portfolio/skills/skills.component';
import { ContactComponent } from './portfolio/contact/contact.component';
import { ProfileComponent } from './portfolio/profile/profile.component';
import { FooterComponent } from './portfolio/footer/footer.component';
import { SmartdealComponent } from './smartdeal/smartdeal.component';
import { MobileoverviewComponent } from './mobileoverview/mobileoverview.component';

const routes: Routes = [

  { path: '', redirectTo: 'portfolio/header', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent

  },
  {
    path: 'portfolio',
    component: PortfolioComponent
  },
  {
    path: 'portfolio/header',
    component: HeaderComponent
  },
  {
    path: 'portfolio/about',
    component: AboutComponent
  },
  {
    path: 'portfolio/project',
    component: ProjectComponent
  },
  {
    path: 'portfolio/skills',
    component: SkillsComponent
  },
  {
    path: 'portfolio/contact',
    component: ContactComponent
  },
  {
    path: 'portfolio/profile',
    component: ProfileComponent
  },
  {
    path: 'portfolio/footer',
    component: FooterComponent
  },

  {
    path: 'portfolio/smartdeal',
    component: SmartdealComponent
  },
  {
    path: 'portfolio/mobile',
    component: MobileoverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
