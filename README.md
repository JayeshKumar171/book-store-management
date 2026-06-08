# Book Management Dashboard

A responsive React.js dashboard application for managing books with full CRUD operations, advanced search, filtering, and pagination capabilities.

## Features

### Core Functionality
- **Book Management**: Add, edit, delete, and view books in a responsive table/grid layout
- **Pagination**: Display 10 books per page with easy navigation
- **Search**: Search books by title or author in real-time
- **Filters**: Filter books by genre and availability status (Available/Issued)
- **Form Validation**: Robust form validation using react-hook-form with Zod schema validation
- **Confirmation Dialogs**: Delete confirmation popup to prevent accidental deletions
- **Toast Notifications**: User-friendly notifications for all actions (success/error)
- **Loading States**: Loading skeletons and spinners during data fetching

### Technical Features
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **State Management**: Context API for global state management
- **Data Fetching**: SWR for efficient API calls with caching and revalidation
- **Styling**: Pure Tailwind CSS with no UI component libraries
- **Type Safety**: Full TypeScript support with proper type definitions
- **Mock API**: Integration with crudcrud.com for backend operations

## Tech Stack

- **Frontend Framework**: Next.js 16 with App Router
- **UI Styling**: Tailwind CSS v4
- **Form Management**: react-hook-form with Zod validation
- **Data Fetching**: SWR (Stale-While-Revalidate)
- **State Management**: React Context API
- **Notifications**: Sonner
- **Language**: TypeScript

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx           # Root layout with Sonner provider
│   ├── page.tsx             # Dashboard home page
│   ├── globals.css          # Global styles and Tailwind config
│   └── loading.tsx          # Loading skeleton component
├── components/
│   ├── book-table.tsx       # Book table with edit/delete actions
│   ├── book-form.tsx        # Add/Edit book modal form
│   ├── search-filter.tsx    # Search and filter controls
│   ├── delete-confirmation.tsx  # Delete confirmation dialog
│   └── pagination.tsx       # Pagination controls
├── lib/
│   ├── types.ts             # TypeScript type definitions
│   ├── api.ts               # API calls using SWR
│   └── context.tsx          # Context API setup
└── package.json             # Project dependencies
\`\`\`

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Steps

1. **Clone or download the project**
   \`\`\`bash
   cd book-management-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser**
   Navigate to `http://localhost:3000`

## Usage

### Adding a Book
1. Click the "Add New Book" button on the dashboard
2. Fill in the book details (Title, Author, Genre, Published Year, Status)
3. Click "Add Book" to submit
4. A success notification will appear

### Editing a Book
1. Click the "Edit" button on any book row
2. Modify the book details in the modal
3. Click "Update Book" to save changes
4. A success notification will appear

### Deleting a Book
1. Click the "Delete" button on any book row
2. Confirm the deletion in the popup dialog
3. The book will be removed and a success notification will appear

### Searching Books
1. Use the search bar at the top to search by title or author
2. Results update in real-time as you type

### Filtering Books
1. Use the "Genre" dropdown to filter by book genre
2. Use the "Status" dropdown to filter by availability (Available/Issued)
3. Combine multiple filters for refined results

### Pagination
1. Navigate between pages using the pagination controls at the bottom
2. Each page displays 10 books
3. Current page is highlighted

## API Integration

The application uses **crudcrud.com** as the mock API backend.

### API Endpoints
- `GET /books` - Fetch all books
- `POST /books` - Create a new book
- `PUT /books/:id` - Update a book
- `DELETE /books/:id` - Delete a book

### Book Data Structure
\`\`\`typescript
{
  _id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  status: "Available" | "Issued";
}
\`\`\`

## Form Validation

The application uses Zod schema validation with react-hook-form:

- **Title**: Required, minimum 2 characters
- **Author**: Required, minimum 2 characters
- **Genre**: Required, must be selected from predefined list
- **Published Year**: Required, must be a valid year (1000-current year)
- **Status**: Required, must be "Available" or "Issued"

## Styling

The project uses **Tailwind CSS v4** for all styling with:
- Responsive design using Tailwind breakpoints (sm, md, lg, xl)
- Dark mode support
- Custom color scheme for professional appearance
- Smooth transitions and hover effects
- Mobile-first approach

## Performance Optimizations

- **SWR Caching**: Automatic caching and revalidation of API data
- **Loading Skeletons**: Skeleton screens during data fetching
- **Debounced Search**: Search input is optimized to reduce API calls
- **Pagination**: Only 10 books loaded per page for better performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- User authentication and authorization
- Advanced filtering with multiple criteria
- Export books to CSV/PDF
- Book ratings and reviews
- User preferences and saved filters
- Dark mode toggle
- Bulk operations (delete multiple books)

## Troubleshooting

### Books not loading?
- Check your internet connection
- Verify the crudcrud.com API is accessible
- Check browser console for error messages

### Form validation errors?
- Ensure all required fields are filled
- Check that Published Year is between 1000 and current year
- Verify Genre and Status are selected from dropdowns

### Notifications not showing?
- Ensure Sonner is properly installed
- Check that the Toaster component is in the layout

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please check the browser console for error messages or review the component code for implementation details.
