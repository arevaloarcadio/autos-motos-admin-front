// import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatStepperModule } from '@angular/material/stepper';

import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { NgxLoadingModule } from 'ngx-loading';
// import * as _moment from 'dayjs';
// tslint:disable-next-line:no-duplicate-imports
// import { MomentDateAdapter } from '@angular/material-moment-adapter';
// import { NgxChartsModule } from '@swimlane/ngx-charts';

// import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatSortModule } from '@angular/material/sort';

import {
    DateAdapter,
    MAT_DATE_LOCALE,
    MAT_DATE_FORMATS,
} from '@angular/material/core';

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'D-MM-Y',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // FlexLayoutModule,
        RouterModule,
        // NgxDatatableModule,
        MatTableModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        // NgxChartsModule,
        MatStepperModule,
        MatSortModule,
        MatDialogModule,
        MatRadioModule,
        MatButtonModule,
        MatToolbarModule,
        MatSelectModule,
        MatTabsModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatCardModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatListModule,
        MatMenuModule,
        MatIconModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatGridListModule,
        MatProgressBarModule,
        MatDatepickerModule,
        // NgxLoadingModule,
        // NgxMaterialTimepickerModule,
    ],
    declarations: [],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // FlexLayoutModule,
        RouterModule,
        // NgxDatatableModule,
        MatTableModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        // NgxChartsModule,
        MatStepperModule,
        MatSortModule,
        MatDialogModule,
        MatRadioModule,
        MatButtonModule,
        MatMenuModule,
        MatTabsModule,
        MatChipsModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatCardModule,
        MatSidenavModule,
        MatListModule,
        MatSelectModule,
        MatToolbarModule,
        MatIconModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatGridListModule,
        MatProgressBarModule,
        MatDatepickerModule,
        // NgxLoadingModule,
        // ConfirmDialogComponent,
        // NgxChartsModule,
        // NgxMaterialTimepickerModule,
    ],
    entryComponents: [],
    providers: [
        // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
        // application's root module. We provide it at the component level here, due to limitations of
        // our example generation script.
        // {
        //     provide: DateAdapter,
        //     useClass: MomentDateAdapter,
        //     deps: [MAT_DATE_LOCALE],
        // },

        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class SharedModule {}
