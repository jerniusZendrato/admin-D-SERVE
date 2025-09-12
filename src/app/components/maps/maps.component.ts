import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import L from 'leaflet';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent implements AfterViewInit {
  /** Koordinat default (tambang) */
  lat: number = -2.932112;
  lng: number = 115.2278778;
  zoom: number = 16;

  private map!: L.Map;

  constructor(private route: ActivatedRoute, private router: Router) {}

  goBack(): void {
    this.router.navigate(['/home']);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.addMarker();
  }

  /** Inisialisasi peta */
  private initMap(): void {
    this.map = L.map('map', {
      center: [this.lat, this.lng],
      zoom: this.zoom,
      zoomControl: true,
    });

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles © Esri & contributors',
        maxZoom: 18,
      }
    ).addTo(this.map);

    // Pastikan peta menyesuaikan ukuran container
    setTimeout(() => this.map.invalidateSize(), 0);
  }

  /** Tambahkan marker */
  private addMarker(): void {
    L.marker([this.lat, this.lng])
      .addTo(this.map)
      .bindPopup('Lokasi Tambang')
      .openPopup();
  }
}