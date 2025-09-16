# Healthcare Claims Processing System

A comprehensive React-based healthcare claims management and processing simulator built with modern web technologies and integrated with Supabase for backend functionality.

## 🏥 Project Overview

This application simulates a healthcare claims processing system with three distinct scenarios that demonstrate common challenges in medical billing and claims adjudication. The system allows users to search claims, view detailed claim information, validate member data, and process claims according to different business rules.

## 🎯 Key Features

- **Claims Search & Management**: Search claims by Claim Number (Document Control Number) and view comprehensive claim details
- **Scenario-Based Processing**: Three distinct scenarios simulating real-world claims processing challenges
- **Member Information Management**: Search and validate member demographics and contract information
- **Provider Information Display**: Comprehensive provider details and network participation
- **Payment Information**: Detailed breakdown of claim costs, deductibles, copays, and payment amounts
- **Interactive Claim Lines**: View and edit procedure codes, modifiers, and service details
- **Real-time Validation**: Dynamic validation of member data against claim forms
- **Contract Management**: Apply different contracts and validate service date eligibility

## 📋 The Three Scenarios

### Scenario 507 - Patient Information Mismatch (Claim Number: 25048AA1000)
**Challenge**: Member demographics in the system don't match the claim form data
- **Edit Code**: 507 - "Patient information mismatch - verify member demographics"
- **Validation**: System validates patient name, DOB, and subscriber ID against claim form
- **Expected Action**: PAY (after correcting member information)
- **Learning Objective**: Importance of accurate member data validation

### Scenario 509 - Contract Group Validation (Claim Number: 25048AA1001)
**Challenge**: Contract group validation required - verify active eligibility
- **Edit Code**: 509 - "Contract group validation required - verify active eligibility"
- **Validation**: Service date must fall within contract effective period for correct group
- **Expected Action**: PAY (after applying correct group "200000M001")
- **Learning Objective**: Understanding contract periods and group eligibility

### Scenario 597 - Service Date Outside Contract Period (Claim Number: 25048AA1002)
**Challenge**: No active eligibility for service dates
- **Edit Code**: 597 - "No active eligibility for service dates - service date outside contract period"
- **Validation**: Service date falls outside member's contract effective period
- **Expected Action**: DENY (service not covered due to no active eligibility)
- **Learning Objective**: Managing claims when services occur outside coverage periods

## 🏗️ Architecture

### Frontend Architecture
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components (buttons, cards, forms, etc.)
│   ├── ClaimData.tsx    # Claim processing data display
│   ├── ClaimImage.tsx   # Claim form image viewer
│   ├── Member.tsx       # Member search and contract management
│   ├── Pricing.tsx      # Claim line pricing editor
│   └── SearchTabs.tsx   # Tabbed interface for claim details
├── pages/               # Main application pages
│   ├── GetStarted.tsx   # Landing page
│   ├── SearchClaims.tsx # Claim search interface
│   ├── ClaimDetails.tsx # Detailed claim view
│   └── NotFound.tsx     # 404 error page
├── services/            # API and business logic
│   └── claimsService.ts # Claims data management
├── integrations/        # Third-party integrations
│   └── supabase/        # Supabase client and types
└── hooks/               # Custom React hooks
```

### Database Architecture (Supabase PostgreSQL)

#### Core Tables

**1. claims** - Main claims information
```sql
- id: uuid (Primary Key)
- dcn: text (Document Control Number - Unique identifier)
- title: text (Patient title - Mr., Ms., etc.)
- last_name: text (Patient last name)
- dob: date (Date of birth)
- sex: text (Gender)
- member_code: text (Member type code)
- contract_type: text (Contract classification)
- relationship: text (Relationship to subscriber)
- pcp: text (Primary Care Provider)
- erisa: text (ERISA plan indicator)
- billed: numeric (Total billed amount)
- allowed: numeric (Total allowed amount)
- paid: numeric (Total paid amount)
- edits: text[] (Array of edit codes)
- action_code: text (Processing action)
- status: text (Claim status)
- scenario_type: text (Scenario classification)
- created_at: timestamp
- updated_at: timestamp
```

**2. members** - Member demographic and eligibility information
```sql
- id: uuid (Primary Key)
- hcid: text (Health Card ID)
- first_name: text (Member first name)
- last_name: text (Member last name)
- dob: date (Date of birth)
- sex: text (Gender)
- group_id: text (Group identifier)
- group_contract: text (Contract number)
- effective_date: date (Coverage start date)
- end_date: date (Coverage end date)
- subscriber_id: text (Subscriber identifier)
- relationship: text (Relationship to subscriber)
- address: text (Member address)
- city: text (City)
- state: text (State)
- zip_code: text (ZIP code)
- [Additional demographic fields...]
```

**3. claim_lines** - Individual service line items
```sql
- id: uuid (Primary Key)
- claim_id: uuid (Foreign key to claims)
- line_no: integer (Line number)
- service_from_date: date (Service start date)
- service_to_date: date (Service end date)
- pos: text (Place of service)
- service: text (Service description)
- procedure_code: text (CPT/HCPCS code)
- modifiers: text[] (Procedure modifiers)
- units: integer (Service units)
- diagnosis: text (Diagnosis code)
- billed: numeric (Line billed amount)
```

**4. providers** - Healthcare provider information
```sql
- id: uuid (Primary Key)
- rendering_npi: text (National Provider Identifier)
- rendering_name: text (Provider name)
- billing_name: text (Billing entity name)
- billing_npi: text (Billing NPI)
- specialty: text (Provider specialty)
- network_option: text (Network participation)
- taxonomy: text (Provider taxonomy code)
- [Additional provider fields...]
```

**5. claim_forms** - Claim form image metadata
```sql
- id: uuid (Primary Key)
- dcn: text (Document Control Number)
- patient_name: text (Patient name from form)
- dob: date (DOB from form)
- service_date_from: date (Service start date)
- service_date_to: date (Service end date)
- zip_code: text (Service ZIP code)
- [Additional form fields...]
```

## 🛠️ Technology Stack

### Frontend Framework & Libraries
| Package | Version | Purpose |
|---------|---------|---------|
| **React** | ^18.3.1 | Core frontend framework for building user interfaces |
| **TypeScript** | ^5.8.3 | Type safety and enhanced developer experience |
| **Vite** | ^5.4.19 | Fast build tool and development server |
| **React Router DOM** | ^6.30.1 | Client-side routing and navigation |

### UI Framework & Components
| Package | Version | Purpose |
|---------|---------|---------|
| **Tailwind CSS** | ^3.4.17 | Utility-first CSS framework for styling |
| **shadcn/ui** | Various | High-quality, accessible UI component library built on Radix UI |
| **@radix-ui/*** | Various | Accessible, unstyled UI primitives (accordion, dialog, select, etc.) |
| **Lucide React** | ^0.462.0 | Beautiful, customizable SVG icons |
| **class-variance-authority** | ^0.7.1 | Creating type-safe component variants |
| **clsx** | ^2.1.1 | Utility for conditionally joining classNames |
| **tailwind-merge** | ^2.6.0 | Merge Tailwind CSS classes without style conflicts |

### Backend & Database
| Package | Version | Purpose |
|---------|---------|---------|
| **Supabase** | ^2.57.4 | Backend-as-a-Service (BaaS) providing PostgreSQL database, authentication, and real-time features |
| **PostgreSQL** | Latest | Robust relational database with advanced features |

### State Management & Data Fetching
| Package | Version | Purpose |
|---------|---------|---------|
| **@tanstack/react-query** | ^5.83.0 | Powerful data synchronization for React applications |

### Form Handling & Validation
| Package | Version | Purpose |
|---------|---------|---------|
| **React Hook Form** | ^7.61.1 | Performant, flexible forms with easy validation |
| **@hookform/resolvers** | ^3.10.0 | Validation resolvers for React Hook Form |
| **Zod** | ^3.25.76 | TypeScript-first schema validation |

### UI Enhancement Libraries
| Package | Version | Purpose |
|---------|---------|---------|
| **date-fns** | ^3.6.0 | Modern JavaScript date utility library |
| **react-day-picker** | ^8.10.1 | Date picker component for React |
| **Sonner** | ^1.7.4 | Opinionated toast component for React |
| **next-themes** | ^0.3.0 | Dark mode support with system preference detection |
| **embla-carousel-react** | ^8.6.0 | Carousel/slider component |
| **recharts** | ^2.15.4 | Composable charting library for React |
| **input-otp** | ^1.4.2 | OTP (One-Time Password) input component |
| **vaul** | ^0.9.9 | Drawer component for mobile interfaces |

### Development Tools
| Package | Version | Purpose |
|---------|---------|---------|
| **ESLint** | ^9.32.0 | Code linting and quality enforcement |
| **TypeScript ESLint** | ^8.38.0 | TypeScript-specific ESLint rules |
| **Autoprefixer** | ^10.4.21 | PostCSS plugin to parse CSS and add vendor prefixes |
| **PostCSS** | ^8.5.6 | Tool for transforming CSS with JavaScript |

## 🎨 Design System

### Color Palette (HSL Values)
```css
/* Primary Colors */
--primary: 213 94% 68%        /* Healthcare blue */
--primary-foreground: 0 0% 100%

/* Background & Surface */
--background: 240 10% 98%     /* Light gray background */
--card: 0 0% 100%            /* White cards */
--foreground: 215 25% 25%    /* Dark text */

/* Status Colors */
--destructive: 0 75% 60%     /* Error red */
--success: 142 76% 36%       /* Success green */
--warning: 38 92% 50%        /* Warning orange */
--info: 213 94% 68%          /* Info blue */

/* Healthcare-specific */
--healthcare-blue: 213 94% 68%
--healthcare-blue-dark: 213 85% 55%
```

### Component Architecture
- **Semantic Design Tokens**: All colors use HSL values defined in CSS custom properties
- **Component Variants**: Type-safe variants using class-variance-authority
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities
- **Dark Mode Support**: Complete dark theme with automatic system preference detection

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd healthcare-claims-system

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Setup
The application connects to Supabase using the following configuration:
- **Supabase URL**: https://skkfbhktfscvvxangkoh.supabase.co
- **Anon Key**: Pre-configured in the client

## 📱 Application Flow

### 1. Getting Started Page
- Landing page with introduction to the claims processing system
- Navigation to search functionality

### 2. Search Claims Page
- Search interface for finding claims by Claim Number
- Results table showing claim summary information
- Direct navigation to claim details

### 3. Claim Details Page
- Comprehensive claim information display
- Tabbed interface with multiple sections:
  - **Event Resolution**: Edit codes, status, and action buttons
  - **Member Information**: Demographics and contract details
  - **Provider Information**: Healthcare provider details
  - **Payment Information**: Financial breakdown
  - **Claim Header**: Service dates and benefit indicators
  - **Claim Lines**: Procedure codes and service details
  - **Claim Data**: Raw claim processing data
  - **Search Tabs**: Claim image, member search, and pricing

### 4. Interactive Features
- **Member Search**: Find and select correct member contracts
- **Contract Application**: Apply different group contracts to claims
- **Data Validation**: Real-time validation of member data against claim forms
- **Action Processing**: Submit pay/deny actions with scenario-specific validation

## 🔒 Security Features

- **Row Level Security (RLS)**: Enabled on all Supabase tables
- **Type Safety**: Full TypeScript implementation
- **Input Validation**: Zod schema validation for all forms
- **SQL Injection Prevention**: Parameterized queries through Supabase client

## 🎓 Learning Objectives

This application teaches:
1. **Claims Processing Workflow**: Understanding the complete lifecycle of healthcare claims
2. **Data Validation**: Importance of accurate member information and eligibility verification
3. **Contract Management**: How coverage periods and group contracts affect claim processing
4. **Edit Code Resolution**: Common claim edit scenarios and their resolution strategies
5. **Healthcare Industry Standards**: Exposure to real-world healthcare data structures and terminology

## 🔄 Business Logic

### Scenario Validation Logic
Each scenario implements specific business rules:

**Scenario 507**: Validates patient demographics match between claim form and member record
**Scenario 509**: Ensures service dates fall within active contract periods
**Scenario 597**: Identifies claims with services outside coverage periods

### Data Relationships
- Claims connect to members through subscriber ID and demographics
- Claim lines link to main claims for service detail
- Providers connect through NPI numbers
- Contract validation uses effective/end dates

## 📊 Performance Considerations

- **Lazy Loading**: Components load data only when needed
- **Query Optimization**: Efficient Supabase queries with proper indexing
- **State Management**: React Query for caching and synchronization
- **Bundle Optimization**: Tree-shaking and code splitting with Vite

## 🤝 Contributing

When contributing to this project:
1. Follow the established TypeScript patterns
2. Use the design system tokens for all styling
3. Implement proper error handling
4. Write comprehensive tests for new scenarios
5. Document any new business rules or validation logic

## 📞 Support

For questions about the healthcare claims processing logic or technical implementation, refer to the code comments and documentation within the `/src/services/claimsService.ts` file.

---

*This application is designed for educational purposes to demonstrate healthcare claims processing concepts and modern web development practices.*