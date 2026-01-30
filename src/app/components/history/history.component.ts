import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-history',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  
  constructor(
    private historyservice: HistoryService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) { }
  isLoading = false;
  historys: any[] = []; 



  ngOnInit() {
    this.loadhistory()   
  }

  loadhistory() {
    this.isLoading = true;  // mulai loading

    this.historyservice.getSupport().subscribe({

   next: (response) => {
        this.historys = response.data.supports || [];

        // console.log("this.units :",this.units )
        this.isLoading = false; // selesai loading
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        console.error('Error loading units:', error);
      }
    });
    }

    goBack() {
  window.history.back();
}

    downloadExcel() {
  if (!this.historys || this.historys.length === 0) {
    this.toastService.show("Tidak ada data untuk di-download", 'error');
    return;
  }

  const data = this.historys.map(h => ({
    ID: h.id,
    Requester: h.requesterUserName,
    Unit: h.requesterUnitName,
    Status: h.status,
    Location: h.location,
    AcceptedAt: h.acceptedAt,
    ProcessAt: h.prosessAt,
    CompletedAt: h.completedAt,
    RequesterLat: h.requesterLatitude,
    RequesterLng: h.requesterLongitude,
    ResponderLat: h.responderLatitude,
    ResponderLng: h.responderLongitude
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = { Sheets: { 'History': worksheet }, SheetNames: ['History'] };
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, `History_${new Date().toISOString().slice(0,10)}.xlsx`);
}
}
