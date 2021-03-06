/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddJobComponent } from './add-job.component';

describe('JobComponent', () => {
    let component: AddJobComponent;
    let fixture: ComponentFixture<AddJobComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AddJobComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddJobComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
