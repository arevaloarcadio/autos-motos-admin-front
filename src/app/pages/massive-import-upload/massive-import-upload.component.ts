import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Vacio, VacioU, SoloLetra, SoloNumero } from '../../../assets/script/general';
import { Router} from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HelpMassiveImportUpload } from './help-massive-import-upload.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  option: string;
}



const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',option: 'Ver Archivo'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',option: 'Ver Archivo'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',option: 'Ver Archivo'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',option: 'Ver Archivo'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B',option: 'Ver Archivo'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',option: 'Ver Archivo'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',option: 'Ver Archivo'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',option: 'Ver Archivo'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F',option: 'Ver Archivo'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',option: 'Ver Archivo'},
];

//import { INavData }  from '@coreui/angular';
import '../../../assets/script/coreui.bundle.min.js'
import '../../../assets/script/coreui-utils.js'

@Component({
    selector: 'app-massive-import-upload',
    templateUrl: './massive-import-upload.component.html',
    styleUrls: ['./massive-import-upload.component.scss'],
})

export class MassiveImportUploadComponent implements OnInit {

    constructor(
        private UserService:UserService,
        private router: Router,
        public dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  redirect(path :any){
    this.router.navigate([path])
  }


  openDialog() {
    this.dialog.open(HelpMassiveImportUpload);
  }
  
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol', 'option'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  handlerDownload(){

    console.log("aqui")
    var self : any = this;
    setTimeout(() => {
      self.router.navigate(['/admin/products-massive-import-upload-file'])
    }, 3000);
  }

}


  