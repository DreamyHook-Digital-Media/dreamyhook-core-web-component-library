<template>
  <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Complex Widgets & Templates
      </h1>
      <p class="mt-2 text-lg text-gray-600 dark:text-gray-400">
        Sophisticated components combining multiple elements for rich user experiences.
      </p>
    </div>

    <div class="space-y-16">
      <!-- Cards Section -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Card Components
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Simple Card -->
          <Card
            title="Simple Card"
            subtitle="Basic card example"
            content="This is a simple card with title, subtitle, and content."
            variant="bordered"
          >
            <template #actions>
              <Button size="sm" variant="outline">View</Button>
              <Button size="sm" variant="primary">Edit</Button>
            </template>
          </Card>

          <!-- Media Card -->
          <Card
            title="Product Card"
            subtitle="$99.99"
            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
            variant="product"
            hoverable
          >
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Premium running shoes with advanced cushioning technology.
            </p>
            <template #actions>
              <Button size="sm" variant="primary" full-width>Add to Cart</Button>
            </template>
          </Card>

          <!-- Feature Card -->
          <Card
            title="Premium Plan"
            variant="feature"
            hoverable
          >
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <CheckIcon class="h-5 w-5 text-green-500" />
                <span class="text-sm">Unlimited projects</span>
              </div>
              <div class="flex items-center space-x-2">
                <CheckIcon class="h-5 w-5 text-green-500" />
                <span class="text-sm">24/7 support</span>
              </div>
              <div class="flex items-center space-x-2">
                <CheckIcon class="h-5 w-5 text-green-500" />
                <span class="text-sm">Advanced analytics</span>
              </div>
            </div>
            <template #actions>
              <Button size="sm" variant="primary" full-width>Get Started</Button>
            </template>
          </Card>
        </div>
      </section>

      <!-- Data Table Section -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Data Table
        </h2>
        
        <DataTable
          title="User Management"
          :columns="tableColumns"
          :data="tableData"
          :loading="tableLoading"
          :selectable="true"
          :clickable-rows="true"
          :paginated="true"
          :page-size="5"
          @row-click="handleRowClick"
        >
          <template #cell-status="{ value }">
            <Badge :variant="getStatusVariant(value)">
              {{ value }}
            </Badge>
          </template>
          
          <template #actions="{ row }">
            <Button size="sm" variant="ghost" @click="editUser(row)">
              Edit
            </Button>
            <Button size="sm" variant="ghost" @click="deleteUser(row)">
              Delete
            </Button>
          </template>
        </DataTable>

        <div class="mt-4 flex space-x-2">
          <Button @click="toggleTableLoading" variant="outline">
            {{ tableLoading ? 'Stop Loading' : 'Show Loading' }}
          </Button>
          <Button @click="refreshTableData" variant="outline">
            Refresh Data
          </Button>
        </div>
      </section>

      <!-- Stats Section -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Statistics Widgets
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Stats
            :value="12543"
            label="Total Users"
            format="number"
            :trend-value="12"
            trend="up"
            :icon="UserGroupIcon"
            variant="card"
            color="primary"
          />
          
          <Stats
            :value="89750"
            label="Revenue"
            format="currency"
            :trend-value="8.2"
            trend="up"
            :icon="CurrencyDollarIcon"
            variant="card"
            color="success"
          />
          
          <Stats
            :value="67.3"
            label="Conversion Rate"
            unit="%"
            :trend-value="2.1"
            trend="down"
            :icon="ChartBarIcon"
            variant="card"
            color="warning"
          />
          
          <Stats
            :value="4.8"
            label="Average Rating"
            unit="/5"
            trend="neutral"
            :icon="StarIcon"
            variant="card"
            color="default"
            :show-progress="true"
            :progress="96"
          />
        </div>
      </section>

      <!-- Timeline Section -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Timeline Component
        </h2>
        
        <div class="max-w-2xl">
          <Timeline :items="timelineItems">
            <template #icon-success="{ item }">
              <div class="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white ring-4 ring-white dark:ring-gray-900">
                <CheckIcon class="h-4 w-4" />
              </div>
            </template>
          </Timeline>
        </div>
      </section>

      <!-- Pricing Section -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Pricing Cards
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PricingCard
            name="Starter"
            description="Perfect for small projects"
            :price="9"
            :features="['5 Projects', '10GB Storage', 'Email Support', 'Basic Analytics']"
            cta-text="Start Free Trial"
            variant="default"
          />
          
          <PricingCard
            name="Professional"
            description="Most popular for growing teams"
            :price="29"
            :original-price="39"
            :features="[
              'Unlimited Projects',
              '100GB Storage', 
              'Priority Support',
              'Advanced Analytics',
              'Team Collaboration'
            ]"
            :popular="true"
            cta-text="Get Started"
            variant="highlighted"
          />
          
          <PricingCard
            name="Enterprise"
            description="For large organizations"
            :price="99"
            :features="[
              'Everything in Pro',
              'Unlimited Storage',
              '24/7 Phone Support',
              'Custom Integrations',
              'Advanced Security'
            ]"
            cta-text="Contact Sales"
            secondary-cta-text="Request Demo"
          />
        </div>
      </section>

      <!-- User Profile Cards -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          User Profile Cards
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UserProfileCard
            :user="sampleUsers[0]"
            :stats="userStats"
            :skills="['Vue.js', 'TypeScript', 'Node.js', 'GraphQL']"
            variant="default"
            @primary-action="handleFollow"
          />
          
          <UserProfileCard
            :user="sampleUsers[1]"
            :social-links="socialLinks"
            variant="compact"
            @primary-action="handleFollow"
          />
          
          <UserProfileCard
            :user="sampleUsers[2]"
            cover-image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
            :stats="designerStats"
            :skills="['Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator']"
            variant="detailed"
            @primary-action="handleFollow"
          />
        </div>
      </section>

      <!-- Blog Post Cards -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Blog Post Cards
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogPostCard
            v-for="post in blogPosts"
            :key="post.id"
            v-bind="post"
            @click="handlePostClick"
          />
        </div>
      </section>

      <!-- Error Templates Preview -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Error Page Templates
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="404 Error Page" variant="bordered">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              User-friendly 404 page with navigation options and help links.
            </p>
            <template #actions>
              <Button size="sm" variant="outline" @click="show404 = true">
                Preview 404
              </Button>
            </template>
          </Card>
          
          <Card title="500 Error Page" variant="bordered">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Server error page with troubleshooting suggestions and support options.
            </p>
            <template #actions>
              <Button size="sm" variant="outline" @click="show500 = true">
                Preview 500
              </Button>
            </template>
          </Card>
        </div>
      </section>
    </div>

    <!-- Error Page Modals -->
    <Modal v-model:isOpen="show404" size="full" title="404 Error Page Preview">
      <Error404
        :help-links="[
          { text: 'Home Page', href: '/' },
          { text: 'Documentation', href: '/docs' },
          { text: 'Support', href: '/support' }
        ]"
      />
    </Modal>

    <Modal v-model:isOpen="show500" size="full" title="500 Error Page Preview">
      <Error500
        status-page-url="https://status.example.com"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToastStore } from '@/store/useToastStore'
import {
  CheckIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  StarIcon
} from '@heroicons/vue/24/outline'
import {
  Badge,
  BlogPostCard,
  Button,
  Card,
  DataTable,
  Modal,
  PricingCard,
  Stats,
  Timeline,
  UserProfileCard
} from '@/components'
import Error404 from '@/templates/Error404.vue'
import Error500 from '@/templates/Error500.vue'

const toastStore = useToastStore()

// Table data and state
const tableLoading = ref(false)
const show404 = ref(false)
const show500 = ref(false)

const tableColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', sortable: false },
  { key: 'created', label: 'Created', sortable: true, format: 'date' }
]

const tableData = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    created: '2024-01-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Editor',
    status: 'Active',
    created: '2024-01-20'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Viewer',
    status: 'Inactive',
    created: '2024-02-01'
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Editor',
    status: 'Pending',
    created: '2024-02-10'
  }
])

// Timeline data
const timelineItems = [
  {
    id: 1,
    type: 'success',
    title: 'Project Completed',
    description: 'Successfully delivered the new dashboard feature to production.',
    author: 'John Doe',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    tags: ['deployment', 'feature']
  },
  {
    id: 2,
    type: 'default',
    title: 'Code Review',
    description: 'Reviewed pull request #123 for the authentication system.',
    author: 'Jane Smith',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    tags: ['review', 'security']
  },
  {
    id: 3,
    type: 'warning',
    title: 'System Maintenance',
    description: 'Scheduled maintenance window for database optimization.',
    author: 'DevOps Team',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    tags: ['maintenance', 'database']
  }
]

// User data
const sampleUsers = [
  {
    name: 'Sarah Wilson',
    role: 'Senior Frontend Developer',
    bio: 'Passionate about creating beautiful and functional user interfaces with modern web technologies.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    location: 'San Francisco, CA',
    isOnline: true
  },
  {
    name: 'Mike Chen',
    role: 'Product Designer',
    bio: 'Design enthusiast focused on user experience and accessibility.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    location: 'New York, NY',
    isOnline: false
  },
  {
    name: 'Emily Rodriguez',
    role: 'Creative Director',
    bio: 'Leading creative teams to deliver exceptional brand experiences across digital and traditional media.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    location: 'Los Angeles, CA',
    isOnline: true
  }
]

const userStats = [
  { label: 'Projects', value: 24 },
  { label: 'Followers', value: 1250 },
  { label: 'Following', value: 180 }
]

const designerStats = [
  { label: 'Designs', value: 89 },
  { label: 'Likes', value: 2400 },
  { label: 'Views', value: 15000 }
]

const socialLinks = [
  { platform: 'GitHub', url: 'https://github.com' },
  { platform: 'LinkedIn', url: 'https://linkedin.com' },
  { platform: 'Twitter', url: 'https://twitter.com' }
]

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'Building Scalable Vue.js Applications',
    excerpt: 'Learn the best practices for structuring large Vue.js applications with TypeScript and modern tooling.',
    featuredImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
    author: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    },
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    readTime: 8,
    category: 'Development',
    tags: ['Vue.js', 'TypeScript', 'Architecture']
  },
  {
    id: 2,
    title: 'Design Systems in 2024',
    excerpt: 'A comprehensive guide to building and maintaining design systems for modern web applications.',
    featuredImage: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400',
    author: {
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100'
    },
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    readTime: 12,
    category: 'Design',
    tags: ['Design Systems', 'UI/UX', 'Components']
  },
  {
    id: 3,
    title: 'The Future of Web Development',
    excerpt: 'Exploring emerging trends and technologies that will shape the future of web development.',
    featuredImage: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400',
    author: {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    readTime: 6,
    category: 'Technology',
    tags: ['Web Development', 'Trends', 'Future']
  }
]

// Methods
const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'success'
    case 'inactive':
      return 'error'
    case 'pending':
      return 'warning'
    default:
      return 'secondary'
  }
}

const toggleTableLoading = () => {
  tableLoading.value = !tableLoading.value
}

const refreshTableData = () => {
  toastStore.info('Table Refreshed', 'Data has been refreshed successfully.')
}

const handleRowClick = (row: any) => {
  toastStore.info('Row Clicked', `Clicked on ${row.name}`)
}

const editUser = (user: any) => {
  toastStore.info('Edit User', `Editing ${user.name}`)
}

const deleteUser = (user: any) => {
  toastStore.warning('Delete User', `Delete action for ${user.name}`)
}

const handleFollow = (user: any) => {
  toastStore.success('Followed', `You are now following ${user.name}`)
}

const handlePostClick = (post: any) => {
  toastStore.info('Post Clicked', `Clicked on "${post.title}"`)
}

onMounted(() => {
  // Simulate some initial loading
  setTimeout(() => {
    toastStore.success('Page Loaded', 'Complex widgets examples are ready!')
  }, 1000)
})
</script>