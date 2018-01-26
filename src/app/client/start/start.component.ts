import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { ModalManager } from '../../core/providers/modal-manager';
import { StaticMethods } from '../../utils/static-methods';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  errors: any = {};
  filterForm: FormGroup;
  get city() { return this.filterForm.get('city'); }
  get uPallet() { return this.filterForm.get('uPallet'); }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mm: ModalManager,
    private cService: ClientService
  ) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      city: ['', [Validators.required]],
      uPallet: ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    // this.mm.showLoadingDialog();
    const u = {
      cd: this.city.value,
      up: this.uPallet.value,
    };

    this.mm.showLoadingDialog();
    setTimeout(() => {
      this.router.navigate(['temproute_map', u], {
        relativeTo: this.route
      }).then(
        success => this.errors.message = success ? '' : 'No se encontraton bódegas con los parametros seleccionados',
        err => console.error(err)
        );
    }, 500);

  }

  getErrorMessage(formControl: AbstractControl, error) {
    if (error && error.length) {
      return error[0];
    } else {
      return StaticMethods.getFormError(formControl);
    }
  }

}
