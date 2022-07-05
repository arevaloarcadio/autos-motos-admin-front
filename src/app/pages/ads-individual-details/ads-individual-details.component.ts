import { Component, OnInit, Inject,ViewChild, ElementRef } from '@angular/core';
import { AdsService } from 'src/app/services/ads/ads.service';
import { Vacio, VacioU, SoloLetra, SoloNumero } from '../../../assets/script/general';
import { Router} from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import '../../../assets/script/coreui.bundle.min.js'
import '../../../assets/script/coreui-utils.js'

@Component({
    selector: 'app-ads-individual-details',
    templateUrl: './ads-individual-details.component.html',
    styleUrls: ['./ads-individual-details.component.scss'],
})
export class AdsIndividualDetailsComponent implements OnInit {

  constructor(
    private AdsService:AdsService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdsIndividualDetailsComponent>

  ){}

  ngOnInit(): void {
  console.log(this.data)
  }

  redirect(path :any){
    this.router.navigate([path])
  }
  
}
  