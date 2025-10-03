import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Added CommonModule for NgClass

// Removed KpiValuePipe definition and imports to resolve NG0906 error.
// The formatting logic is moved to a method in the App component.

// --- Data Models ---
interface Kpi {
  title: string;
  value: number;
  unit: string; // e.g., '%', 'users'
  color: string; // Tailwind color class suffix
  icon: string; // Arrow direction
}

interface RenewalItem {
  productName: string;
  totalCustomers: number;
  customersLT0: number; // Renewed (<0 in old design)
  customers0_30: number; // 0-30 Days
  customers31_60: number; // 31-60 Days
  customers61Plus: number; // 61+ Days Late (High Risk)
}

interface ChartData {
  name: string;
  value: number;
  extra?: { code: string };
}

// --- Main Application Component ---
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], // <-- FIX: Added CommonModule to allow [ngClass] binding
  template: `
    <div class="min-h-screen bg-gray-50 p-4 md:p-8">
      <!-- Header / Search Bar -->
      <header class="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-white rounded-xl shadow-sm">
        <h1 class="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Admin Dashboard</h1>
        <div class="relative w-full sm:w-80">
          <input
            type="search"
            placeholder="Search..."
            class="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          />
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div class="hidden sm:flex items-center space-x-4 ml-6">
            <div class="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
            </div>
            <div class="h-10 w-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-semibold">JD</div>
        </div>
      </header>

      <!-- KPI Cards Row -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        @for (kpi of kpis(); track kpi.title) {
          <div class="bg-white p-5 rounded-xl shadow-md border-t-4 border-{{kpi.color}}-500 transition duration-300 hover:shadow-lg">
            <div class="flex justify-between items-start">
              <h2 class="text-sm font-medium text-gray-500 uppercase">{{ kpi.title }}</h2>
              <!-- Icon/Indicator -->
              <div [class]="'text-' + kpi.color + '-500'">
                @if (kpi.icon === 'up') {
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                } @else if (kpi.icon === 'down') {
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                } @else {
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                }
              </div>
            </div>
            <p class="mt-1 text-3xl font-extrabold text-gray-900">
              {{ formatValue(kpi.value) }}{{ kpi.unit }}
            </p>
          </div>
        }
      </section>

      <!-- Main Content Grid -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Renewal Summary Table (2/3 width) -->
        <div class="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Customer Renewal Summary Table</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Product Name</th>
                  <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Customers</th>
                  <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active (<0)</th>
                  <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">0-30 Days Due</th>
                  <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">31-60 Days Late</th>
                  <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">61+ Days Late</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                @for (item of renewalData(); track item.productName) {
                  <tr>
                    <td class="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.productName }}</td>
                    <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-500">{{ item.totalCustomers }}</td>
                    <td class="px-3 py-3 whitespace-nowrap text-sm text-blue-600">{{ item.customersLT0 }}</td>
                    <td [ngClass]="{'bg-yellow-100 text-yellow-800 font-semibold': item.customers0_30 > 0}"
                        class="px-3 py-3 whitespace-nowrap text-sm transition duration-150 rounded-sm">{{ item.customers0_30 }}</td>
                    <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-500">{{ item.customers31_60 }}</td>
                    <td [ngClass]="{'bg-red-100 text-red-800 font-semibold': item.customers61Plus > 0}"
                        class="px-3 py-3 whitespace-nowrap text-sm transition duration-150 rounded-sm">{{ item.customers61Plus }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Charts Section (1/3 width) -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Monthly Transactions Chart -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold text-gray-800">Z-Pay Monthly Transactions (2024-2025)</h2>
              <select class="text-sm border border-gray-300 rounded-lg p-1">
                <option>Filter 26 range</option>
                <option>Last 12 months</option>
              </select>
            </div>
            
            <!-- ngx-charts Line Chart Simulation -->
            <div class="h-48 flex flex-col justify-end">
                <div class="flex items-end h-full w-full relative">
                    <!-- Y Axis Labels -->
                    <div class="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 w-4 pb-4 pt-2">
                        <span>3</span>
                        <span>2</span>
                        <span>1</span>
                        <span>0</span>
                    </div>
                    <!-- Chart area -->
                    <div class="flex-grow ml-4 h-full relative border-l border-b border-gray-300">
                        <svg class="w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="none">
                            <!-- Horizontal Grid Lines -->
                            <line x1="0" y1="100" x2="300" y2="100" stroke="#f0f0f0" stroke-width="1"/>
                            <line x1="0" y1="50" x2="300" y2="50" stroke="#f0f0f0" stroke-width="1"/>
                            <line x1="0" y1="0" x2="300" y2="0" stroke="#f0f0f0" stroke-width="1"/>
                            
                            <!-- Path Data (Example: Jan low -> Mar up -> May down -> Oct up) -->
                            <polyline
                                fill="none"
                                stroke="#3b82f6"
                                stroke-width="2"
                                points="
                                    0,140 
                                    30,120 
                                    60,130
                                    90,110
                                    120,80
                                    150,100
                                    180,60
                                    210,30
                                    240,5
                                    270,10
                                    300,40
                                "/>
                            <!-- Data Points -->
                            <circle cx="0" cy="140" r="2" fill="#3b82f6"/>
                            <circle cx="30" cy="120" r="2" fill="#3b82f6"/>
                            <circle cx="60" cy="130" r="2" fill="#3b82f6"/>
                            <circle cx="90" cy="110" r="2" fill="#3b82f6"/>
                            <circle cx="120" cy="80" r="2" fill="#3b82f6"/>
                            <circle cx="150" cy="100" r="2" fill="#3b82f6"/>
                            <circle cx="180" cy="60" r="2" fill="#3b82f6"/>
                            <circle cx="210" cy="30" r="2" fill="#3b82f6"/>
                            <circle cx="240" cy="5" r="2" fill="#3b82f6"/>
                            <circle cx="270" cy="10" r="2" fill="#3b82f6"/>
                            <circle cx="300" cy="40" r="2" fill="#3b82f6"/>
                        </svg>
                    </div>
                </div>
                <!-- X Axis Labels -->
                <div class="flex justify-between ml-4 mt-1 text-xs text-gray-500">
                    @for (data of transactionData(); track data.name) {
                        <span>{{ data.name }}</span>
                    }
                </div>
            </div>
            
          </div>

          <!-- Product Transaction Breakdown Chart -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Product Transaction Breakdown</h2>
            
            <!-- ngx-charts Pie Chart Simulation -->
            <div class="flex items-center justify-center space-x-6">
                <!-- Pie Chart SVG -->
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <!-- Outer Circle -->
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" stroke-width="100" clip-path="url(#pie-mask)"/>
                    
                    <!-- Pie Slices (Simulated: Z-Pay 40%, eduSys-School 25%, Tally ERP 15%, Others 20%) -->
                    <!-- Z-Pay (Blue) - starting at 0, covering 40% (144 deg) -->
                    <path d="M50 50 L50 5 A45 45 0 0 1 85.8 84.5 L50 50 Z" fill="#2563eb" stroke="white" stroke-width="1" />
                    <!-- eduSys-School (Green) - starting at 144 deg, covering 25% (90 deg) -->
                    <path d="M50 50 L85.8 84.5 A45 45 0 0 1 50 95 L50 50 Z" fill="#10b981" stroke="white" stroke-width="1" />
                    <!-- Tally ERP (Yellow) - starting at 234 deg, covering 15% (54 deg) -->
                    <path d="M50 50 L50 95 A45 45 0 0 1 14.2 84.5 L50 50 Z" fill="#fbbf24" stroke="white" stroke-width="1" />
                    <!-- Others (Gray) - starting at 288 deg, covering 20% (72 deg) -->
                    <path d="M50 50 L14.2 84.5 A45 45 0 0 1 50 5 L50 50 Z" fill="#9ca3af" stroke="white" stroke-width="1" />

                    <!-- Donut Hole -->
                    <circle cx="50" cy="50" r="30" fill="white"/>
                </svg>
                
                <!-- Legend -->
                <div class="text-sm space-y-1">
                    @for (item of productBreakdownData(); track item.name) {
                        <div class="flex items-center">
                            <span [class]="'inline-block w-3 h-3 rounded-full mr-2 bg-' + item.extra?.code + '-500'"></span>
                            <span>{{ item.name }} ({{ item.value }}%)</span>
                        </div>
                    }
                </div>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [
    `
      /* Custom styles for the table to ensure border collapse and responsiveness */
      table {
        border-collapse: separate;
        border-spacing: 0;
      }
      th:first-child, td:first-child {
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
      }
      th:last-child, td:last-child {
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
      }

      /* Tailwind Utility colors used: blue, yellow, red, green, indigo */
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // Method to replace KpiValuePipe logic
  formatValue(value: number): string {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k';
    }
    return value.toString();
  }

  // --- STATE AND DATA DEFINITIONS using Signals ---

  // 1. KPI Data
  kpis = signal<Kpi[]>([
    { title: 'Total Customers', value: 187, unit: ' ', color: 'blue', icon: 'up' },
    { title: 'Renewals Due (0-30 Days)', value: 15, unit: ' ', color: 'yellow', icon: 'down' },
    { title: 'High Risk (61+ Days Late)', value: 42, unit: ' ', color: 'red', icon: 'down' },
    { title: 'Avg. Renewal Rate', value: 85, unit: '%', color: 'green', icon: 'up' },
  ]);

  // 2. Renewal Summary Table Data
  renewalData = signal<RenewalItem[]>([
    { productName: 'Z-Pay', totalCustomers: 184, customersLT0: 154, customers0_30: 3, customers31_60: 3, customers61Plus: 24 },
    { productName: 'eduSys-School', totalCustomers: 20, customersLT0: 12, customers0_30: 0, customers31_60: 0, customers61Plus: 8 },
    { productName: 'eduSys-College', totalCustomers: 5, customersLT0: 5, customers0_30: 0, customers31_60: 0, customers61Plus: 0 },
    { productName: 'Busy', totalCustomers: 4, customersLT0: 4, customers0_30: 0, customers31_60: 0, customers61Plus: 0 },
    { productName: 'Tally ERP', totalCustomers: 10, customersLT0: 10, customers0_30: 0, customers31_60: 0, customers61Plus: 0 },
    { productName: 'Biometric Machine', totalCustomers: 11, customersLT0: 11, customers0_30: 0, customers31_60: 0, customers61Plus: 0 },
    { productName: 'Z-Pay Portal', totalCustomers: 1, customersLT0: 1, customers0_30: 0, customers31_60: 0, customers61Plus: 0 },
  ]);

  // 3. Transaction Line Chart Data (Mock data suitable for ngx-charts series)
  transactionData = signal<ChartData[]>([
    { name: 'Jan', value: 1 },
    { name: 'Feb', value: 1.5 },
    { name: 'Mar', value: 1.2 },
    { name: 'Apr', value: 0.8 },
    { name: 'May', value: 2.1 },
    { name: 'Jun', value: 1.8 },
    { name: 'Jul', value: 2.5 },
    { name: 'Aug', value: 2.7 },
    { name: 'Sep', value: 3.5 },
    { name: 'Oct', value: 4 },
    { name: 'Nov', value: 3.8 },
    { name: 'Dec', value: 4.5 },
  ]);

  // 4. Product Breakdown Pie Chart Data (Mock data suitable for ngx-charts single)
  productBreakdownData = signal<ChartData[]>([
    { name: 'Z-Pay', value: 40, extra: { code: 'blue' } },
    { name: 'eduSys-School', value: 25, extra: { code: 'green' } },
    { name: 'Tally ERP', value: 15, extra: { code: 'yellow' } },
    { name: 'Others', value: 20, extra: { code: 'gray' } },
  ]);
}
