import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'help-massive-import-upload.component.html',
  styleUrls: ['./help-massive-import-upload.component.scss'],
})

export class HelpMassiveImportUpload {
	constructor(
        private router: Router
    ) { }
    
	handlerDownload(){

		var self : any = this;
		setTimeout(() => {
	  		self.router.navigate(['/admin/products-massive-import-upload-file'])
		}, 3000);
	}
}