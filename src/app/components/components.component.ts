import { Component, OnInit, Renderer } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient} from '@angular/common/http';
import {DataService} from '../data/data.service';
import {FormSettings} from '../data/form-settings';
import {NgForm, NgModel} from '@angular/forms';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    .card-description {
        text-align: justify;
    }
    `]
})

export class ComponentsComponent implements OnInit {
    emailURL = 'https://putsreq.com/gKTITiVjB7aQWlyzQrca';
    page = 4;
    page1 = 5;
    focus;
    date: {year: number, month: number};
    model: NgbDateStruct;
    originalUserSettings: FormSettings = {
        name: 'Nome',
        email: 'E-mail',
        message: 'Mensagem'
    };

    // Copy the original user settings values
    // in order to save the users data if he or she leaves or cancels the form
    userSettings: FormSettings = { ...this.originalUserSettings};

    // tslint:disable-next-line:comment-format
    //constructor( private renderer : Renderer) {}
    constructor( private dataService: DataService) {}

    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: {month: number}) {
        return date.month !== current.month;
    }

    ngOnInit() {
        let input_group_focus = document.getElementsByClassName('form-control');
        let input_group = document.getElementsByClassName('input-group');
        for (let i = 0; i < input_group.length; i++) {
            input_group[i].children[0].addEventListener('focus', function (){
                input_group[i].classList.add('input-group-focus');
            });
            input_group[i].children[0].addEventListener('blur', function (){
                input_group[i].classList.remove('input-group-focus');
            });
        }
    }

    onSubmit(form: NgForm) {
        console.log('on onSubmit: ', form.valid);

        this.dataService.postUserSettingsForm(this.userSettings).subscribe(
            result => console.log('sucess: ', result),
            error => console.log('error: ', error)
        );

    }

    onBlur(field: NgModel) {
        console.log('on onBlur: ', field.valid);
    }

}
