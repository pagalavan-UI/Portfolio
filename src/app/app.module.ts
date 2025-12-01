import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HeaderComponent } from './portfolio/header/header.component';
import { AboutComponent } from './portfolio/about/about.component';
import { ProjectComponent } from './portfolio/project/project.component';
import { SkillsComponent } from './portfolio/skills/skills.component';
import { ContactComponent } from './portfolio/contact/contact.component';
import { ProfileComponent } from './portfolio/profile/profile.component';
import { FooterComponent } from './portfolio/footer/footer.component';
import { ThemeToggleComponent } from './portfolio/theme-toggle/theme-toggle.component';
import { LoadingComponent } from './portfolio/loading/loading.component';
import { SmartdealComponent } from './smartdeal/smartdeal.component';
import { MobileoverviewComponent } from './mobileoverview/mobileoverview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PortfolioComponent,
    HeaderComponent,
    AboutComponent,
    ProjectComponent,
    SkillsComponent,
    ContactComponent,
    ProfileComponent,
    FooterComponent,
    ThemeToggleComponent,
    LoadingComponent,
    SmartdealComponent,
    MobileoverviewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule  ,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
