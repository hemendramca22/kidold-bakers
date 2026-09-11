import { Category, Subcategory, CategoryHierarchy } from "@/types/category";
import { Product, ProductOccasion } from "@/types/product";
import { categoriesData } from "@/data/categories";
import { productsData } from "@/data/products";

export interface CategoryFilter {
  activeOnly?: boolean;
  publishedOnly?: boolean;
  featuredOnly?: boolean;
  hierarchyOnly?: CategoryHierarchy;
  parentId?: string | null;
}

export interface ProductFilter {
  categoryId?: string;
  subcategoryId?: string;
  occasion?: ProductOccasion;
  signatureOnly?: boolean;
  availableOnly?: boolean;
  activeOnly?: boolean;
  publishedOnly?: boolean;
}

/**
 * Service Contract for Catalog Operations.
 * Today this is fulfilled by StaticCatalogService (reading local typed files).
 * Tomorrow it will be fulfilled by DatabaseCatalogService / SupabaseClient
 * without changing a single line of component code.
 */
export interface ICatalogService {
  getCategories(filter?: CategoryFilter): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  getCategoryById(id: string): Promise<Category | null>;
  getSubcategories(categoryId?: string): Promise<Subcategory[]>;
  getProducts(filter?: ProductFilter): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getProductById(id: string): Promise<Product | null>;
  getFeaturedCategories(): Promise<Category[]>;
  getSignatureProducts(): Promise<Product[]>;
  getProductsByOccasion(occasion: ProductOccasion): Promise<Product[]>;

  // Synchronous convenience accessors for immediate SSR / client rendering
  getCategoriesSync(filter?: CategoryFilter): Category[];
  getFeaturedCategoriesSync(): Category[];
  getHeroCategoriesSync(): Category[];
  getPrimaryCategoriesSync(): Category[];
  getSupportingCategoriesSync(): Category[];
  getProductsSync(filter?: ProductFilter): Product[];
  getSignatureProductsSync(): Product[];
}

export class StaticCatalogService implements ICatalogService {
  private categories: Category[] = categoriesData;
  private products: Product[] = productsData;

  public async getCategories(filter: CategoryFilter = {}): Promise<Category[]> {
    return this.getCategoriesSync(filter);
  }

  public getCategoriesSync(filter: CategoryFilter = {}): Category[] {
    const {
      activeOnly = true,
      publishedOnly = true,
      featuredOnly,
      hierarchyOnly,
      parentId,
    } = filter;

    return this.categories
      .filter((cat) => {
        if (activeOnly && !cat.isActive) return false;
        if (publishedOnly && !cat.isPublished) return false;
        if (featuredOnly !== undefined && cat.isFeatured !== featuredOnly) return false;
        if (hierarchyOnly !== undefined && cat.hierarchy !== hierarchyOnly) return false;
        if (parentId !== undefined && cat.parentId !== parentId) return false;
        return true;
      })
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  public async getFeaturedCategories(): Promise<Category[]> {
    return this.getFeaturedCategoriesSync();
  }

  public getFeaturedCategoriesSync(): Category[] {
    return this.getCategoriesSync({ featuredOnly: true });
  }

  public getHeroCategoriesSync(): Category[] {
    return this.getCategoriesSync({ hierarchyOnly: "hero" });
  }

  public getPrimaryCategoriesSync(): Category[] {
    return this.getCategoriesSync({ hierarchyOnly: "primary" });
  }

  public getSupportingCategoriesSync(): Category[] {
    return this.getCategoriesSync({ hierarchyOnly: "supporting" });
  }

  public async getCategoryBySlug(slug: string): Promise<Category | null> {
    const cat = this.categories.find((c) => c.slug === slug && c.isActive && c.isPublished);
    return cat || null;
  }

  public async getCategoryById(id: string): Promise<Category | null> {
    const cat = this.categories.find((c) => c.id === id && c.isActive && c.isPublished);
    return cat || null;
  }

  public async getSubcategories(categoryId?: string): Promise<Subcategory[]> {
    const allSubs: Subcategory[] = [];
    for (const cat of this.categories) {
      if (cat.subcategories) {
        allSubs.push(...cat.subcategories);
      }
    }

    return allSubs
      .filter((sub) => {
        if (!sub.isActive || !sub.isPublished) return false;
        if (categoryId && sub.categoryId !== categoryId) return false;
        return true;
      })
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  public async getProducts(filter: ProductFilter = {}): Promise<Product[]> {
    return this.getProductsSync(filter);
  }

  public getProductsSync(filter: ProductFilter = {}): Product[] {
    const {
      categoryId,
      subcategoryId,
      occasion,
      signatureOnly,
      availableOnly = true,
      activeOnly = true,
      publishedOnly = true,
    } = filter;

    return this.products
      .filter((prod) => {
        if (activeOnly && !prod.isActive) return false;
        if (publishedOnly && !prod.isPublished) return false;
        if (availableOnly && !prod.isAvailable) return false;
        if (signatureOnly !== undefined && prod.isSignature !== signatureOnly) return false;
        if (categoryId) {
          if (categoryId === "celebration-cakes") {
            if (prod.categoryId !== "celebration-cakes" && prod.categoryId !== "pre-made-cakes") return false;
          } else if (categoryId === "desserts-pastries") {
            if (prod.categoryId !== "desserts-pastries" && prod.categoryId !== "pastries") return false;
          } else if (prod.categoryId !== categoryId) {
            return false;
          }
        }
        if (subcategoryId && prod.subcategoryId !== subcategoryId) return false;
        if (occasion && !prod.occasions.includes(occasion)) return false;
        return true;
      })
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  public async getSignatureProducts(): Promise<Product[]> {
    return this.getSignatureProductsSync();
  }

  public getSignatureProductsSync(): Product[] {
    return this.getProductsSync({ signatureOnly: true });
  }

  public async getProductBySlug(slug: string): Promise<Product | null> {
    const prod = this.products.find((p) => p.slug === slug && p.isActive && p.isPublished);
    return prod || null;
  }

  public async getProductById(id: string): Promise<Product | null> {
    const prod = this.products.find((p) => p.id === id && p.isActive && p.isPublished);
    return prod || null;
  }

  public async getProductsByOccasion(occasion: ProductOccasion): Promise<Product[]> {
    return this.getProductsSync({ occasion });
  }
}

/**
 * Global singleton catalogService instance.
 * Frontend components import this service instead of static data arrays.
 */
export const catalogService = new StaticCatalogService();