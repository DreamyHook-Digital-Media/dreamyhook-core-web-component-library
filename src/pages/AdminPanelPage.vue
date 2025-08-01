<template>
  <DashboardLayout
    app-name="Admin Panel"
    :user="currentUser"
    :sidebar-items="sidebarItems"
    :breadcrumbs="breadcrumbs"
    page-title="System Administration"
    page-description="Manage users, settings, and system configuration"
  >
    <template #page-actions>
      <div class="flex space-x-3">
        <Button variant="outline" size="sm" @click="exportSystemData">
          <ArrowDownTrayIcon class="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button variant="primary" size="sm" @click="showSystemSettings = true">
          <Cog6ToothIcon class="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
    </template>

    <div class="space-y-8">
      <!-- System Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stats
          :value="systemStats.totalUsers"
          label="Total Users"
          format="number"
          :trend-value="8.2"
          trend="up"
          :icon="UserGroupIcon"
          variant="card"
          color="primary"
        />
        
        <Stats
          :value="systemStats.activeUsers"
          label="Active Users"
          format="number"
          :trend-value="12.5"
          trend="up"
          :icon="UserIcon"
          variant="card"
          color="success"
        />
        
        <Stats
          :value="systemStats.serverUptime"
          label="Server Uptime"
          unit="%"
          :trend-value="0.1"
          trend="up"
          :icon="ServerIcon"
          variant="card"
          color="default"
          :show-progress="true"
          :progress="99.9"
        />
        
        <Stats
          :value="systemStats.storageUsed"
          label="Storage Used"
          unit="GB"
          :trend-value="5.3"
          trend="up"
          :icon="CircleStackIcon"
          variant="card"
          color="warning"
          :show-progress="true"
          :progress="67"
        />
      </div>

      <!-- User Management Section -->
      <Card title="User Management" variant="bordered">
        <template #headerActions>
          <div class="flex space-x-2">
            <Button variant="outline" size="sm" @click="showUserFilters = !showUserFilters">
              <FunnelIcon class="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="primary" size="sm" @click="showCreateUser = true">
              <PlusIcon class="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </template>

        <!-- User Filters -->
        <div v-if="showUserFilters" class="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormField label="Search Users">
              <TextInput
                v-model="userFilters.search"
                placeholder="Search by name or email..."
              />
            </FormField>
            
            <FormField label="Role">
              <Select
                v-model="userFilters.role"
                :options="roleOptions"
                placeholder="All Roles"
              />
            </FormField>
            
            <FormField label="Status">
              <Select
                v-model="userFilters.status"
                :options="statusOptions"
                placeholder="All Statuses"
              />
            </FormField>
            
            <FormField label="Registration Date">
              <Select
                v-model="userFilters.dateRange"
                :options="dateRangeOptions"
                placeholder="All Time"
              />
            </FormField>
          </div>
          
          <div class="flex justify-between mt-4">
            <Button variant="ghost" size="sm" @click="clearUserFilters">
              Clear Filters
            </Button>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{ filteredUsers.length }} users found
            </div>
          </div>
        </div>

        <!-- Users Table -->
        <DataTable
          :columns="userColumns"
          :data="paginatedUsers"
          :loading="loadingUsers"
          :selectable="true"
          :clickable-rows="true"
          :paginated="true"
          :current-page="userCurrentPage"
          :page-size="userPageSize"
          @page-change="userCurrentPage = $event"
          @page-size-change="userPageSize = $event"
          @row-click="viewUserDetails"
        >
          <template #cell-avatar="{ row }">
            <Avatar
              :src="row.avatar"
              :initials="getInitials(row.name)"
              size="sm"
              :status="row.status === 'active' ? 'online' : 'offline'"
            />
          </template>
          
          <template #cell-status="{ value }">
            <Badge :variant="getUserStatusVariant(value)">
              {{ value }}
            </Badge>
          </template>
          
          <template #cell-role="{ value }">
            <Badge :variant="getRoleVariant(value)">
              {{ value }}
            </Badge>
          </template>
          
          <template #cell-lastActive="{ value }">
            <Tooltip :content="formatFullDate(value)">
              <span class="text-sm text-gray-600 dark:text-gray-400">
                {{ formatRelativeTime(value) }}
              </span>
            </Tooltip>
          </template>
          
          <template #actions="{ row }">
            <div class="flex space-x-1">
              <Button size="sm" variant="ghost" @click="editUser(row)">
                <PencilIcon class="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" @click="impersonateUser(row)">
                <UserIcon class="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                @click="toggleUserStatus(row)"
                :class="row.status === 'active' ? 'text-red-600' : 'text-green-600'"
              >
                <span v-if="row.status === 'active'">
                  <NoSymbolIcon class="h-4 w-4" />
                </span>
                <span v-else>
                  <CheckIcon class="h-4 w-4" />
                </span>
              </Button>
            </div>
          </template>
        </DataTable>
      </Card>

      <!-- System Logs & Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Activity -->
        <Card title="Recent System Activity" variant="bordered">
          <template #headerActions>
            <div class="flex items-center space-x-2">
              <Toggle
                v-model="autoRefreshLogs"
                label="Auto-refresh"
                size="sm"
              />
              <Button variant="ghost" size="sm" @click="refreshLogs">
                <ArrowPathIcon class="h-4 w-4" />
              </Button>
            </div>
          </template>
          
          <Timeline :items="systemLogs" variant="compact">
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
            
            <template #icon-info="{ item }">
              <div class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
                <InformationCircleIcon class="h-3 w-3" />
              </div>
            </template>
          </Timeline>
        </Card>

        <!-- System Health -->
        <Card title="System Health" variant="bordered">
          <div class="space-y-6">
            <!-- Server Metrics -->
            <div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Server Metrics
              </h4>
              <div class="space-y-3">
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-600 dark:text-gray-400">CPU Usage</span>
                    <span class="font-medium">{{ systemHealth.cpu }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      class="h-2 rounded-full transition-all duration-300"
                      :class="systemHealth.cpu > 80 ? 'bg-red-500' : systemHealth.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'"
                      :style="{ width: `${systemHealth.cpu}%` }"
                    />
                  </div>
                </div>
                
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-600 dark:text-gray-400">Memory Usage</span>
                    <span class="font-medium">{{ systemHealth.memory }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      class="h-2 rounded-full transition-all duration-300"
                      :class="systemHealth.memory > 80 ? 'bg-red-500' : systemHealth.memory > 60 ? 'bg-yellow-500' : 'bg-green-500'"
                      :style="{ width: `${systemHealth.memory}%` }"
                    />
                  </div>
                </div>
                
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-600 dark:text-gray-400">Disk Usage</span>
                    <span class="font-medium">{{ systemHealth.disk }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      class="h-2 rounded-full transition-all duration-300"
                      :class="systemHealth.disk > 80 ? 'bg-red-500' : systemHealth.disk > 60 ? 'bg-yellow-500' : 'bg-green-500'"
                      :style="{ width: `${systemHealth.disk}%` }"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Service Status -->
            <div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Service Status
              </h4>
              <div class="space-y-2">
                <div
                  v-for="service in systemServices"
                  :key="service.name"
                  class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div class="flex items-center space-x-3">
                    <div
                      :class="[
                        'w-2 h-2 rounded-full',
                        service.status === 'running' ? 'bg-green-500' : 
                        service.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      ]"
                    />
                    <span class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ service.name }}
                    </span>
                  </div>
                  <Badge
                    :variant="service.status === 'running' ? 'success' : service.status === 'warning' ? 'warning' : 'error'"
                    size="sm"
                  >
                    {{ service.status }}
                  </Badge>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div class="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" full-width @click="showSystemLogs">
                  <DocumentTextIcon class="h-4 w-4 mr-2" />
                  View Logs
                </Button>
                <Button variant="outline" size="sm" full-width @click="restartServices">
                  <ArrowPathIcon class="h-4 w-4 mr-2" />
                  Restart
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- Security & Permissions -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Security Alerts -->
        <Card title="Security Alerts" variant="bordered">
          <div class="space-y-3">
            <Alert
              variant="warning"
              title="Failed Login Attempts"
              message="15 failed login attempts detected from IP 192.168.1.100"
              :dismissible="true"
              action-text="Block IP"
              @action="blockSuspiciousIP"
            />
            
            <Alert
              variant="info"
              title="Password Policy Update"
              message="New password requirements will take effect tomorrow"
              :dismissible="true"
            />
            
            <Alert
              variant="error"
              title="Suspicious Activity"
              message="Unusual API usage pattern detected"
              :dismissible="true"
              action-text="Investigate"
              @action="investigateSuspiciousActivity"
            />
          </div>
        </Card>

        <!-- Role Management -->
        <Card title="Role & Permissions" variant="bordered">
          <template #headerActions>
            <Button variant="primary" size="sm" @click="showRoleManager = true">
              <PlusIcon class="h-4 w-4 mr-2" />
              Manage
            </Button>
          </template>
          
          <div class="space-y-3">
            <div
              v-for="role in systemRoles"
              :key="role.name"
              class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div>
                <div class="font-medium text-gray-900 dark:text-white">
                  {{ role.name }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  {{ role.userCount }} users
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <Badge :variant="getRoleVariant(role.name)" size="sm">
                  {{ role.permissions }} perms
                </Badge>
                <Button variant="ghost" size="sm" @click="editRole(role)">
                  <PencilIcon class="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <!-- System Backup -->
        <Card title="System Backup" variant="bordered">
          <div class="space-y-4">
            <div class="text-center">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Last Backup
              </div>
              <div class="text-lg font-medium text-gray-900 dark:text-white">
                2 hours ago
              </div>
              <Badge variant="success" size="sm">
                Successful
              </Badge>
            </div>
            
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Database</span>
                <span class="text-green-600">✓ Complete</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Files</span>
                <span class="text-green-600">✓ Complete</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Configurations</span>
                <span class="text-green-600">✓ Complete</span>
              </div>
            </div>
            
            <div class="grid grid-cols-1 gap-2 pt-4 border-t">
              <Button variant="primary" size="sm" full-width @click="createBackup">
                Create Backup
              </Button>
              <Button variant="outline" size="sm" full-width @click="restoreBackup">
                Restore Backup
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>

    <!-- Create User Modal -->
    <Modal
      v-model:isOpen="showCreateUser"
      title="Create New User"
      size="lg"
    >
      <form @submit.prevent="createUser" class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <FormField label="First Name" required>
            <TextInput v-model="newUser.firstName" />
          </FormField>
          <FormField label="Last Name" required>
            <TextInput v-model="newUser.lastName" />
          </FormField>
        </div>
        
        <FormField label="Email Address" required>
          <TextInput v-model="newUser.email" type="email" />
        </FormField>
        
        <FormField label="Role" required>
          <Select
            v-model="newUser.role"
            :options="roleOptions"
            placeholder="Select role"
          />
        </FormField>
        
        <FormField label="Department">
          <Select
            v-model="newUser.department"
            :options="departmentOptions"
            placeholder="Select department"
          />
        </FormField>
        
        <FormField label="Permissions">
          <div class="space-y-2">
            <Checkbox
              v-for="permission in availablePermissions"
              :key="permission.value"
              v-model="newUser.permissions"
              :value="permission.value"
              :label="permission.label"
            />
          </div>
        </FormField>
        
        <div class="flex justify-end space-x-3 pt-6 border-t">
          <Button variant="outline" @click="showCreateUser = false">
            Cancel
          </Button>
          <Button type="submit" variant="primary" :loading="creatingUser">
            Create User
          </Button>
        </div>
      </form>
    </Modal>

    <!-- System Settings Modal -->
    <Modal
      v-model:isOpen="showSystemSettings"
      title="System Settings"
      size="full"
    >
      <Tabs
        v-model="settingsTab"
        :items="settingsTabs"
        variant="underline"
      >
        <template #general>
          <div class="space-y-6 p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              General Settings
            </h3>
            
            <div class="grid grid-cols-2 gap-6">
              <FormField label="Site Name">
                <TextInput v-model="systemSettings.siteName" />
              </FormField>
              
              <FormField label="Admin Email">
                <TextInput v-model="systemSettings.adminEmail" type="email" />
              </FormField>
              
              <FormField label="Timezone">
                <Select
                  v-model="systemSettings.timezone"
                  :options="timezoneOptions"
                />
              </FormField>
              
              <FormField label="Language">
                <Select
                  v-model="systemSettings.language"
                  :options="languageOptions"
                />
              </FormField>
            </div>
            
            <div class="space-y-4">
              <Toggle
                v-model="systemSettings.maintenanceMode"
                label="Maintenance Mode"
              />
              
              <Toggle
                v-model="systemSettings.userRegistration"
                label="Allow User Registration"
              />
              
              <Toggle
                v-model="systemSettings.emailNotifications"
                label="Email Notifications"
              />
            </div>
          </div>
        </template>
        
        <template #security>
          <div class="space-y-6 p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              Security Settings
            </h3>
            
            <div class="grid grid-cols-2 gap-6">
              <FormField label="Session Timeout (minutes)">
                <TextInput
                  v-model="systemSettings.sessionTimeout"
                  type="number"
                />
              </FormField>
              
              <FormField label="Max Login Attempts">
                <TextInput
                  v-model="systemSettings.maxLoginAttempts"
                  type="number"
                />
              </FormField>
            </div>
            
            <div class="space-y-4">
              <Toggle
                v-model="systemSettings.twoFactorAuth"
                label="Require Two-Factor Authentication"
              />
              
              <Toggle
                v-model="systemSettings.passwordExpiry"
                label="Password Expiry (90 days)"
              />
              
              <Toggle
                v-model="systemSettings.ipWhitelist"
                label="IP Address Whitelist"
              />
            </div>
          </div>
        </template>
        
        <template #backup>
          <div class="space-y-6 p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              Backup Settings
            </h3>
            
            <div class="grid grid-cols-2 gap-6">
              <FormField label="Backup Frequency">
                <Select
                  v-model="systemSettings.backupFrequency"
                  :options="[
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'monthly', label: 'Monthly' }
                  ]"
                />
              </FormField>
              
              <FormField label="Retention Period (days)">
                <TextInput
                  v-model="systemSettings.backupRetention"
                  type="number"
                />
              </FormField>
            </div>
            
            <FormField label="Storage Location">
              <Select
                v-model="systemSettings.backupStorage"
                :options="[
                  { value: 'local', label: 'Local Storage' },
                  { value: 's3', label: 'Amazon S3' },
                  { value: 'gcs', label: 'Google Cloud Storage' }
                ]"
              />
            </FormField>
          </div>
        </template>
      </Tabs>
      
      <div class="flex justify-end space-x-3 p-6 border-t">
        <Button variant="outline" @click="showSystemSettings = false">
          Cancel
        </Button>
        <Button variant="primary" @click="saveSystemSettings">
          Save Settings
        </Button>
      </div>
    </Modal>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToastStore } from '@/store/useToastStore'
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  CheckIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  FunnelIcon,
  InformationCircleIcon,
  NoSymbolIcon,
  PencilIcon,
  PlusIcon,
  ServerIcon,
  UserGroupIcon,
  UserIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  DataTable,
  FormField,
  Modal,
  Select,
  Stats,
  Tabs,
  TextInput,
  Timeline,
  Toggle,
  Tooltip
} from '@/components'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const toastStore = useToastStore()

// Current user and navigation
const currentUser = ref({
  name: 'System Admin',
  email: 'admin@dreamyhook.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
  initials: 'SA'
})

const sidebarItems = ref([
  { id: 'dashboard', label: 'Dashboard', href: '/admin', icon: 'ChartBarIcon' },
  { id: 'users', label: 'Users', href: '/admin/users', icon: 'UserGroupIcon' },
  { id: 'roles', label: 'Roles & Permissions', href: '/admin/roles', icon: 'ShieldCheckIcon' },
  { id: 'settings', label: 'System Settings', href: '/admin/settings', icon: 'Cog6ToothIcon' },
  { id: 'logs', label: 'System Logs', href: '/admin/logs', icon: 'DocumentTextIcon' },
  { id: 'backup', label: 'Backup & Restore', href: '/admin/backup', icon: 'CircleStackIcon' }
])

const breadcrumbs = ref([
  { text: 'Admin', href: '/admin' },
  { text: 'Dashboard', href: '/admin/dashboard' }
])

// State
const showUserFilters = ref(false)
const showCreateUser = ref(false)
const showSystemSettings = ref(false)
const showRoleManager = ref(false)
const autoRefreshLogs = ref(true)
const loadingUsers = ref(false)
const creatingUser = ref(false)
const userCurrentPage = ref(1)
const userPageSize = ref(10)
const settingsTab = ref('general')

// System stats
const systemStats = ref({
  totalUsers: 2847,
  activeUsers: 1923,
  serverUptime: 99.9,
  storageUsed: 156.7
})

// System health
const systemHealth = ref({
  cpu: 34,
  memory: 67,
  disk: 43
})

// User management
const userFilters = ref({
  search: '',
  role: '',
  status: '',
  dateRange: ''
})

const newUser = ref({
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  department: '',
  permissions: []
})

// Sample users data
const users = ref([
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'admin',
    status: 'active',
    department: 'IT',
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'editor',
    status: 'active',
    department: 'Marketing',
    lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000),
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
    createdAt: '2024-01-20'
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike.wilson@company.com',
    role: 'viewer',
    status: 'inactive',
    department: 'Sales',
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    createdAt: '2024-02-01'
  },
  {
    id: 4,
    name: 'Emma Davis',
    email: 'emma.davis@company.com',
    role: 'editor',
    status: 'suspended',
    department: 'HR',
    lastActive: new Date(Date.now() - 48 * 60 * 60 * 1000),
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    createdAt: '2024-02-10'
  }
])

// System services
const systemServices = ref([
  { name: 'Web Server', status: 'running' },
  { name: 'Database', status: 'warning' },
  { name: 'Cache Server', status: 'running' },
  { name: 'Queue Worker', status: 'running' },
  { name: 'Email Service', status: 'running' }
])

// System logs
const systemLogs = ref([
  {
    id: 1,
    type: 'success',
    title: 'User Login',
    description: 'john.smith@company.com logged in successfully',
    timestamp: new Date(Date.now() - 15 * 60 * 1000)
  },
  {
    id: 2,
    type: 'warning',
    title: 'High Memory Usage',
    description: 'Server memory usage exceeded 80% threshold',
    timestamp: new Date(Date.now() - 45 * 60 * 1000)
  },
  {
    id: 3,
    type: 'error',
    title: 'Database Connection Failed',
    description: 'Failed to establish database connection (retry successful)',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: 4,
    type: 'info',
    title: 'System Backup Completed',
    description: 'Daily backup completed successfully (2.3GB)',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
  }
])

// System roles
const systemRoles = ref([
  { name: 'Super Admin', userCount: 2, permissions: 50 },
  { name: 'Admin', userCount: 8, permissions: 35 },
  { name: 'Editor', userCount: 24, permissions: 18 },
  { name: 'Viewer', userCount: 156, permissions: 5 }
])

// System settings
const systemSettings = ref({
  siteName: 'DreamyHook Admin',
  adminEmail: 'admin@dreamyhook.com',
  timezone: 'UTC',
  language: 'en',
  maintenanceMode: false,
  userRegistration: true,
  emailNotifications: true,
  sessionTimeout: 120,
  maxLoginAttempts: 5,
  twoFactorAuth: false,
  passwordExpiry: true,
  ipWhitelist: false,
  backupFrequency: 'daily',
  backupRetention: 30,
  backupStorage: 'local'
})

// Options
const roleOptions = [
  { value: 'admin', label: 'Administrator' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' }
]

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' }
]

const dateRangeOptions = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' }
]

const departmentOptions = [
  { value: 'it', label: 'IT' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'hr', label: 'Human Resources' }
]

const availablePermissions = [
  { value: 'read', label: 'Read Access' },
  { value: 'write', label: 'Write Access' },
  { value: 'delete', label: 'Delete Access' },
  { value: 'admin', label: 'Admin Access' }
]

const timezoneOptions = [
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'Eastern Time' },
  { value: 'America/Los_Angeles', label: 'Pacific Time' },
  { value: 'Europe/London', label: 'GMT' }
]

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' }
]

const settingsTabs = [
  { id: 'general', label: 'General' },
  { id: 'security', label: 'Security' },
  { id: 'backup', label: 'Backup' }
]

// Table columns
const userColumns = [
  { key: 'avatar', label: '', sortable: false },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'lastActive', label: 'Last Active', sortable: true },
  { key: 'createdAt', label: 'Created', sortable: true, format: 'date' }
]

// Computed
const filteredUsers = computed(() => {
  let filtered = users.value

  if (userFilters.value.search) {
    const search = userFilters.value.search.toLowerCase()
    filtered = filtered.filter(user =>
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)
    )
  }

  if (userFilters.value.role) {
    filtered = filtered.filter(user => user.role === userFilters.value.role)
  }

  if (userFilters.value.status) {
    filtered = filtered.filter(user => user.status === userFilters.value.status)
  }

  return filtered
})

const paginatedUsers = computed(() => {
  const start = (userCurrentPage.value - 1) * userPageSize.value
  const end = start + userPageSize.value
  return filteredUsers.value.slice(start, end)
})

// Methods
const getInitials = (name) => {
  return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase()
}

const getUserStatusVariant = (status) => {
  switch (status) {
    case 'active': return 'success'
    case 'inactive': return 'warning'
    case 'suspended': return 'error'
    default: return 'secondary'
  }
}

const getRoleVariant = (role) => {
  switch (role) {
    case 'admin': return 'error'
    case 'Super Admin': return 'error'
    case 'Admin': return 'warning'
    case 'editor': return 'primary'
    case 'Editor': return 'primary'
    case 'viewer': return 'secondary'
    case 'Viewer': return 'secondary'
    default: return 'secondary'
  }
}

const formatRelativeTime = (date) => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = diffMs / (1000 * 60 * 60)
  
  if (diffHours < 1) {
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    return `${diffMinutes}m ago`
  } else if (diffHours < 24) {
    return `${Math.floor(diffHours)}h ago`
  } else {
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d ago`
  }
}

const formatFullDate = (date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const clearUserFilters = () => {
  userFilters.value = {
    search: '',
    role: '',
    status: '',
    dateRange: ''
  }
}

const viewUserDetails = (user) => {
  toastStore.info('User Details', `Viewing details for ${user.name}`)
}

const editUser = (user) => {
  toastStore.info('Edit User', `Editing ${user.name}`)
}

const impersonateUser = (user) => {
  toastStore.warning('Impersonate User', `Impersonating ${user.name}`)
}

const toggleUserStatus = (user) => {
  const newStatus = user.status === 'active' ? 'inactive' : 'active'
  user.status = newStatus
  toastStore.success('Status Updated', `${user.name} is now ${newStatus}`)
}

const createUser = async () => {
  creatingUser.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    toastStore.success('User Created', `${newUser.value.firstName} ${newUser.value.lastName} has been created`)
    showCreateUser.value = false
    newUser.value = {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      department: '',
      permissions: []
    }
  } finally {
    creatingUser.value = false
  }
}

const exportSystemData = () => {
  toastStore.info('Export Started', 'System data export has been initiated')
}

const refreshLogs = () => {
  toastStore.success('Logs Refreshed', 'System logs have been updated')
}

const showSystemLogs = () => {
  toastStore.info('System Logs', 'Opening detailed system logs')
}

const restartServices = () => {
  toastStore.warning('Services Restarting', 'System services are being restarted')
}

const blockSuspiciousIP = () => {
  toastStore.success('IP Blocked', 'Suspicious IP address has been blocked')
}

const investigateSuspiciousActivity = () => {
  toastStore.info('Investigation Started', 'Security team has been notified')
}

const editRole = (role) => {
  toastStore.info('Edit Role', `Editing ${role.name} role`)
}

const createBackup = () => {
  toastStore.info('Backup Started', 'System backup has been initiated')
}

const restoreBackup = () => {
  toastStore.warning('Restore Backup', 'Select a backup file to restore')
}

const saveSystemSettings = () => {
  toastStore.success('Settings Saved', 'System settings have been updated')
  showSystemSettings.value = false
}

// Auto-refresh system health
onMounted(() => {
  setInterval(() => {
    if (autoRefreshLogs.value) {
      // Simulate real-time updates
      systemHealth.value.cpu = Math.floor(Math.random() * 20) + 30
      systemHealth.value.memory = Math.floor(Math.random() * 20) + 60
      systemHealth.value.disk = Math.floor(Math.random() * 10) + 40
    }
  }, 5000)
})
</script>