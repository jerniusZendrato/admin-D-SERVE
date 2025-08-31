import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UnitService } from '../../services/unit.service';
import { AuthService } from '../../services/auth.service';
import { Unit, UnitType, CreateUnitRequest } from '../../models/unit.model';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.css'
})
export class UnitComponent implements OnInit {
  units: Unit[] = [];
  unitTypes: UnitType[] = [];
  selectedUnit: Unit = { name: '', unitTypeId: '' };
  isEditing = false;
  showForm = false;

  constructor(
    private unitService: UnitService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUnits();
    this.loadUnitTypes();
  }

  loadUnits() {
    this.unitService.getUnits().subscribe({
      next: (response) => {
        this.units = response.data.units || [];

        console.log("this.units :",this.units )
      },
      error: (error) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        console.error('Error loading units:', error);
      }
    });
  }

  loadUnitTypes() {
    this.unitService.getUnitTypes().subscribe({
      next: (response) => {
        this.unitTypes = response.data?.['unit-types'] || [];
      },
      error: (error) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        console.error('Error loading unit types:', error);
      }
    });
  }

  openForm(unit?: Unit) {
    this.showForm = true;
    if (unit) {
      this.selectedUnit = { ...unit };
      this.isEditing = true;
    } else {
      this.selectedUnit = { name: '', unitTypeId: '' };
      this.isEditing = false;
    }
  }

  closeForm() {
    this.showForm = false;
    this.selectedUnit = { name: '', unitTypeId: '' };
    this.isEditing = false;
  }

  saveUnit() {
    if (this.isEditing && this.selectedUnit.id) {
      this.unitService.updateUnit(this.selectedUnit.id, this.selectedUnit).subscribe({
        next: () => {
          this.loadUnits();
          this.closeForm();
        },
        error: (error) => console.error('Error updating unit:', error)
      });
    } else {
      const createRequest: CreateUnitRequest = {
        name: this.selectedUnit.name,
        unitTypeId: this.selectedUnit.unitTypeId
      };
      this.unitService.createUnit(createRequest).subscribe({
        next: () => {
          this.loadUnits();
          this.closeForm();
        },
        error: (error) => console.error('Error creating unit:', error)
      });
    }
  }

  deleteUnit(id: string) {
    if (confirm('Are you sure you want to delete this unit?')) {
      this.unitService.deleteUnit(id).subscribe({
        next: () => this.loadUnits(),
        error: (error) => console.error('Error deleting unit:', error)
      });
    }
  }

  getUnitTypeName(unitTypeId: string): string {
    const unitType = this.unitTypes.find(ut => ut.id === unitTypeId);
    return unitType ? unitType.name : 'Unknown';
  }
}
