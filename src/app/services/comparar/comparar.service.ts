import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CompararService {

    constructor() { }


    @Output() change: EventEmitter<any> = new EventEmitter();

    isOpen = false;

    toggle() {
        this.isOpen = !this.isOpen;
        this.change.emit({ isOpen: this.isOpen});
    }
}
