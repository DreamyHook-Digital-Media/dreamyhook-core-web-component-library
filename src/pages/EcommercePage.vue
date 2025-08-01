<template>
  <div class="bg-white dark:bg-gray-900 min-h-screen">
    <!-- Product Listing Section -->
    <section class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            E-commerce Examples
          </h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Complete shopping experience components and flows
          </p>
        </div>
        
        <div class="flex items-center space-x-4">
          <Button variant="outline" @click="viewMode = viewMode === 'grid' ? 'list' : 'grid'">
            {{ viewMode === 'grid' ? 'List View' : 'Grid View' }}
          </Button>
          <Button variant="primary" @click="showCart = true">
            <ShoppingCartIcon class="h-5 w-5 mr-2" />
            Cart ({{ cartItems.length }})
          </Button>
        </div>
      </div>

      <!-- Filters -->
      <Card variant="bordered" class="mb-8">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex-1 min-w-64">
            <TextInput
              v-model="searchQuery"
              placeholder="Search products..."
              class="w-full"
            >
              <template #prefix>
                <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
              </template>
            </TextInput>
          </div>
          
          <Select
            v-model="selectedCategory"
            :options="categoryOptions"
            placeholder="Category"
            class="w-40"
          />
          
          <Select
            v-model="sortBy"
            :options="sortOptions"
            placeholder="Sort by"
            class="w-40"
          />
          
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-600 dark:text-gray-400">Price:</span>
            <TextInput
              v-model="priceRange.min"
              type="number"
              placeholder="Min"
              class="w-20"
            />
            <span class="text-gray-400">-</span>
            <TextInput
              v-model="priceRange.max"
              type="number"
              placeholder="Max"
              class="w-20"
            />
          </div>
        </div>
      </Card>

      <!-- Product Grid/List -->
      <div :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          :class="viewMode === 'list' ? 'flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg' : ''"
        >
          <!-- Grid View Product Card -->
          <Card
            v-if="viewMode === 'grid'"
            variant="bordered"
            hoverable
            clickable
            @click="selectProduct(product)"
          >
            <template #media>
              <div class="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden">
                <img
                  v-if="product.image"
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
                />
                <div v-else class="flex items-center justify-center h-48">
                  <PhotoIcon class="h-12 w-12 text-gray-400" />
                </div>
              </div>
              
              <!-- Product badges -->
              <div class="absolute top-3 left-3 space-y-2">
                <Badge v-if="product.isNew" variant="success" size="sm">New</Badge>
                <Badge v-if="product.discount" variant="error" size="sm">
                  -{{ product.discount }}%
                </Badge>
              </div>
              
              <!-- Favorite button -->
              <button
                class="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
                @click.stop="toggleFavorite(product)"
              >
                <HeartIcon
                  :class="[
                    'h-5 w-5',
                    product.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
                  ]"
                />
              </button>
            </template>
            
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {{ product.name }}
              </h3>
              
              <div class="flex items-center space-x-2 mb-3">
                <div class="flex items-center">
                  <StarIcon
                    v-for="star in 5"
                    :key="star"
                    :class="[
                      'h-4 w-4',
                      star <= product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    ]"
                  />
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  ({{ product.reviews }})
                </span>
              </div>
              
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-2">
                  <span class="text-xl font-bold text-gray-900 dark:text-white">
                    ${{ product.price }}
                  </span>
                  <span
                    v-if="product.originalPrice"
                    class="text-sm text-gray-500 line-through"
                  >
                    ${{ product.originalPrice }}
                  </span>
                </div>
                
                <Badge
                  :variant="product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'error'"
                  size="sm"
                >
                  {{ product.stock > 0 ? `${product.stock} left` : 'Out of stock' }}
                </Badge>
              </div>
              
              <div class="flex space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  full-width
                  :disabled="product.stock === 0"
                  @click.stop="addToCart(product)"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  @click.stop="quickView(product)"
                >
                  <EyeIcon class="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          <!-- List View Product -->
          <template v-else>
            <div class="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0 overflow-hidden">
              <img
                v-if="product.image"
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="flex items-center justify-center h-full">
                <PhotoIcon class="h-8 w-8 text-gray-400" />
              </div>
            </div>
            
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {{ product.name }}
              </h3>
              <div class="flex items-center space-x-2 mb-2">
                <div class="flex items-center">
                  <StarIcon
                    v-for="star in 5"
                    :key="star" 
                    :class="[
                      'h-3 w-3',
                      star <= product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    ]"
                  />
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  ({{ product.reviews }})
                </span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {{ product.description }}
              </p>
            </div>
            
            <div class="flex items-center space-x-4">
              <div class="text-right">
                <div class="text-xl font-bold text-gray-900 dark:text-white">
                  ${{ product.price }}
                </div>
                <Badge
                  :variant="product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'error'"
                  size="sm"
                >
                  {{ product.stock > 0 ? `${product.stock} left` : 'Out of stock' }}
                </Badge>
              </div>
              
              <div class="flex space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  :disabled="product.stock === 0"
                  @click="addToCart(product)"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="toggleFavorite(product)"
                >
                  <HeartIcon
                    :class="[
                      'h-4 w-4',
                      product.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
                    ]"
                  />
                </Button>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-8">
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          :total-items="filteredProducts.length"
          :page-size="pageSize"
          @page-change="currentPage = $event"
          @page-size-change="pageSize = $event"
        />
      </div>
    </section>

    <!-- Shopping Cart Sidebar -->
    <Modal
      v-model:isOpen="showCart"
      title="Shopping Cart"
      size="lg"
    >
      <div class="space-y-4">
        <div v-if="cartItems.length === 0" class="text-center py-8">
          <ShoppingCartIcon class="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-500 dark:text-gray-400">Your cart is empty</p>
        </div>
        
        <div v-else class="space-y-4">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover"
              />
            </div>
            
            <div class="flex-1 min-w-0">
              <h4 class="font-medium text-gray-900 dark:text-white truncate">
                {{ item.name }}
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                ${{ item.price }} each
              </p>
            </div>
            
            <div class="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                @click="decrementQuantity(item)"
              >
                <MinusIcon class="h-4 w-4" />
              </Button>
              
              <span class="w-8 text-center text-sm font-medium">
                {{ item.quantity }}
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                @click="incrementQuantity(item)"
              >
                <PlusIcon class="h-4 w-4" />
              </Button>
            </div>
            
            <div class="text-right">
              <div class="font-medium text-gray-900 dark:text-white">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </div>
              <Button
                variant="ghost"
                size="sm"
                @click="removeFromCart(item)"
              >
                <TrashIcon class="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
          
          <!-- Cart Summary -->
          <div class="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span class="font-medium">${{ cartSubtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Shipping</span>
              <span class="font-medium">$9.99</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Tax</span>
              <span class="font-medium">${{ (cartSubtotal * 0.1).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span>${{ cartTotal.toFixed(2) }}</span>
            </div>
          </div>
          
          <!-- Checkout Button -->
          <Button
            variant="primary"
            size="lg"
            full-width
            @click="startCheckout"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </Modal>

    <!-- Quick View Modal -->
    <Modal
      v-model:isOpen="showQuickView"
      :title="selectedProduct?.name"
      size="full"
    >
      <div v-if="selectedProduct" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Product Images -->
        <div class="space-y-4">
          <div class="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            <img
              :src="selectedProduct.image"
              :alt="selectedProduct.name"
              class="w-full h-full object-cover"
            />
          </div>
          
          <!-- Thumbnail Gallery -->
          <div class="grid grid-cols-4 gap-2">
            <div
              v-for="i in 4"
              :key="i"
              class="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700 rounded-lg"
            >
              <img
                :src="selectedProduct.image"
                :alt="`${selectedProduct.name} view ${i}`"
                class="w-full h-full object-cover cursor-pointer hover:opacity-75"
              />
            </div>
          </div>
        </div>
        
        <!-- Product Details -->
        <div class="space-y-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {{ selectedProduct.name }}
            </h1>
            
            <div class="flex items-center space-x-4 mb-4">
              <div class="flex items-center">
                <StarIcon
                  v-for="star in 5"
                  :key="star"
                  :class="[
                    'h-5 w-5',
                    star <= selectedProduct.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  ]"
                />
              </div>
              <span class="text-gray-600 dark:text-gray-400">
                {{ selectedProduct.reviews }} reviews
              </span>
            </div>
            
            <div class="flex items-center space-x-4 mb-6">
              <span class="text-3xl font-bold text-gray-900 dark:text-white">
                ${{ selectedProduct.price }}
              </span>
              <Badge
                :variant="selectedProduct.stock > 10 ? 'success' : selectedProduct.stock > 0 ? 'warning' : 'error'"
              >
                {{ selectedProduct.stock > 0 ? `${selectedProduct.stock} in stock` : 'Out of stock' }}
              </Badge>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Description
            </h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ selectedProduct.description }}
            </p>
          </div>
          
          <!-- Product Options -->
          <div class="space-y-4">
            <div>
              <Label>Color</Label>
              <div class="flex space-x-2 mt-2">
                <button
                  v-for="color in ['red', 'blue', 'green', 'black']"
                  :key="color"
                  :class="[
                    'w-8 h-8 rounded-full border-2',
                    selectedColor === color ? 'border-gray-900 dark:border-white' : 'border-gray-300',
                    `bg-${color}-500`
                  ]"
                  @click="selectedColor = color"
                />
              </div>
            </div>
            
            <div>
              <Label>Size</Label>
              <div class="flex space-x-2 mt-2">
                <Button
                  v-for="size in ['XS', 'S', 'M', 'L', 'XL']"
                  :key="size"
                  :variant="selectedSize === size ? 'primary' : 'outline'"
                  size="sm"
                  @click="selectedSize = size"
                >
                  {{ size }}
                </Button>
              </div>
            </div>
          </div>
          
          <!-- Add to Cart -->
          <div class="flex space-x-4">
            <Button
              variant="primary"
              size="lg"
              class="flex-1"
              :disabled="selectedProduct.stock === 0"
              @click="addToCart(selectedProduct)"
            >
              Add to Cart - ${{ selectedProduct.price }}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              @click="toggleFavorite(selectedProduct)"
            >
              <HeartIcon
                :class="[
                  'h-5 w-5',
                  selectedProduct.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
                ]"
              />
            </Button>
          </div>
        </div>
      </div>
    </Modal>

    <!-- Checkout Modal -->
    <Modal
      v-model:isOpen="showCheckout"
      title="Checkout"
      size="full"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Checkout Form -->
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Shipping Information
            </h3>
            
            <div class="grid grid-cols-2 gap-4 mb-4">
              <FormField label="First Name" required>
                <TextInput v-model="checkoutForm.firstName" />
              </FormField>
              <FormField label="Last Name" required>
                <TextInput v-model="checkoutForm.lastName" />
              </FormField>
            </div>
            
            <FormField label="Email" required>
              <TextInput v-model="checkoutForm.email" type="email" />
            </FormField>
            
            <FormField label="Address" required>
              <TextInput v-model="checkoutForm.address" />
            </FormField>
            
            <div class="grid grid-cols-3 gap-4">
              <FormField label="City" required>
                <TextInput v-model="checkoutForm.city" />
              </FormField>
              <FormField label="State" required>
                <Select
                  v-model="checkoutForm.state"
                  :options="stateOptions"
                  placeholder="Select state"
                />
              </FormField>
              <FormField label="ZIP Code" required>
                <TextInput v-model="checkoutForm.zipCode" />
              </FormField>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Payment Information
            </h3>
            
            <FormField label="Card Number" required>
              <TextInput
                v-model="checkoutForm.cardNumber"
                placeholder="1234 5678 9012 3456"
              />
            </FormField>
            
            <div class="grid grid-cols-2 gap-4">
              <FormField label="Expiry Date" required>
                <TextInput
                  v-model="checkoutForm.expiryDate"
                  placeholder="MM/YY"
                />
              </FormField>
              <FormField label="CVV" required>
                <TextInput
                  v-model="checkoutForm.cvv"
                  placeholder="123"
                />
              </FormField>
            </div>
          </div>
        </div>
        
        <!-- Order Summary -->
        <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Order Summary
          </h3>
          
          <div class="space-y-3 mb-6">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex justify-between text-sm"
            >
              <span>{{ item.name }} x{{ item.quantity }}</span>
              <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
          
          <div class="space-y-2 text-sm border-t pt-4">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>${{ cartSubtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping</span>
              <span>$9.99</span>
            </div>
            <div class="flex justify-between">
              <span>Tax</span>
              <span>${{ (cartSubtotal * 0.1).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span>${{ cartTotal.toFixed(2) }}</span>
            </div>
          </div>
          
          <Button
            variant="primary"
            size="lg"
            full-width
            class="mt-6"
            @click="completeOrder"
            :loading="processingOrder"
          >
            Complete Order
          </Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToastStore } from '@/store/useToastStore'
import {
  EyeIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PhotoIcon,
  PlusIcon,
  ShoppingCartIcon,
  StarIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'
import {
  Badge,
  Button,
  Card,
  FormField,
  Label,
  Modal,
  Pagination,
  Select,
  TextInput
} from '@/components'

const toastStore = useToastStore()

// View state
const viewMode = ref('grid')
const currentPage = ref(1)
const pageSize = ref(12)
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('name')
const priceRange = ref({ min: '', max: '' })

// Modal states
const showCart = ref(false)
const showQuickView = ref(false)
const showCheckout = ref(false)
const selectedProduct = ref(null)
const selectedColor = ref('black')
const selectedSize = ref('M')
const processingOrder = ref(false)

// Cart state
const cartItems = ref([])

// Sample data
const products = ref([
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium quality wireless headphones with noise cancellation and long battery life.',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    rating: 4.5,
    reviews: 128,
    stock: 15,
    category: 'electronics',
    isNew: false,
    discount: 20,
    isFavorite: false
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    rating: 4.2,
    reviews: 89,
    stock: 8,
    category: 'electronics',
    isNew: true,
    discount: 0,
    isFavorite: true
  },
  {
    id: 3,
    name: 'Ergonomic Office Chair',
    description: 'Comfortable office chair with lumbar support and adjustable height.',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
    rating: 4.8,
    reviews: 203,
    stock: 0,
    category: 'furniture',
    isNew: false,
    discount: 0,
    isFavorite: false
  },
  {
    id: 4,
    name: 'Leather Messenger Bag',
    description: 'Handcrafted leather bag perfect for work and travel.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    rating: 4.3,
    reviews: 67,
    stock: 23,
    category: 'accessories',
    isNew: false,
    discount: 15,
    isFavorite: false
  }
])

const checkoutForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  cardNumber: '',
  expiryDate: '',
  cvv: ''
})

// Options
const categoryOptions = [
  { value: '', label: 'All Categories' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'accessories', label: 'Accessories' }
]

const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' }
]

const stateOptions = [
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
  { value: 'FL', label: 'Florida' }
]

// Computed
const filteredProducts = computed(() => {
  let filtered = products.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    )
  }

  // Category filter
  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  // Price range filter
  if (priceRange.value.min) {
    filtered = filtered.filter(product => product.price >= parseFloat(priceRange.value.min))
  }
  if (priceRange.value.max) {
    filtered = filtered.filter(product => product.price <= parseFloat(priceRange.value.max))
  }

  // Sort
  switch (sortBy.value) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    default:
      filtered.sort((a, b) => a.name.localeCompare(b.name))
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / pageSize.value))

const cartSubtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const cartTotal = computed(() => {
  return cartSubtotal.value + 9.99 + (cartSubtotal.value * 0.1) // shipping + tax
})

// Methods
const selectProduct = (product) => {
  selectedProduct.value = product
  showQuickView.value = true
}

const quickView = (product) => {
  selectedProduct.value = product
  showQuickView.value = true
}

const addToCart = (product) => {
  const existingItem = cartItems.value.find(item => item.id === product.id)
  
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cartItems.value.push({
      ...product,
      quantity: 1
    })
  }
  
  toastStore.success('Added to Cart', `${product.name} added to your cart`)
}

const removeFromCart = (item) => {
  const index = cartItems.value.findIndex(cartItem => cartItem.id === item.id)
  if (index > -1) {
    cartItems.value.splice(index, 1)
    toastStore.info('Removed from Cart', `${item.name} removed from cart`)
  }
}

const incrementQuantity = (item) => {
  item.quantity += 1
}

const decrementQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity -= 1
  } else {
    removeFromCart(item)
  }
}

const toggleFavorite = (product) => {
  product.isFavorite = !product.isFavorite
  toastStore.info(
    product.isFavorite ? 'Added to Favorites' : 'Removed from Favorites',
    product.name
  )
}

const startCheckout = () => {
  showCart.value = false
  showCheckout.value = true
}

const completeOrder = async () => {
  processingOrder.value = true
  
  try {
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toastStore.success('Order Placed!', 'Your order has been successfully placed.')
    
    // Clear cart and close modal
    cartItems.value = []
    showCheckout.value = false
    
    // Reset form
    checkoutForm.value = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }
  } catch (error) {
    toastStore.error('Order Failed', 'There was an error processing your order.')
  } finally {
    processingOrder.value = false
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>