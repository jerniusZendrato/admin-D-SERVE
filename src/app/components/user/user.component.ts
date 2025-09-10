import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UnitService } from '../../services/unit.service';
import { AuthService } from '../../services/auth.service';
import { User, CreateUserRequest, UpdateUserRequest } from '../../models/unit.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: User[] = [];
  selectedUser: CreateUserRequest = { username: '', password: '', role: '' };
  editingUserId: string | null = null;
  isEditing = false;
  showForm = false;


  constructor(
    private unitService: UnitService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }


  loadUsers() {
    this.unitService.getUsers().subscribe({
      next: (response) => {
        this.users = response.data.users || [];
        console.log("cek ini masuk user",this.users)
      },
      error: (error) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        console.error('Error loading users:', error);
      }
    });
  }

  openForm(user?: User) {
    this.showForm = true;
    if (user) {
      this.selectedUser = { 
        username: user.username, 
        password: '',
        role: user.role
      };
      this.editingUserId = user.id;
      this.isEditing = true;
    } else {
      this.selectedUser = { username: '', password: '', role: '' };
      this.editingUserId = null;
      this.isEditing = false;
    }
  }

  closeForm() {
    this.showForm = false;
    this.selectedUser = { username: '', password: '', role: '' };
    this.editingUserId = null;
    this.isEditing = false;
  }

  saveUser() {
    if (this.isEditing && this.editingUserId) {
      const updateData: UpdateUserRequest = {};
      if (this.selectedUser.username) updateData.username = this.selectedUser.username;
      if (this.selectedUser.password) updateData.password = this.selectedUser.password;
      if (this.selectedUser.role) updateData.role = this.selectedUser.role;
      
      this.unitService.updateUser(this.editingUserId, updateData).subscribe({
        next: () => {
          this.loadUsers();
          this.closeForm();
        },
        error: (error) => console.error('Error updating user:', error)
      });
    } else {
      this.unitService.createUser(this.selectedUser).subscribe({
        next: () => {
          this.loadUsers();
          this.closeForm();
        },
        error: (error) => console.error('Error creating user:', error)
      });
    }
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.unitService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (error) => console.error('Error deleting user:', error)
      });
    }
  }
}