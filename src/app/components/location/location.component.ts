import { CommonModule } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { LoctionService } from '../../services/loction.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit {

  constructor( 
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private locationService: LoctionService
  ) { }


  locations: any[] = [];

  isLoading = false;

  showAddModal = false;
  newLocationName = "";

  ngOnInit() {
    this.loadLocations();
      
  }




  loadLocations() {
    this.isLoading = true;  // mulai loading

    console.log("loadLocations called");

    this.locationService.getLocations().subscribe({

   next: (response) => {
        this.locations = response.data.locations || [];

        console.log("this.locations :",this.locations )
        this.isLoading = false; // selesai loading
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        console.error('Error loading locations:', error);
      }
    });
    }


  openAddModal() {
    this.newLocationName = "";
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }



  saveNewLocation() {
    if (!this.newLocationName.trim()) {
      alert("Nama lokasi tidak boleh kosong");
      return;
    }

    const payload = { name: this.newLocationName };

    this.locationService.createLocation(payload).subscribe({
      next: () => {
        this.showAddModal = false;   // tutup modal
        this.loadLocations();        // refresh data
      },
      error: (err) => console.error("Error saving location:", err)
    });
  }

// buka modal edit


  editLocationId: string = '';
  editLocationName: string = '';
  showEditModal = false;





  openEditModal(location: any) {
    this.editLocationId = location.id;
    this.editLocationName = location.name;
    this.showEditModal = true;
  }


  closeEditModal() {
    this.showEditModal = false;
  }

  saveEditLocation() {

    // --- VALIDASI INPUT ---
    if (!this.editLocationName || this.editLocationName.trim() === '') {
      alert('Nama lokasi tidak boleh kosong.');
      return; // hentikan eksekusi
    }

    if (!this.editLocationId) {
      console.error('ID lokasi tidak ditemukan. Tidak bisa update.');
      return; // hentikan eksekusi
    }

    // --- AKSI UPDATE ---
    this.locationService.updateLocation(this.editLocationId, this.editLocationName)
      .subscribe({
        next: () => {
          this.loadLocations();
          this.closeEditModal();
        },
        error: (err) => console.error('Error updating location:', err)
      });
  }





  deleteLocation(id: string) {

  // --- VALIDASI ID ---
  if (!id || id.trim() === '') {
    console.error('ID lokasi tidak valid.');
    return;
  }

  // --- KONFIRMASI HAPUS ---
  if (!confirm('Yakin ingin menghapus location ini?')) {
    return; // user batal
  }

  // --- EKSEKUSI DELETE ---
  this.locationService.deleteLocation(id).subscribe({
    next: () => {
      this.loadLocations(); // refresh list
    },
    error: (err) => console.error('Error deleting location:', err)
  });

}




  







}
