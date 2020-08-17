import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ApiService } from '../api.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() _id: string;
  @Output() postDeletedEvent = new EventEmitter();


  constructor(public apiService: ApiService, public router: Router) { }

  ngOnInit(): void {
  }

  deletePost(_id) {
    this.apiService.deletePost(_id);
    this.postDeletedEvent.emit();
    // $('#confirmModal-'+_id).hide(); // skipped not working
    window.location.reload();
  }
}
