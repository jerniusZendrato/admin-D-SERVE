# Panduan Prompt Efektif untuk Pengembangan Admin Dashboard Angular

## 🎯 Struktur Project yang Telah Dibangun

### Tech Stack
- **Framework**: Angular 19.2.3 (Standalone Components)
- **UI**: Tailwind CSS
- **Backend API**: https://mining-be-service-dev.up.railway.app/api
- **Authentication**: JWT Bearer Token
- **HTTP Client**: Angular HttpClient dengan Interceptors

## 📁 Struktur Folder
```
src/app/
├── components/
│   ├── home/
│   ├── pages/login/
│   ├── unit/
│   ├── unit-type/
│   └── user/
├── services/
│   ├── auth.service.ts
│   └── unit.service.ts
├── models/
│   └── unit.model.ts
├── guards/
│   └── auth.guard.ts
├── interceptors/
│   └── auth.interceptor.ts
└── app.routes.ts
```

## 🔧 Perintah Setup yang Benar

### 1. Membuat Component Baru
```bash
ng generate component components/[nama-component] --skip-tests
```

### 2. Struktur Component Standalone
```typescript
@Component({
  selector: 'app-[nama]',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './[nama].component.html',
  styleUrl: './[nama].component.css'
})
```

### 3. Model Interface yang Konsisten
```typescript
export interface [Entity] {
  id?: string;  // Selalu string (UUID dari API)
  name: string;
  // field lainnya...
  createdAt?: string;
  updatedAt?: string;
}

export interface Create[Entity]Request {
  // Hanya field yang required untuk create
}
```

## 🌐 Integrasi API yang Benar

### 1. Service Method Pattern
```typescript
// GET List
get[Entities](): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/[endpoint]`);
}

// POST Create
create[Entity](data: any): Observable<any> {
  const headers = { 'Content-Type': 'application/json' };
  return this.http.post<any>(`${this.baseUrl}/[endpoint]`, data, { headers });
}

// PUT Update
update[Entity](id: string, data: any): Observable<any> {
  const headers = { 'Content-Type': 'application/json' };
  return this.http.put<any>(`${this.baseUrl}/[endpoint]/${id}`, data, { headers });
}

// DELETE
delete[Entity](id: string): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/[endpoint]/${id}`);
}
```

### 2. Response Handling Pattern
```typescript
loadData() {
  this.service.getData().subscribe({
    next: (response) => {
      // API response structure: { data: { [key]: [...] } }
      this.items = response.data?.[key] || response.data || [];
    },
    error: (error) => {
      if (error.status === 401) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
      console.error('Error:', error);
    }
  });
}
```

## 🔐 Authentication Pattern

### 1. Login Implementation
```typescript
login(credentials: LoginRequest): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/auth/login`, credentials)
    .pipe(
      tap(response => {
        const token = response.data?.accessToken || response.accessToken;
        localStorage.setItem(this.tokenKey, token);
        localStorage.setItem(this.userKey, JSON.stringify(response.data || response.user));
        this.currentUserSubject.next(response.data || response.user);
      })
    );
}
```

### 2. Auth Interceptor
```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (req.url.includes('/auth/login')) {
    return next(req);
  }

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }
  return next(req);
};
```

## 🎨 UI Pattern dengan Tailwind

### 1. Form Modal Structure
```html
<div *ngIf="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
  <div class="bg-white rounded-xl shadow-2xl w-full max-w-md">
    <div class="p-6 border-b border-gray-200">
      <h2 class="text-2xl font-bold text-gray-800">{{ isEditing ? 'Edit' : 'Add' }} [Entity]</h2>
    </div>
    
    <form (ngSubmit)="save[Entity]()" class="p-6 space-y-4">
      <!-- Form fields -->
    </form>
  </div>
</div>
```

### 2. Data Table Structure
```html
<div class="bg-white rounded-xl shadow-lg overflow-hidden">
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <!-- Headers -->
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr *ngFor="let item of items" class="hover:bg-gray-50 transition duration-150">
          <!-- Data cells -->
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

## 📝 Prompt Template yang Efektif

### Untuk Membuat CRUD Baru
```
"Buat CRUD untuk [entity] berdasarkan Swagger API [URL]. 
Gunakan pattern yang sama seperti user component dengan:
- Standalone component dengan Tailwind CSS
- Service methods untuk API calls
- Form modal untuk add/edit
- Data table untuk listing
- Error handling 401 redirect to login
- Sesuaikan field form hanya yang required di API"
```

### Untuk Debugging
```
"Ada error [pesan error]. Analisis dan perbaiki dengan:
- Cek tipe data (string vs number)
- Pastikan standalone: true jika ada imports
- Validasi API endpoint dan response structure
- Fix TypeScript compilation errors"
```

### Untuk Styling
```
"Perbaiki tampilan [component] dengan Tailwind CSS:
- Responsive design
- Consistent spacing dan colors
- Hover effects dan transitions
- Modern card-based layout"
```

## ⚠️ Common Issues & Solutions

### 1. TypeScript Errors
- **ID Type**: Selalu gunakan `string` untuk ID (UUID dari API)
- **Standalone**: Tambahkan `standalone: true` jika menggunakan `imports`
- **Required Fields**: Cek Swagger untuk field yang benar-benar required

### 2. API Integration
- **Endpoint**: Cek Swagger untuk path yang benar
- **Headers**: Tambahkan `Content-Type: application/json` untuk POST/PUT
- **Response**: Handle berbagai struktur response dengan `?.` operator

### 3. Authentication
- **Token Storage**: Gunakan `localStorage` dengan key yang konsisten
- **Interceptor**: Exclude login endpoint dari auth header
- **401 Handling**: Auto logout dan redirect ke login

## 🚀 Build & Run Commands

```bash
# Development
ng serve

# Build untuk production
ng build

# Check compilation errors
ng build --dry-run

# Generate component
ng generate component components/[nama] --skip-tests
```

## 📋 Checklist Sebelum Deploy

- [ ] All TypeScript errors resolved
- [ ] Authentication flow working
- [ ] API endpoints correct
- [ ] Responsive design tested
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Form validation working
- [ ] CRUD operations tested

---

**Catatan**: Selalu cek Swagger API documentation untuk memastikan request/response format yang benar sebelum implementasi.