import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './views/home/home.component';
import { AdminComponent } from './views/admin/admin.component';
import { ListComponent } from './views/list/list.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistFormComponent } from './components/regist-form/regist-form.component';
import { MessageComponent } from './components/message/message.component';
import { ContentModalComponent } from './components/content-modal/content-modal.component';
import { ContentCardComponent } from './components/content-card/content-card.component';
import { ScheduleModalComponent } from './components/schedule-modal/schedule-modal.component';
import { AuthInterceptor } from './middleware/auth.interceptor';
import { ErrorComponent } from './views/error/error.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdminComponent,
    ListComponent,
    LoginComponent,
    LoginFormComponent,
    RegistFormComponent,
    MessageComponent,
    ContentModalComponent,
    ContentCardComponent,
    ScheduleModalComponent,
    ErrorComponent,
    ProfileComponent,   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
