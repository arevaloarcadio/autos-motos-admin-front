import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tap, switchMap } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Brands } from 'src/app/shared/interfaces/brands.interface';
import { Models } from 'src/app/shared/interfaces/models.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-models-modal',
  templateUrl: './add-models-modal.component.html',
  styleUrls: ['./add-models-modal.component.scss']
})
export class AddModelsModalComponent implements OnInit {

  groupForm: FormGroup = this.fb.group({
    name: [''],
    model: [null],
  });

  isLoading: boolean = false;
  isLoadingHttp: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public models: Models[],
    public dialogRef2: MatDialogRef<AddModelsModalComponent>
  ) { }

  ngOnInit(): void {
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
    this.categoryService.createGroup(this.groupForm.value).subscribe(ok => {
      if (ok === true) {
        this.isLoadingHttp = false;
        this.dialogRef2.close(ok);
        Swal.fire('Modelos agregados exitosamente', '', 'success');
      } else {
        this.isLoadingHttp = false;
        Swal.fire('Error', ok, 'error');
      }
    });
  }
}
