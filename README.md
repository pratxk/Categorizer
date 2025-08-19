# Admin Dashboard - Categorizer

A modern, responsive admin dashboard built with Next.js 14, ShadCN UI, and Tailwind CSS for managing categories and products.

## 🚀 Features

### Dashboard
- **Overview Statistics**: View total categories, products, active categories, and average price
- **Quick Actions**: Easy access to add categories and products
- **Recent Activity**: Track latest changes in the system

### Categories Management
- **List Categories**: View all categories with search functionality
- **Create Category**: Add new categories with name and description
- **Update Category**: Edit existing category information
- **Delete Category**: Remove categories with confirmation dialog
- **Local Storage**: Categories are persisted in browser localStorage

### Products Management
- **List Products**: View all products with search and category filtering
- **Create Product**: Add new products with title, description, price, category, and image
- **Update Product**: Edit existing product information
- **Delete Product**: Remove products with confirmation dialog
- **API Integration**: Uses DummyJSON API for product operations
- **Real-time Data**: Products are fetched from external API

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI Components**: ShadCN UI
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast notifications)
- **API**: DummyJSON for products, localStorage for categories
- **TypeScript**: Full type safety

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd categorizer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Project Structure

```
categorizer/
├── app/
│   ├── categories/
│   │   └── page.tsx          # Categories management page
│   ├── products/
│   │   └── page.tsx          # Products management page
│   ├── layout.tsx            # Root layout with Toaster
│   ├── page.tsx              # Dashboard home page
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # ShadCN UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   ├── textarea.tsx
│   │   ├── sonner.tsx
│   │   └── badge.tsx
│   └── layout.tsx            # Shared layout component
├── lib/
│   └── utils.ts              # Utility functions
└── package.json
```

## 🔧 API Integration

### Products API (DummyJSON)
- **GET** `/products` - Fetch all products
- **POST** `/products/add` - Add new product
- **PUT** `/products/{id}` - Update product
- **DELETE** `/products/{id}` - Delete product

### Categories (Local Storage)
Categories are managed locally using browser localStorage for persistence.

## 🎨 UI Components Used

- **Button**: Primary actions and navigation
- **Card**: Content containers and statistics
- **Dialog**: Modal forms for add/edit operations
- **Form**: Input validation and handling
- **Input**: Text and number inputs
- **Label**: Form field labels
- **Select**: Dropdown selections
- **Table**: Data display
- **Textarea**: Multi-line text input
- **Badge**: Status indicators
- **Sonner**: Toast notifications

## 🚀 Key Features

### Responsive Design
- Mobile-first approach
- Responsive tables and forms
- Adaptive layout for different screen sizes

### User Experience
- Loading states with spinners
- Toast notifications for feedback
- Confirmation dialogs for destructive actions
- Search and filtering capabilities
- Clean and intuitive interface

### Data Management
- Real-time product data from API
- Local storage for categories
- Optimistic updates
- Error handling with user feedback

## 🎯 Future Enhancements

- [ ] Pagination for large datasets
- [ ] Advanced filtering options
- [ ] Bulk operations
- [ ] Export functionality
- [ ] User authentication
- [ ] Dark mode theme
- [ ] Real-time updates
- [ ] Image upload functionality

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
