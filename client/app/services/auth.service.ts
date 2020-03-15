import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { JwtHelperService } from "@auth0/angular-jwt";

import { UserService } from "./user.service";
import { User } from "../shared/models/user.model";

import "rxjs/add/operator/map";

@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;

  currentUser: User = new User();

  constructor(
    private userService: UserService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  login(nickAndCode: any) {
    return this.userService.login(nickAndCode).map(res => {
      localStorage.setItem("token", res.token);
      const decodedUser = this.decodeUserFromToken(res.token);
      this.setCurrentUser(decodedUser);
      this.router.navigate(["/"]);
      return this.loggedIn;
    });
  }

  logout() {
    localStorage.removeItem("token");
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = new User();
    this.router.navigate(["/login"]);
  }

  decodeUserFromToken(token: any) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser: any) {
    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.nickname = decodedUser.nickname;
    this.currentUser.role = decodedUser.role;
    decodedUser.role === "admin"
      ? (this.isAdmin = true)
      : (this.isAdmin = false);
    delete decodedUser.role;
  }
}
