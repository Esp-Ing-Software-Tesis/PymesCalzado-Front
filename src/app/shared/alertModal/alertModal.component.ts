import { CommonModule } from '@angular/common';
import { Component, input, Output, EventEmitter } from "@angular/core";
import { InputAlertModal } from './alertModal.interface';

@Component({
    selector: 'app-alert-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './alertModal.component.html',
    styleUrls: ['./alertModal.component.scss']
})

export class AlertModalComponent {
    inputAlertModal = input.required<InputAlertModal>();

    @Output() acept = new EventEmitter<void>();
    @Output() close = new EventEmitter<void>();

    // Accion de aceptar
    onAceptClick() {
        this.acept.emit();
    }

    // Accion de cerrar
    onCloseClick() {
        this.close.emit();
    }
}