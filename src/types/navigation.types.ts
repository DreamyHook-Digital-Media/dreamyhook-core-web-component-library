export interface NavItem {
  label: string
  href?: string
  to?: string
  icon?: any // Vue component
  badge?: string | number
  children?: NavItem[]
  active?: boolean
  disabled?: boolean
  external?: boolean
}

export interface NavbarProps {
  items?: NavItem[]
  logo?: string
  logoText?: string
  logoHref?: string
  sticky?: boolean
  transparent?: boolean
  showSearch?: boolean
  searchPlaceholder?: string
}

export interface SidebarProps {
  items: NavItem[]
  collapsed?: boolean
  collapsible?: boolean
  width?: string
  position?: 'left' | 'right'
  overlay?: boolean
}

export interface BreadcrumbItem {
  label: string
  href?: string
  to?: string
  active?: boolean
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  separator?: string
  maxItems?: number
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems?: number
  itemsPerPage?: number
  showInfo?: boolean
  showSizeChanger?: boolean
  pageSizeOptions?: number[]
  disabled?: boolean
}

export interface TabItem {
  id: string
  label: string
  content?: string
  icon?: any // Vue component
  badge?: string | number
  disabled?: boolean
}

export interface TabsProps {
  items?: TabItem[]
  modelValue?: string
  variant?: 'default' | 'pills' | 'underline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export interface FooterLink {
  label: string
  href?: string
  to?: string
  external?: boolean
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterProps {
  sections?: FooterSection[]
  copyright?: string
  socialLinks?: FooterLink[]
  showLogo?: boolean
  logoText?: string
}