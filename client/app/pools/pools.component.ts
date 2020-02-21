import { Component, OnInit } from "@angular/core";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { Label, Colors } from "ng2-charts";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

import { PoolService } from "../services/pool.service";
import { MsgComponent } from "../shared/msg/msg.component";
import { Pool } from "../shared/models/pool.model";
import * as $ from "jquery";

@Component({
  selector: "app-pools",
  templateUrl: "./pools.component.html",
  styleUrls: ["./pools.component.css"]
})
export class PoolsComponent implements OnInit {
  pool = new Pool();
  pools: Pool[] = [];

  results: any;
  isLoading = true;
  isEditing = false;
  _showResult = false;

  addPoolForm: FormGroup;
  totalPeople = new FormControl("", Validators.required);
  marbles = new FormControl("", Validators.required);

  constructor(
    private poolService: PoolService,
    private formBuilder: FormBuilder,
    public msg: MsgComponent
  ) {}

  ngOnInit() {
    this.getPools();
    this.addPoolForm = this.formBuilder.group({
      totalPeople: this.totalPeople,
      marbles: this.marbles
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

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end"
      }
    }
  };
  public barChartLabels: Label[] = ["2006"];
  public barChartType: ChartType = "bar";
  public barChartColors: Array<any> = [
    { backgroundColor: "rgb(72,202,105)" },
    { backgroundColor: "rgb(245,48,29)" }
  ];
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  // array de numeros y recorrer para colocar los numeros en el array de datos

  public barChartData: ChartDataSets[] = [
    {
      data: [0],
      label: "Pepitas verdes"
    },
    { data: [0], label: "Pepitas rojas" }
  ];

  // events
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
  public randomize(): void {
    // produce la cantidad de pepitas verdes del array de resultados
    const grnData = [
      this.results.filter((res: any) => res.greenMarbles > 0).length
    ];
    let redData = [
      this.results.filter((res: any) => res.redMarbles > 0).length
    ];
    this.barChartData[0].data = grnData;
    this.barChartData[1].data = redData;
  }

  getPools() {
    this.poolService.getPools().subscribe(
      data => (this.pools = data),
      error => console.log(error),
      () => (this.isLoading = false)
    );
  }

  addPool() {
    this.poolService.addPool(this.addPoolForm.value).subscribe(
      res => {
        this.pools.push(res);
        this.addPoolForm.reset();
        this.msg.setMessage("item added successfully.", "success");
      },
      error => console.log(error)
    );
  }

  enableEditing(pool: Pool) {
    this.isEditing = true;
    this.pool = pool;
  }

  cancelEditing() {
    this.isEditing = false;
    this.pool = new Pool();
    this.msg.setMessage("item editing cancelled.", "warning");
    // reload the pool to reset the editing
    this.getPools();
  }

  editPool(pool: Pool) {
    this.poolService.editPool(pool).subscribe(
      () => {
        this.isEditing = false;
        this.pool = pool;
        this.msg.setMessage("item edited successfully.", "success");
      },
      error => console.log(error)
    );
  }

  showResults(pool: Pool) {
    this.poolService.getPool(pool).subscribe(() => {
      this._showResult = true;
      this.results = pool.results;
      const grnData = [
        this.results.filter((res: any) => res.greenMarbles > 0).length
      ];
      let redData = [
        this.results.filter((res: any) => res.redMarbles > 0).length
      ];
      this.barChartData[0].data = grnData;
      this.barChartData[1].data = redData;
    });
  }

  cancelResults() {
    this._showResult = false;
    this.pool = new Pool();
    this.getPools();
  }

  deletePool(pool: Pool) {
    if (
      window.confirm("Are you sure you want to permanently delete this item?")
    ) {
      this.poolService.deletePool(pool).subscribe(
        () => {
          const pos = this.pools.map(elem => elem._id).indexOf(pool._id);
          this.pools.splice(pos, 1);
          this.msg.setMessage("item deleted successfully.", "success");
        },
        error => console.log(error)
      );
    }
  }
}
