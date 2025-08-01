<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Dashboard Header -->
    <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              Analytics Dashboard
            </h1>
            <Badge variant="success" size="sm">Live</Badge>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- Date Range Selector -->
            <Select
              v-model="selectedDateRange"
              :options="dateRangeOptions"
              class="w-40"
            />
            
            <!-- Refresh Button -->
            <Button
              variant="outline"
              size="sm" 
              @click="refreshData"
              :loading="isRefreshing"
            >
              <ArrowPathIcon class="h-4 w-4 mr-2" />
              Refresh
            </Button>
            
            <!-- Export Button -->
            <Button variant="primary" size="sm" @click="exportData">
              <ArrowDownTrayIcon class="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Key Metrics Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Stats
          :value="totalRevenue"
          label="Total Revenue"
          format="currency"
          :trend-value="12.5"
          trend="up"
          :icon="CurrencyDollarIcon"
          variant="card"
          color="success"
          :show-progress="true"
          :progress="85"
        />
        
        <Stats
          :value="totalUsers"
          label="Active Users"
          format="number"
          :trend-value="8.2"
          trend="up"
          :icon="UserGroupIcon"
          variant="card"
          color="primary"
        />
        
        <Stats
          :value="conversionRate"
          label="Conversion Rate"
          format="percentage"
          :trend-value="2.1"
          trend="down"
          :icon="ChartBarIcon"
          variant="card"
          color="warning"
        />
        
        <Stats
          :value="averageOrderValue"
          label="Avg. Order Value"
          format="currency"
          :trend-value="5.7"
          trend="up"
          :icon="ShoppingCartIcon"
          variant="card"
          color="default"
        />
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Revenue Chart -->
        <Card title="Revenue Overview" variant="bordered">
          <template #headerActions>
            <div class="flex space-x-2">
              <Button
                v-for="period in chartPeriods"
                :key="period.value"
                :variant="selectedChartPeriod === period.value ? 'primary' : 'ghost'"
                size="sm"
                @click="selectedChartPeriod = period.value"
              >
                {{ period.label }}
              </Button>
            </div>
          </template>
          
          <div class="h-80 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="text-center">
              <ChartBarIcon class="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p class="text-gray-500 dark:text-gray-400">Revenue Chart Placeholder</p>
              <p class="text-sm text-gray-400">{{ selectedChartPeriod }} view</p>
            </div>
          </div>
        </Card>

        <!-- User Activity Chart -->
        <Card title="User Activity" variant="bordered">
          <template #headerActions>
            <Popover placement="bottom-end">
              <template #trigger>
                <Button variant="ghost" size="sm">
                  <EllipsisHorizontalIcon class="h-4 w-4" />
                </Button>
              </template>
              <div class="py-2">
                <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                  View Details
                </button>
                <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                  Export Data
                </button>
                <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                  Configure
                </button>
              </div>
            </Popover>
          </template>
          
          <div class="h-80 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="text-center">
              <UserGroupIcon class="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p class="text-gray-500 dark:text-gray-400">User Activity Chart</p>
            </div>
          </div>
        </Card>
      </div>

      <!-- Data Tables and Lists -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Recent Orders -->
        <div class="lg:col-span-2">
          <Card title="Recent Orders" variant="bordered">
            <template #headerActions>
              <Button variant="outline" size="sm" href="/orders">
                View All
              </Button>
            </template>
            
            <DataTable
              :columns="orderColumns"
              :data="recentOrders"
              :paginated="false"
              :selectable="true"
            >
              <template #cell-status="{ value }">
                <Badge :variant="getOrderStatusVariant(value)">
                  {{ value }}
                </Badge>
              </template>
              
              <template #cell-amount="{ value }">
                {{ formatCurrency(value) }}
              </template>
              
              <template #actions="{ row }">
                <div class="flex space-x-2">
                  <Button size="sm" variant="ghost" @click="viewOrder(row)">
                    View
                  </Button>
                  <Button size="sm" variant="ghost" @click="editOrder(row)">
                    Edit
                  </Button>
                </div>
              </template>
            </DataTable>
          </Card>
        </div>

        <!-- Top Products -->
        <Card title="Top Products" variant="bordered">
          <template #headerActions>
            <Select
              v-model="topProductsPeriod"
              :options="[
                { value: 'today', label: 'Today' },
                { value: 'week', label: 'This Week' },
                { value: 'month', label: 'This Month' }
              ]"
              class="w-32"
            />
          </template>
          
          <div class="space-y-4">
            <div
              v-for="(product, index) in topProducts"
              :key="product.id"
              class="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <div class="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                {{ index + 1 }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {{ product.name }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ product.sales }} sales
                </p>
              </div>
              <div class="text-sm font-medium text-gray-900 dark:text-white">
                {{ formatCurrency(product.revenue) }}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- Activity Feed & Notifications -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Activity Timeline -->
        <Card title="Recent Activity" variant="bordered">
          <template #headerActions>
            <div class="flex items-center space-x-2">
              <Toggle
                v-model="autoRefreshActivity"
                label="Auto-refresh"
                size="sm"
              />
            </div>
          </template>
          
          <Timeline :items="activityItems" variant="compact">
            <template #icon-success="{ item }">
              <div class="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                <CheckIcon class="h-3 w-3" />
              </div>
            </template>
            
            <template #icon-warning="{ item }">
              <div class="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-white">
                <ExclamationTriangleIcon class="h-3 w-3" />
              </div>
            </template>
            
            <template #icon-error="{ item }">
              <div class="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white">
                <XMarkIcon class="h-3 w-3" />
              </div>
            </template>
          </Timeline>
        </Card>

        <!-- System Status -->
        <Card title="System Status" variant="bordered">
          <div class="space-y-4">
            <!-- Server Status -->
            <div class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    API Server
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    All systems operational
                  </p>
                </div>
              </div>
              <Badge variant="success" size="sm">Healthy</Badge>
            </div>

            <!-- Database Status -->
            <div class="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    Database
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    High response time detected
                  </p>
                </div>
              </div>
              <Badge variant="warning" size="sm">Warning</Badge>
            </div>

            <!-- CDN Status -->
            <div class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    CDN
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Global delivery optimized
                  </p>
                </div>
              </div>
              <Badge variant="success" size="sm">Optimal</Badge>
            </div>

            <!-- Quick Actions -->
            <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div class="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" full-width>
                  <Cog6ToothIcon class="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" size="sm" full-width>
                  <DocumentTextIcon class="h-4 w-4 mr-2" />
                  Logs
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- Advanced Widgets -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Goal Progress -->
        <Card title="Monthly Goals" variant="bordered">
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-600 dark:text-gray-400">Revenue</span>
                <span class="font-medium">85%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div class="bg-green-500 h-2 rounded-full" style="width: 85%"></div>
              </div>
            </div>
            
            <div>
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-600 dark:text-gray-400">New Users</span>
                <span class="font-medium">72%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div class="bg-blue-500 h-2 rounded-full" style="width: 72%"></div>
              </div>
            </div>
            
            <div>
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-600 dark:text-gray-400">Retention</span>
                <span class="font-medium">95%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div class="bg-purple-500 h-2 rounded-full" style="width: 95%"></div>
              </div>
            </div>
          </div>
        </Card>

        <!-- Quick Stats -->
        <Card title="Quick Stats" variant="bordered">
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400">Bounce Rate</span>
              <span class="text-sm font-medium text-red-600">42.3%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400">Session Duration</span>
              <span class="text-sm font-medium text-green-600">4m 32s</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400">Page Views</span>
              <span class="text-sm font-medium">2.4M</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400">Cart Abandonment</span>
              <span class="text-sm font-medium text-orange-600">28.1%</span>
            </div>
          </div>
        </Card>

        <!-- Weather Widget -->
        <Card title="Weather" variant="bordered">
          <div class="text-center">
            <div class="text-3xl mb-2">☀️</div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              24°C
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Sunny, San Francisco
            </div>
            <div class="text-xs text-gray-500 space-y-1">
              <div class="flex justify-between">
                <span>Humidity</span>
                <span>65%</span>
              </div>
              <div class="flex justify-between">
                <span>Wind</span>
                <span>12 km/h</span>
              </div>
            </div>
          </div>
        </Card>

        <!-- Team Status -->
        <Card title="Team Online" variant="bordered">
          <div class="space-y-3">
            <div class="flex items-center space-x-3">
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
                size="sm"
                status="online"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                  John Doe
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Product Manager
                </p>
              </div>
            </div>
            
            <div class="flex items-center space-x-3">
              <Avatar
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100"
                size="sm"
                status="away"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                  Sarah Wilson
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Developer
                </p>
              </div>
            </div>
            
            <div class="flex items-center space-x-3">
              <Avatar
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                size="sm"
                status="offline"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                  Mike Chen
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Designer
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToastStore } from '@/store/useToastStore'
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ChartBarIcon,
  CheckIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  EllipsisHorizontalIcon,
  ExclamationTriangleIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import {
  Avatar,
  Badge,
  Button,
  Card,
  DataTable,
  Popover,
  Select,
  Stats,
  Timeline,
  Toggle
} from '@/components'

const toastStore = useToastStore()

// Dashboard state
const selectedDateRange = ref('30d')
const selectedChartPeriod = ref('7d')
const topProductsPeriod = ref('week')
const autoRefreshActivity = ref(true)
const isRefreshing = ref(false)

// Mock data
const totalRevenue = ref(284750)
const totalUsers = ref(12543)
const conversionRate = ref(3.2)
const averageOrderValue = ref(125.50)

const dateRangeOptions = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: 'custom', label: 'Custom range' }
]

const chartPeriods = [
  { value: '7d', label: '7D' },
  { value: '30d', label: '30D' },
  { value: '90d', label: '90D' },
  { value: '1y', label: '1Y' }
]

const orderColumns = [
  { key: 'id', label: 'Order ID', sortable: true },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'status', label: 'Status', sortable: false },
  { key: 'amount', label: 'Amount', sortable: true, format: 'currency' },
  { key: 'date', label: 'Date', sortable: true, format: 'date' }
]

const recentOrders = ref([
  {
    id: '#ORD-001',
    customer: 'John Smith',
    status: 'completed',
    amount: 299.99,
    date: '2024-01-15'
  },
  {
    id: '#ORD-002', 
    customer: 'Sarah Johnson',
    status: 'processing',
    amount: 149.50,
    date: '2024-01-15'
  },
  {
    id: '#ORD-003',
    customer: 'Mike Wilson',
    status: 'shipped',
    amount: 89.99,
    date: '2024-01-14'
  },
  {
    id: '#ORD-004',
    customer: 'Emma Davis',
    status: 'cancelled',
    amount: 199.99,
    date: '2024-01-14'
  }
])

const topProducts = ref([
  { id: 1, name: 'Wireless Headphones', sales: 245, revenue: 12250 },
  { id: 2, name: 'Smart Watch', sales: 189, revenue: 37800 },
  { id: 3, name: 'Laptop Stand', sales: 156, revenue: 7800 },
  { id: 4, name: 'USB-C Hub', sales: 134, revenue: 6700 },
  { id: 5, name: 'Desk Lamp', sales: 98, revenue: 4900 }
])

const activityItems = ref([
  {
    id: 1,
    type: 'success',
    title: 'Order Completed',
    description: 'Order #ORD-001 has been completed successfully',
    timestamp: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: 2,
    type: 'warning',
    title: 'Low Stock Alert',
    description: 'Wireless Headphones running low (5 units left)',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: 3,
    type: 'default',
    title: 'New User Registration',
    description: 'Emma Davis created a new account',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
  },
  {
    id: 4,
    type: 'error',
    title: 'Payment Failed',
    description: 'Payment processing failed for order #ORD-005',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
  }
])

// Methods
const getOrderStatusVariant = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success'
    case 'processing':
      return 'warning'
    case 'shipped':
      return 'info'
    case 'cancelled':
      return 'error'
    default:
      return 'secondary'
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const refreshData = async () => {
  isRefreshing.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    toastStore.success('Data Refreshed', 'Dashboard data has been updated.')
  } finally {
    isRefreshing.value = false
  }
}

const exportData = () => {
  toastStore.info('Export Started', 'Your report will be ready shortly.')
}

const viewOrder = (order: any) => {
  toastStore.info('Order Details', `Viewing details for ${order.id}`)
}

const editOrder = (order: any) => {
  toastStore.info('Edit Order', `Editing ${order.id}`)
}
</script>