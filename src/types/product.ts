import { CatalogImage } from "@/types/category";

export type ProductOccasion = "birthdays" | "anniversaries" | "kids" | "teatime" | "celebrations";

/**
 * Core Product model prepared for relational database schema (PostgreSQL/Supabase).
 * Supports both standalone items and subcategorized hierarchies.
 */
export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string; // Foreign key referencing Category.id
  categoryName?: string; // Denormalized helper for fast display
  subcategoryId?: string; // Optional foreign key referencing Subcategory.id
  shortDescription: string;
  detailedDescription?: string;
  price?: number | null; // Raw numeric price for ecommerce/admin calculations
  priceDisplay?: string; // Formatted price text e.g. "On Request" or "₹450"
  enquiryActionText?: string;
  weightOptions?: string[];
  isEgglessAvailable: boolean;
  isPureVeg: boolean;
  isSignature: boolean;
  isAvailable: boolean; // Operational availability / stock toggle
  isActive: boolean; // Staff active/inactive visibility toggle
  isPublished: boolean; // Draft vs live publishing state
  sortOrder: number; // Manual curation sort order
  image: CatalogImage | string;
  gallery?: (CatalogImage | string)[];
  flavorNotes: string[];
  bakerNote?: string;
  occasions: ProductOccasion[];
  createdAt?: string;
  updatedAt?: string;
}

