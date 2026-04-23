# Invoice App

A clean, responsive invoice management app built with **React** and **Vite**. Create, edit, filter, and manage invoices with persistent localStorage support.

---

## Features

- Create new invoices with full form validation
- Save invoices as **Draft** or **Pending** (Save & Send)
- View individual invoice details in a receipt view
- Edit existing invoices
- Delete invoices
- Mark invoices as **Paid**
- Filter invoices by status (Draft, Pending, Paid)
- Fully persistent with **localStorage**
- Responsive design for mobile, tablet, and desktop

---

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Font Awesome](https://fontawesome.com/) (icons)
- [Google Fonts – League Spartan](https://fonts.google.com/specimen/League+Spartan)
- Vanilla CSS with CSS Variables

---

## Setup & Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/your-username/invoice-app.git
cd invoice-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open in browser**

Vite will output a local URL, typically:

```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── aside.jsx
│   ├── Invoices.jsx
│   ├── buttons/
│   │   └── Button.jsx
│   ├── form/
│   │   ├── Form.jsx
│   │   └── Form.css
│   ├── header/
│   │   ├── Header.jsx
│   │   └── Header.css
│   ├── lists/
│   │   ├── Lists.jsx
│   │   └── List.css
│   ├── noinvoice/
│   │   ├── NoInvoice.jsx
│   │   └── NoInvoice.css
│   └── receipt/
│       ├── Receipt.jsx
│       └── Receipt.css
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

---

## localStorage

All invoice data is persisted in the browser's localStorage under the key `"invoices"`. No backend or database is required. Data survives page refreshes but is scoped to the browser/device.

---

## 📱 Responsive Design

The app is fully responsive across three breakpoints:

| Breakpoint         | Target        |
| ------------------ | ------------- |
| `max-width: 420px` | Mobile phones |
| `421px – 1024px`   | Tablets       |
| `1025px+`          | Desktop       |

> **Note:** The responsive layout was implemented with the assistance of AI (Claude by Anthropic) due to time constraints during development. The core application logic, component architecture, and feature implementation were built manually.

---

## Acknowledgements

- UI design inspired by the [HNG 2026 Invoice App challenge](https://www.figma.com/proto/e3MtRefbZw41Ts897CQF4N/invoice-app?node-id=0-8890&t=JKsaURj1xwY30183-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1)
- Icons by [Font Awesome](https://fontawesome.com/)
- AI assistance (responsiveness) by [Claude – Anthropic](https://claude.ai)
