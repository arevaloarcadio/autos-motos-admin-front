import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import {Observable, Observer} from 'rxjs';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { CreateModalComponent } from './create-modal/create-modal.component';
import { Brands } from 'src/app/shared/interfaces/brands.interface';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Group, Model } from 'src/app/shared/interfaces/groups.interface';

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoriesComponent implements OnInit {

  selectedBrand: any = null;
  groups: Group[] = [];
  brands: Brands[] = [];
  isLoading: boolean = false;
  isLoadingHttp: boolean = false;
  
  constructor(
    private location: Location,
    private categoryService: CategoriesService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getBrandsByService();
  }

  loadGroups(brandId: string) {
    this.groups = [];
    this.categoryService.getGroups(brandId).subscribe( resp => {
      this.groups = resp.data;
    })

  }

  myButton(id?: any) {
    console.log(id);
  }

  expandPanel(matExpansionPanel: MatExpansionPanel, event: any) {
    event.stopPropagation();

    if (!this._isExpansionIndicator(event.target)) {
      matExpansionPanel.close();
    }
  }

  private _isExpansionIndicator(target: EventTarget | any): boolean {
    const expansionIndicatorClass = "mat-expansion-indicator";
    return (
      target.classList && target.classList.contains(expansionIndicatorClass)
    );
  }

  back() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getBrandsByService() {
    this.groups = [];
    this.isLoadingHttp = true;
    this.categoryService.getBrandsWithGroup()
      .subscribe(brands => {
        this.brands = brands.data;
        this.isLoadingHttp = false;
      })
  }

  openCreateDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(CreateModalComponent, {
      disableClose: true,
      width: '560px',
      height: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: this.brands,
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getBrandsByService();
        }
    });
}

}
