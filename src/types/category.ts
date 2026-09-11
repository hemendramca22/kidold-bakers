/**
 * Abstracted Image Asset contract for CMS / CDN / Object Storage compatibility.
 * Allows moving between local public/ images, Cloudinary, S3, or Supabase Storage
 * without breaking component interfaces.
 */
export interface CatalogImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataUrl?: string;
}

/**
 * Helper to safely extract image attributes whether provided as a string path
 * or as a structured CatalogImage object.
 */
export function resolveCatalogImage(
  image: CatalogImage | string,
  fallbackAlt = "KidOld Bakers"
): CatalogImage {
  if (typeof image === "string") {
    return {
      src: image,
      alt: fallbackAlt,
    };
  }
  return {
    ...image,
    alt: image.alt || fallbackAlt,
  };
}

/**
 * Subcategory model supporting multi-level bakery taxonomy:
 * e.g., Cakes -> Birthday Cakes, Anniversary Cakes, Custom Cakes
 * e.g., Bakery -> Pastries, Patties, Breads, Cookies
 */
export interface Subcategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  categoryId: string; // Foreign key referencing parent Category.id
  sortOrder: number;
  isActive: boolean;
  isPublished: boolean;
  image?: CatalogImage | string;
}

export type CategoryHierarchy = "hero" | "primary" | "supporting";

/**
 * Core Category model prepared for relational database schema (PostgreSQL/Supabase).
 */
export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  itemCountDescription: string;
  image: CatalogImage | string;
  badge?: string;
  badgeVariant?: "gold" | "crimson" | "default";
  hierarchy?: CategoryHierarchy; // "hero" for Cakes, "primary" for Pastries, "supporting" for Pizza/Burgers/etc.
  routeHref?: string; // Dedicated page route e.g. /categories/pre-made-cakes
  isFeatured?: boolean;
  sortOrder: number;
  isActive: boolean;
  isPublished: boolean;
  parentId?: string | null; // Supports category hierarchy
  subcategories?: Subcategory[];
  createdAt?: string;
  updatedAt?: string;
}
