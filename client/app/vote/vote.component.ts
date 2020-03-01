import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { MsgComponent } from "../shared/msg/msg.component";
import { Router } from "@angular/router";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { Label, Colors } from "ng2-charts";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { AuthService } from "../services/auth.service";
import * as $ from "jquery";

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
    $(document).ready(function() {
      $(".navbar a, footer a[href='#myPage']").on("click", function(event: {
        preventDefault: () => void;
      }) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          $("html, body").animate(
            {
              scrollTop: $(hash).offset().top
            },
            900,
            function() {
              window.location.hash = hash;
            }
          );
        }
      });

      $(window).scroll(function() {
        $(".slideanim").each(function() {
          var pos = $(this).offset().top;

          var winTop = $(window).scrollTop();
          if (pos < winTop + 600) {
            $(this).addClass("slide");
          }
        });
      });
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
        // this.router.navigate(["/"]);
        this.voteForm.reset;
        
        if (res.message !== undefined) this.msg.setMessage(res.message, "danger");
        else this.msg.setMessage("Tu voto ha sido registrado", "success");
      },
      (error: any) =>
        this.msg.setMessage(
          "se ha presentado un error al registrar tu voto",
          "danger"
        )
    );
  }
}
