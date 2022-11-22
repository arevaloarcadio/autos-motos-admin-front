import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import {Observable, Observer} from 'rxjs';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';

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
  //@ViewChild(MatAccordion) accordion: MatAccordion;
  asyncTabs: Observable<ExampleTab[]>;
  asyncTabs2: Observable<ExampleTab[]>;
  selectedModel: any = null;
  marcas = [
    {id: 'First', name: 'Content 1'},
    {id: 'Second', name: 'Content 2'},
    {id: 'Third', name: 'Content 3'},
  ]

  myButton() {
    console.log("my button was clicked!");
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

  constructor(private location: Location) {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'First', content: 'Content 1'},
          {label: 'Second', content: 'Content 2'},
          {label: 'Third', content: 'Content 3'},
        ]);
      }, 500);
    });
    this.asyncTabs2 = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'First', content: 'Content 1'},
          {label: 'Second', content: 'Content 2'},
          {label: 'Third', content: 'Content 3'},
        ]);
      }, 4000);
    });
  }

  ngOnInit(): void {
  }

  back() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
