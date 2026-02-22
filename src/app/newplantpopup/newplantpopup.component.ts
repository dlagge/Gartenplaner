import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewplantpopuptileComponent } from '../newplantpopuptile/newplantpopuptile.component';
import { UiService } from '../../services/uiservice';

@Component({
    selector: 'newplantpopup',
    imports: [FormsModule, CommonModule, NewplantpopuptileComponent],
    templateUrl: './newplantpopup.component.html',
    styleUrl: './newplantpopup.component.css'
})
export class NewplantpopupComponent {

    @ViewChild('newPlantInput') inputRef!: ElementRef<HTMLInputElement>;

    newPlantSearchValue = '';
    private selectedLabels: string[] = [];

    constructor(sel: UiService) {
        sel.labelClick$.subscribe(text => {
            if (!this.selectedLabels.includes(text)) {
                this.selectedLabels.push(text);
                this.newPlantSearchValue = this.selectedLabels.join(', ');
            }
        });
    }

    enterplantSearch(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            console.log(this.newPlantSearchValue);
        }
    }
}
