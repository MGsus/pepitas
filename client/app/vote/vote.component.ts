import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { MsgComponent } from "../shared/msg/msg.component";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-vote",
  templateUrl: "./vote.component.html",
  styleUrls: ["./vote.component.css"]
})
export class VoteComponent implements OnInit {
  voteForm: FormGroup;
  code = new FormControl("", [Validators.required]);
  greenMarbles = new FormControl("", [Validators.required]);
  redMarbles = new FormControl("", [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private user: UserService,
    private router: Router,
    public msg: MsgComponent
  ) {}

  ngOnInit() {
    this.voteForm = this.formBuilder.group({
      code: this.code,
      greenMarbles: this.greenMarbles,
      redMarbles: this.redMarbles,
      nickname: this.auth.currentUser.nickname
    });
  }

  setClassCode() {
    return { "has-danger": !this.code.pristine && !this.code.valid };
  }

  _vote() {
    // TODO: Corregir cuando recibe un json con un mensaje de error
    // igualmente esta enviando el mensaje tu voto ha sido registrado
    this.user.vote(this.voteForm.value).subscribe(
      (res: any) => {
        // this.user.vote
        this.voteForm.reset();
        this.msg.setMessage("Tu voto ha sido registrado", "success");
      },
      (error: any) =>
        this.msg.setMessage(
          "se ha presentado un error al registrar tu voto",
          "danger"
        )
    );
  }
}
