import { Component, OnInit, Inject,ViewChild, ElementRef } from '@angular/core';
import { AdsService } from 'src/app/services/ads/ads.service';
import { Vacio, VacioU, SoloLetra, SoloNumero } from '../../../assets/script/general';
import { Router} from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import '../../../assets/script/coreui.bundle.min.js'
import '../../../assets/script/coreui-utils.js'

@Component({
    selector: 'app-ads-details',
    templateUrl: './ads-details.component.html',
    styleUrls: ['./ads-details.component.scss'],
})
export class AdsDetailsComponent implements OnInit {

  constructor(
    private AdsService:AdsService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdsDetailsComponent>

  ){}

  ngOnInit(): void {
  console.log(this.data)
  }

  redirect(path :any){
    this.router.navigate([path])
  }
  
}
  