FundFlow — Effortless Money Tracking│
├─ Problem Statements
│ ├─ People stop tracking because it feels like work
│ ├─ Too many steps just to log one expense
│ └─ Finance apps are overbuilt for simple daily use
│
├─ Proposed Solution
│ ├─ Instant expense logging (1–2 taps)
│ ├─ Smart defaults to reduce input
│ └─ Clear daily cashflow at a glance
│
├─ Target Users
│ ├─ Students / young professionals
│ ├─ People who tried tracking but gave up
│ └─ Users who want fast tracking, not full budgeting
│
├─ Core (MVP)
│ ├─ Add Expense (main action)
│ │ ├─ enter amount
│ │ ├─ auto-selected category
│ │ └─ save instantly
│ │
│ ├─ Add Income
│ │ └─ quick manual input
│ │
│ ├─ Home
│ │ ├─ today spent
│ │ └─ current balance (in vs out)
│ │
│ └─ Transactions
│ └─ simple timeline view
│
└─ Future (if people stick)
├─ recurring entries
├─ lightweight insights
├─ export (CSV)
└─ optional sync

├─ Finance Tools
│ ├─ Loan calculator

fundflow/
├─ .expo/
│  ├─ devices.json
│  └─ README.md
├─ app/
│  ├─ (tabs)/
│  │  ├─ home/
│  │  │  ├─ team/
│  │  │  │  └─ [id].tsx
│  │  │  ├─ _layout.tsx
│  │  │  ├─ bills.tsx
│  │  │  ├─ budget.tsx
│  │  │  ├─ category.tsx
│  │  │  ├─ claim.tsx
│  │  │  ├─ goals.tsx
│  │  │  ├─ index.tsx
│  │  │  ├─ notification.tsx
│  │  │  ├─ pay.tsx
│  │  │  ├─ spend.tsx
│  │  │  ├─ split.tsx
│  │  │  ├─ subscription.tsx
│  │  │  ├─ tools.tsx
│  │  │  ├─ transaction.tsx
│  │  │  └─ wishlist.tsx
│  │  ├─ _layout.tsx
│  │  └─ settings.tsx
│  ├─ _layout.tsx
│  ├─ goodbye.tsx
│  ├─ index.tsx
│  └─ welcome.tsx
├─ assets/
│  ├─ android-icon-background.png
│  ├─ android-icon-foreground.png
│  ├─ android-icon-monochrome.png
│  ├─ favicon.png
│  ├─ icon.png
│  └─ splash-icon.png
├─ components/
│  ├─ a/
│  │  ├─ billAdd.tsx
│  │  ├─ budgetAdd.tsx
│  │  ├─ categoryAdd.tsx
│  │  ├─ categoryModal.tsx
│  │  ├─ claimAdd.tsx
│  │  ├─ goalAdd.tsx
│  │  ├─ groupAdd.tsx
│  │  ├─ header.tsx
│  │  ├─ mainRow.tsx
│  │  ├─ payAdd.tsx
│  │  ├─ quickAction.tsx
│  │  ├─ recentCard.tsx
│  │  ├─ spendAdd.tsx
│  │  ├─ splitAdd.tsx
│  │  ├─ subscriptionAdd.tsx
│  │  ├─ toolModal.tsx
│  │  └─ wishlistAdd.tsx
│  ├─ b/
│  │  └─ header.tsx
│  ├─ alert.tsx
│  ├─ confirm.tsx
│  ├─ endScreen.tsx
│  ├─ header.tsx
│  ├─ keyboardLayout.tsx
│  ├─ loader.tsx
│  ├─ modal.tsx
│  ├─ navBar.tsx
│  ├─ noData.tsx
│  ├─ scrollTop.tsx
│  ├─ secHeader.tsx
│  └─ toast.tsx
├─ constants/
│  ├─ design.ts
│  └─ theme.ts
├─ contexts/
│  ├─ authContext.tsx
│  ├─ designContext.tsx
│  ├─ globalContext.tsx
│  ├─ loaderContext.tsx
│  ├─ overlayContext.tsx
│  ├─ tabContext.tsx
│  ├─ themeContext.tsx
│  └─ tokenContext.tsx
├─ hooks/
│  ├─ useBills.tsx
│  ├─ useBudget.tsx
│  ├─ useCategory.tsx
│  ├─ useClaim.tsx
│  ├─ useGlobal.tsx
│  ├─ useGoals.tsx
│  ├─ useNotification.tsx
│  ├─ usePay.tsx
│  ├─ useSpend.tsx
│  ├─ useSplit.tsx
│  ├─ useSubscription.tsx
│  ├─ useTools.tsx
│  └─ useWishlist.tsx
├─ .gitignore
├─ app.json
├─ babel.config.js
├─ metro.config.js
├─ package-lock.json
├─ package.json
├─ readme.md
└─ tsconfig.json
