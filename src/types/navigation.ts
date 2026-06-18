export interface NavItem {
  href: string;
  label: string;
}

export interface QuickAccessItem extends NavItem {
  description: string;
}
