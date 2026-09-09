# ADR-005: Catalog Service Abstraction & Future Headless CMS Architecture

## Context
KidOld Bakers operates in Jaunpur with daily seasonal bakes, festival gift hampers, and custom celebration cake orders. In a future phase, the bakery team will require a **private internal Admin/CMS dashboard** (inaccessible to the public) where non-technical staff can:
1. Create, update, publish, or unpublish categories, subcategories, and products.
2. Manage hierarchical taxonomies:
   - **Cakes** → Birthday Cakes, Anniversary Cakes, Custom Cakes
   - **Bakery** → Pastries, Patties, Breads, Cookies
3. Update product descriptions, pricing, availability (out of stock / fresh today), and upload imagery.
4. Manually curate and reorder items (`sortOrder`) without editing code or triggering full project redeployments.

If catalogue data remained hardcoded in presentation components, introducing this database and admin panel would require a high-friction rewrite of customer-facing UI components. We must decouple data from presentation immediately while keeping Phase 1 lightweight and dependency-free.

---

## Architectural Decisions

```
┌─────────────────────────────────────────────────────────────┐
│                    TARGET ARCHITECTURE                      │
├──────────────────────────────┬──────────────────────────────┤
│      CUSTOMER FRONTEND       │   PRIVATE ADMIN DASHBOARD    │
│    (Public Storefront)       │  (Bakery Staff Only - Future)│
│                              │                              │
│   • Browse Menu / Categories │   • Create / Edit Categories │
│   • Signature Showcase       │   • Add / Delete Products    │
│   • Design My Cake Studio    │   • Publish / Unpublish      │
│   • WhatsApp Handoff         │   • Reorder & Mark Inactive  │
└──────────────┬───────────────┴──────────────┬───────────────┘
               │                              │
               │ (Read Queries)               │ (Authenticated Mutations)
               ▼                              ▼
┌──────────────────────────────┬──────────────────────────────┐
│  Catalog Service Abstraction │   Admin Management API       │
│  (Single Source of Truth)    │   (Auth + Role Validation)   │
└──────────────┬───────────────┴──────────────┬───────────────┘
               │                              │
               └──────────────┬───────────────┘
                              │
                              ▼
               ┌──────────────────────────────┐
               │    PostgreSQL / Supabase     │
               │   • categories (hierarchical)│
               │   • subcategories            │
               │   • products (with flags)    │
               │   • media_assets (Cloudinary)│
               └──────────────────────────────┘
```

### 1. Service Layer Abstraction (`ICatalogService` & `catalogService`)
- Created `src/services/catalogService.ts` exposing an explicit interface:
  - `getCategories(filter?: CategoryFilter): Promise<Category[]>`
  - `getCategoryBySlug(slug: string): Promise<Category | null>`
  - `getSubcategories(categoryId?: string): Promise<Subcategory[]>`
  - `getProducts(filter?: ProductFilter): Promise<Product[]>`
  - `getFeaturedCategories(): Promise<Category[]>`
  - `getSignatureProducts(): Promise<Product[]>`
  - `getProductBySlug(slug: string): Promise<Product | null>`
  - `getProductsByOccasion(occasion: ProductOccasion): Promise<Product[]>`
- Customer-facing UI components (`CategorySection.tsx`, `SignatureSection.tsx`) consume this service rather than importing static array variables.
- Phase 1 fulfills this contract via `StaticCatalogService` reading local typed files. When the database is introduced, **only the service provider changes** (e.g. `DatabaseCatalogService`), while UI components remain untouched.

### 2. Relational & CMS-Ready Domain Entities
- **Abstracted Image Asset (`CatalogImage`):** Decouples media storage. Assets carry structured `{ src, alt, width, height, blurDataUrl }`, enabling future migration from local `public/` paths to Cloudinary, AWS S3, or Supabase Storage without changing component props.
- **Hierarchical Taxonomy (`Category` & `Subcategory`):**
  - Foreign key relations (`subcategories[].categoryId` → `Category.id`).
  - Supports multi-level structures requested for bakery departments.
- **CMS Operational Flags:**
  - `isActive`: Administrative master visibility toggle (hide without deleting).
  - `isPublished`: Draft vs live production state.
  - `isAvailable`: Daily operational stock toggle (e.g., morning patties sold out by evening).
  - `sortOrder`: Integer order index allowing bakery staff to reorder cards via drag-and-drop.
  - `createdAt` / `updatedAt`: ISO timestamps for audit and cache invalidation.

---

## Future Database Blueprint (PostgreSQL / Supabase Schema)

When backend persistence is provisioned, the static entities map 1:1 to the following relational schema:

```sql
-- Categories Table
CREATE TABLE categories (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(128) UNIQUE NOT NULL,
  name VARCHAR(128) NOT NULL,
  tagline VARCHAR(256),
  description TEXT,
  item_count_description VARCHAR(64),
  image_url TEXT NOT NULL,
  badge VARCHAR(64),
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_published BOOLEAN DEFAULT true,
  parent_id VARCHAR(64) REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subcategories Table
CREATE TABLE subcategories (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(128) NOT NULL,
  name VARCHAR(128) NOT NULL,
  description TEXT,
  category_id VARCHAR(64) NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_published BOOLEAN DEFAULT true,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(category_id, slug)
);

-- Products Table
CREATE TABLE products (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(128) UNIQUE NOT NULL,
  name VARCHAR(128) NOT NULL,
  category_id VARCHAR(64) NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  subcategory_id VARCHAR(64) REFERENCES subcategories(id) ON DELETE SET NULL,
  short_description TEXT NOT NULL,
  detailed_description TEXT,
  price NUMERIC(10, 2),
  price_display VARCHAR(64),
  enquiry_action_text VARCHAR(64) DEFAULT 'Enquire on WhatsApp',
  weight_options JSONB DEFAULT '[]'::jsonb,
  is_eggless_available BOOLEAN DEFAULT true,
  is_pure_veg BOOLEAN DEFAULT true,
  is_signature BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  image_url TEXT NOT NULL,
  gallery_urls JSONB DEFAULT '[]'::jsonb,
  flavor_notes JSONB DEFAULT '[]'::jsonb,
  baker_note TEXT,
  occasions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Future Admin Dashboard Architecture

1. **Private Route Group:**
   - App Router route group: `src/app/(admin)/admin/` (completely isolated from public storefront layout).
2. **Authentication & Authorization:**
   - Role-Based Access Control (RBAC): Roles `owner`, `baker_staff`, `editor`.
   - Next-Auth / Supabase Auth with secure HTTP-only cookies and MFA.
   - Row Level Security (RLS) on database tables: public users have `SELECT` permission on published items; staff roles have `INSERT`, `UPDATE`, `DELETE`.
3. **Cache Invalidation & Zero-Downtime Menu Updates:**
   - When staff updates inventory or publishes a new cake flavor in `/admin`, Next.js Server Actions invoke:
     ```ts
     revalidateTag('catalog');
     revalidatePath('/');
     ```
   - Public storefront displays updated bakes instantly via On-Demand Incremental Static Regeneration (ISR) without code recompilation.

---

## Migration Roadmap

| Step | Scope | Target Phase | Status |
| :--- | :--- | :---: | :---: |
| **Phase 1 (Current)** | Domain types, `ICatalogService`, `StaticCatalogService`, decoupled UI components | Phase 1 Refinement | **COMPLETED** |
| **Step 2: Database Provisioning** | Create Supabase project, execute SQL migrations, seed database with `categoriesData` and `productsData` | Phase 3/4 | Planned |
| **Step 3: Service Provider Swap** | Create `DatabaseCatalogService` implementing `ICatalogService`; point singleton to DB provider | Phase 3/4 | Planned |
| **Step 4: Admin CMS Dashboard** | Implement `src/app/(admin)/admin/` with login, category tree manager, product CRUD, and Cloudinary image upload | Phase 4/5 | Planned |

---

## Consequences & Benefits

- **Zero Coupling to Static Files:** Presentation components have no awareness of where data originates.
- **Zero Premature Overhead:** No heavy database drivers, network latency, or auth complexities in Phase 1.
- **Strict Type Safety:** Full TypeScript compile-time validation prevents schema drift between customer and admin interfaces.
- **Extensibility:** Multi-tiered taxonomies (Cakes → Birthday Cakes, Bakery → Pastries) are modeled and ready for administrative curation.