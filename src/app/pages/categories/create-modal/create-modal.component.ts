import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tap, switchMap } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Brands } from 'src/app/shared/interfaces/brands.interface';
import { Models } from '../../../shared/interfaces/models.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit {

  groupForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    make_id: [null, Validators.required],
    model: [null],
  });

  models: Models[] = [];
  isLoading: boolean = false;
  isLoadingHttp: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public brands: Brands[],
    public dialogRef: MatDialogRef<CreateModalComponent>
  ) { }

  ngOnInit(): void {

    /* this.groupForm.get('make_id')?.valueChanges
      .pipe(
        tap((_) => {
          this.isLoading = true;
          this.groupForm.get('model')?.reset(null);
        }),
        switchMap(brand => this.categoryService.getModels(brand))
      )
      .subscribe(models => {
        this.models = models.data.data;
        this.isLoading = false;
      }); */
  }

  noValidField(field: string) {
    return (
      this.groupForm.get(field)?.invalid &&
      this.groupForm.get(field)?.touched
    );
  }

  save() {
    if (this.groupForm.invalid) {
      this.groupForm.markAllAsTouched();
      return;
    }

    this.isLoadingHttp = true;
    this.categoryService.createGroup(this.groupForm.value).subscribe( resp => {
      if (resp === true) {
        this.isLoadingHttp = false;
        this.dialogRef.close(resp);
        Swal.fire('Grupo creado exitosamente', '', 'success');
      } else {
        this.isLoadingHttp = false;
        Swal.fire('Error', resp, 'error');
      }
    });
  }

}
