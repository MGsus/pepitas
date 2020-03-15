// Angular
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// Services
import { AuthGuardLogin } from "./services/auth-guard-login.service";
import { AuthGuardAdmin } from "./services/auth-guard-admin.service";
// Components
import { PoolsComponent } from "./pools/pools.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { VoteComponent } from "./vote/vote.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "pools", component: PoolsComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "vote", component: VoteComponent },
  { path: "notfound", component: NotFoundComponent },
  { path: "**", redirectTo: "/notfound" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
