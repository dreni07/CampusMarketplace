# CampusMarketplace

A marketplace where university students buy and sell items with each other.
Built with plain HTML, CSS and JavaScript (plus jQuery).

The site has two parts:

- **Landing** (public): the HTML files in the project root.
- **Dashboard** (after login): the HTML files in `dashboard/`.

## Folder structure

```
CampusMarketplace/
├── index.html              Landing: home page
├── about.html              Landing: about
├── contact.html            Landing: contact form
├── login.html              Landing: log in
├── register.html           Landing: sign up
│
├── dashboard/
│   ├── index.html          Dashboard: overview
│   ├── browse.html         Browse and filter items
│   ├── sell.html           Post a new item
│   ├── my-listings.html    The user's own items
│   └── profile.html        Profile and settings
│
├── assets/
│   ├── css/
│   │   ├── main.css        Shared entry stylesheet, linked on every page
│   │   ├── base/           Reset, variables (colors, spacing), typography
│   │   ├── components/     Reusable pieces: buttons, forms, cards, header...
│   │   ├── layout/         Page skeletons: landing layout, dashboard layout
│   │   ├── utilities/      Animations and small helper classes
│   │   └── pages/
│   │       ├── landing/    Styles used by only one landing page
│   │       └── dashboard/  Styles used by only one dashboard page
│   │
│   ├── js/
│   │   ├── components/     Behavior for shared pieces: header, sidebar, modal, toast
│   │   ├── utils/          Helpers: form validation, date/string formatting, storage, auth
│   │   ├── data/           Sample data (no backend): listings, categories, users
│   │   └── pages/
│   │       ├── landing/    One script per landing page
│   │       └── dashboard/  One script per dashboard page
│   │
│   └── images/
│       ├── landing/        Hero and section images
│       ├── listings/       Item photos
│       ├── avatars/        Profile pictures
│       └── icons/          Icons and logo
│
├── docs/
│   └── screenshots/        Screenshots for documentation and browser testing
│
└── .github/
    └── CODEOWNERS          Makes the project lead the reviewer on every PR
```

### Where does my code go?

- Used on **one page only** → `assets/css/pages/...` or `assets/js/pages/...`
- Used on **more than one page** → `components/` or `utils/`
- File names are lowercase with dashes: `my-listings.html`, not `MyListings.html`.

## Running locally

Open the project in VS Code and start it with the **Live Server** extension
(right-click `index.html` → "Open with Live Server").

## Workflow

Nothing is pushed directly to `main`. Every change goes through a branch and a
pull request that the project lead reviews and approves.
