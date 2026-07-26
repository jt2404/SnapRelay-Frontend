# Frontend Skills

## Project scope
Build the frontend for a photo gallery and event photo sharing SaaS for photographers and studios.  
The frontend must be modern, fast, responsive, and premium-looking, with a strong focus on galleries, branding, event management, and client selfie-based photo discovery.

---

## Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Hook Form
- Zod
- Zustand only if needed
- TanStack Table for list views
- Recharts for analytics
- Lucide icons or similar icon set

---

## Routing rules

Use Next.js App Router only.

### Public routes
- `/`
- `/pricing`
- `/login`
- `/register`

### Protected routes
- `/dashboard`
- `/dashboard/events`
- `/dashboard/events/[eventId]`
- `/dashboard/branding`
- `/dashboard/billing`
- `/dashboard/settings`

### Client gallery routes
- `/g/[galleryId]`

---

## Frontend responsibilities

- Handle all UI and user interactions.
- Call backend APIs for auth, events, uploads, galleries, branding, and billing.
- Never put business logic in UI components when it belongs in the backend.
- Use presigned upload URLs for direct S3 uploads.
- Show loading, error, empty, and success states everywhere.
- Support public gallery access via QR code.
- Support client selfie upload and display matched photos.

---

## Core frontend flows

### Photographer flow
1. Log in.
2. Create an event.
3. Upload photos.
4. Configure branding.
5. Generate QR code.
6. Share the gallery.

### Client flow
1. Scan QR code.
2. Open gallery.
3. Upload selfie.
4. View matched photos.
5. Download or share photos.

### Admin-like flow
1. View usage.
2. View plan details.
3. Manage branding and billing settings.

---

## Common frontend components

Create reusable components for everything.

### Layout
- `AppShell`
- `Sidebar`
- `Topbar`
- `PageHeader`
- `SectionHeader`
- `Breadcrumbs`

### UI
- `Button`
- `Input`
- `Textarea`
- `Select`
- `Checkbox`
- `Dialog`
- `DropdownMenu`
- `Tabs`
- `Badge`
- `Card`
- `Skeleton`
- `Toast`

### Dashboard
- `StatsCard`
- `DataTable`
- `EmptyState`
- `SearchBar`
- `FilterBar`
- `Pagination`
- `UploadDropzone`

### Event
- `EventCard`
- `EventForm`
- `EventSummary`
- `EventStatusBadge`
- `QRCodeCard`

### Photo
- `PhotoGrid`
- `PhotoCard`
- `PhotoPreview`
- `PhotoMatchResult`
- `FaceMatchBadge`

### Branding
- `BrandSettingsForm`
- `BrandColorPicker`
- `LogoUploader`
- `ThemePreview`
- `TemplateSelector`

### Billing
- `PlanCard`
- `UsageMeter`
- `PlanComparisonTable`
- `UpgradePrompt`

### Gallery
- `GalleryHeader`
- `GalleryGrid`
- `SelfieUploadCard`
- `MatchedPhotosSection`

---

## UI/UX rules

- Keep the interface premium, minimal, and clean.
- Prefer white space, rounded cards, subtle borders, and soft shadows.
- Make dashboards readable and efficient.
- Make galleries visually strong and photo-first.
- Make branding controls easy to understand.
- Keep mobile responsive from the start.
- Use shared components instead of repeating layouts.

---

## Data and state rules

- Use TanStack Query for API data fetching and caching.
- Use local state only for small UI state.
- Use Zustand only if global client-side state is truly needed.
- Use React Hook Form + Zod for forms and validation.
- Avoid duplicating server state in local state.

---

## API rules

- Consume backend APIs through a shared API client.
- Use typed request/response structures where possible.
- Keep all presigned upload logic in a reusable helper.
- Do not hardcode environment-specific values in components.

---

## Gallery and upload rules

- Upload photos directly to S3 using presigned URLs.
- Show upload progress.
- Handle retries and failure states.
- Support bulk uploads.
- Support photo grids and preview states.
- Support selfie upload for gallery matching.

---

## Branding rules

- Branding must be a first-class part of the dashboard.
- Support logo upload, colors, fonts, templates, and preview.
- Show live preview when settings change.
- Branding should apply to event galleries and client-facing pages.

---

## Performance rules

- Use server components when possible.
- Keep client components limited to interactivity.
- Avoid heavy UI logic in a single component.
- Lazy load large sections if needed.
- Optimize image rendering carefully.

---

## Code quality rules

- Use TypeScript everywhere.
- Keep components small and reusable.
- Use clear naming.
- Avoid deep prop drilling when a shared component or query hook is better.
- Keep styles consistent.
- Add accessible labels and keyboard support.

---

## Git workflow

After each completed feature:
1. Test it locally.
2. Commit the feature.
3. Push to remote.
4. Then move to the next feature.

### Example commit messages
- `feat: add auth pages`
- `feat: add dashboard shell`
- `feat: add event creation flow`
- `feat: add upload UI`
- `feat: add branding settings`
- `feat: add gallery selfie upload`

---

## Build order

### Phase 1
- Project setup
- Auth pages
- App shell
- Dashboard layout
- Event creation

### Phase 2
- Upload UI
- QR code gallery page
- Photo grid
- Selfie upload UI

### Phase 3
- Branding editor
- Plan pages
- Usage views
- Billing UI

### Phase 4
- Polish, responsiveness, analytics, optimization

---

## Notes for AI/dev agents
- Follow this file strictly.
- Prefer shared components.
- Do not create page-specific UI if a reusable component already exists.
- Keep frontend only concerns in this layer.
- Commit and push after each feature.
