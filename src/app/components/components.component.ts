import { Component, OnInit, Renderer } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient} from '@angular/common/http';
import {DataService} from '../data/data.service';
import {FormSettings} from '../data/form-settings';
import {NgForm, NgModel} from '@angular/forms';
import {IAlert} from './notification/notification.component';

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
    .field-error {
        border:1px solid red;
    }
    .alert{
        margin-bottom: 0;
    }
    .container .alert {
        margin-top:30px;
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
        name: null,
        email: null,
        message: null
    };

    // Copy the original user settings values
    // in order to save the users data if he or she leaves or cancels the form
    userSettings: FormSettings = { ...this.originalUserSettings};

    public alerts: Array<IAlert> = [];
    private postError = false;
    private postErrorMessage = '';
    private messageSent = false;
    constructor( private dataService: DataService) {}

    ngOnInit() {
        const input_group_focus = document.getElementsByClassName('form-control');
        const input_group = document.getElementsByClassName('input-group');
        for (let i = 0; i < input_group.length; i++) {
            input_group[i].children[0].addEventListener('focus', function (){
                input_group[i].classList.add('input-group-focus');
            });
            input_group[i].children[0].addEventListener('blur', function (){
                input_group[i].classList.remove('input-group-focus');
            });
        }
    }

    onHttpError(errorResponse: any) {
        console.log('Error: ', errorResponse );
        this.postError = true;
        this.postErrorMessage = errorResponse.message;
    }

    onMessageSent() {
        console.log('sucess');

        // Clean input fields
        this.userSettings.name = null;
        this.userSettings.email = null;
        this.userSettings.message = null;

        this.messageSent = true;

    }

    onSubmit(form: NgForm) {

        console.log('on onSubmit: ', form.valid);

        if (form.valid) {
            this.dataService.postUserSettingsForm(this.userSettings).subscribe(
                result => this.onMessageSent(),
                error => this.onHttpError(error)
            );
        }
        // tslint:disable-next-line:one-line
        else {
            this.postError = true;
            this.postErrorMessage = 'O formulário contêm erros';
        }

    }

    onBlur(field: NgModel) {
        console.log('on onBlur: ', field.valid);
    }

}
