import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  backendData: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getBackendData().subscribe((data) => {
      this.backendData = data;
    });
  }
}
