import { Component, input } from "@angular/core";

@Component({
    selector: 'app-sin-informacion',
    standalone: true,
    templateUrl: './sinInformacion.component.html',
    styleUrls: ['./sinInformacion.component.scss']
})

export class SinInformacionComponent {
    title = input<string>()
    text = input<string>()
}