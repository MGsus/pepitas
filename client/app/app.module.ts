// Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { JwtModule } from "@auth0/angular-jwt";
import { ChartsModule } from "ng2-charts";
// Modules
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
// Services
import { PoolService } from "./services/pool.service";
import { UserService } from "./services/user.service";
import { AuthService } from "./services/auth.service";
import { AuthGuardLogin } from "./services/auth-guard-login.service";
import { AuthGuardAdmin } from "./services/auth-guard-admin.service";
// Components
import { AppComponent } from "./app.component";
import { PoolsComponent } from "./pools/pools.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { VoteComponent } from "./vote/vote.component";

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    PoolsComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    NotFoundComponent,
    VoteComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    ChartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter
        // whitelistedDomains: ['localhost:3000', 'localhost:4200']
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    PoolService,
    UserService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
