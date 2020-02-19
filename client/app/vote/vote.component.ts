import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { MsgComponent } from "../shared/msg/msg.component";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router } from "@angular/router";
import { Vote } from "../shared/models/vote.model";
import { PoolService } from "../services/pool.service";

@Component({
  selector: "app-vote",
  templateUrl: "./vote.component.html",
  styleUrls: ["./vote.component.css"]
})
export class VoteComponent implements OnInit {
  voteForm: FormGroup;
  codeForm: FormGroup;

  _vote = new Vote();

  hasCode = false;

  code = new FormControl("", [Validators.required, Validators.minLength(5)]);
  grnMarbles = new FormControl("", [Validators.required]);
  redMarbles = new FormControl("", [Validators.required]);

  constructor(
    private userService: UserService,
    private poolService: PoolService,
    private router: Router,
    public msg: MsgComponent,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.voteForm = this.formBuilder.group({
      code: this.code,
      grnMarbles: this.grnMarbles,
      redMarbles: this.redMarbles
    });
    this.codeForm = this.formBuilder.group({
      code: this.code
    });
  }

  setCode() {
    return { "has-danger": !this.code.pristine && !this.code.valid };
  }

  setSessionCode() {
    this.hasCode = true;
  }

  vote() {
    console.log(this.voteForm.value);

    this.userService.vote(this.voteForm.value).subscribe(
      (res: any) => {
        this.msg.setMessage("Tu voto ha sido registrado", "success");
        this.router.navigate(["/"]);
      },
      (error: any) =>
        this.msg.setMessage(
          "se ha presentado un error al registrar tu voto",
          "danger"
        )
    );
  }
}
