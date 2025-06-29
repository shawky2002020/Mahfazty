import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-buffer',
  templateUrl: './buffer.component.html',
  styleUrl: './buffer.component.css'
})
export class BufferComponent {
@Input() shade: boolean = false;
@Input() spinner: boolean = false;
@Input() loader: boolean = false;
@Input() pageLoader: boolean = false;
@Input() fullShade: boolean = false;
}
