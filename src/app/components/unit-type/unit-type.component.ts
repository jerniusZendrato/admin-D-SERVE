import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UnitService } from '../../services/unit.service';
import { AuthService } from '../../services/auth.service';
import { UnitType } from '../../models/unit.model';

@Component({
  selector: 'app-unit-type',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit-type.component.html',
  styleUrl: './unit-type.component.css'
})
export class UnitTypeComponent implements OnInit {
  unitTypes: UnitType[] = [];
  isLoading = false;
  selectedUnitType: UnitType = { name: '', roleUnitType: 'HELPER' };
  isEditing = false;
  showForm = false;
  roleOptions = ['HELPER', 'REQUESTER'];

  constructor(
    private unitService: UnitService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUnitTypes();
  }

  loadUnitTypes() {
    this.isLoading = true; // mulai loading
    this.unitService.getUnitTypes().subscribe({
      next: (response) => {
        this.unitTypes = response.data?.['unit-types'] || [];
        this.isLoading = false; // selesai loading
      },
      error: (error) => {
        this.isLoading = false; // pastikan loading berhenti walaupun error
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        console.error('Error loading unit types:', error);
      }
    });
  }

  openForm(unitType?: UnitType) {
    this.showForm = true;
    if (unitType) {
      this.selectedUnitType = { ...unitType };
      this.isEditing = true;
    } else {
      this.selectedUnitType = { name: '', roleUnitType: 'HELPER' };
      this.isEditing = false;
    }
  }

  closeForm() {
    this.showForm = false;
    this.selectedUnitType = { name: '', roleUnitType: 'HELPER' };
    this.isEditing = false;
  }

  saveUnitType() {
    if (this.isEditing && this.selectedUnitType.id) {
      this.unitService.updateUnitType(this.selectedUnitType.id, this.selectedUnitType).subscribe({
        next: () => {
          this.loadUnitTypes();
          this.closeForm();
        },
        error: (error) => console.error('Error updating unit type:', error)
      });
    } else {
      this.unitService.createUnitType(this.selectedUnitType).subscribe({
        next: () => {
          this.loadUnitTypes();
          this.closeForm();
        },
        error: (error) => console.error('Error creating unit type:', error)
      });
    }
  }

  deleteUnitType(id: string) {
    if (confirm('Are you sure you want to delete this unit type?')) {
      this.unitService.deleteUnitType(id).subscribe({
        next: () => this.loadUnitTypes(),
        error: (error) => console.error('Error deleting unit type:', error)
      });
    }
  }
}
