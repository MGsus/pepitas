import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

import { PoolService } from "../services/pool.service";
import { MsgComponent } from "../shared/msg/msg.component";
import { Pool } from "../shared/models/pool.model";

@Component({
  selector: "app-pools",
  templateUrl: "./pools.component.html",
  styleUrls: ["./pools.component.css"]
})
export class PoolsComponent implements OnInit {
  pool = new Pool();
  pools: Pool[] = [];
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
      this.pool = pool.results;
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
