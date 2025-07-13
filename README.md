# Personal Notes & Bookmark Manager

A full-stack MERN application for managing personal notes and bookmarks with search, filtering, and tagging capabilities.

## Features

### Notes
- Create, read, update, and delete notes
- Rich text content with title and tags
- Mark notes as favorites
- Search by title and content
- Filter by tags

### Bookmarks
- Save URLs with automatic title fetching
- Add descriptions and tags
- Mark bookmarks as favorites
- Search by title and description
- Filter by tags
- URL validation

### General Features
- Responsive design with Tailwind CSS
- JWT-based authentication (optional)
- Search and filter functionality
- Tag-based organization
- Mobile-first UI design

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cheerio** - Web scraping for title fetching
- **Axios** - HTTP client

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - API communication
- **Lucide React** - Icons
- **Vite** - Build tool

## Project Structure

\`\`\`
root/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                 # Express backend
│   ├── controllers/        # Business logic
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middlewares/       # Custom middleware
│   ├── server.js          # Entry point
│   ├── package.json
│   └── .env               # Environment variables
└── package.json           # Root package.json
\`\`\`

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd notes-bookmarks-manager
\`\`\`

### 2. Install dependencies
\`\`\`bash
# Install root dependencies
npm install

# Install server dependencies
npm run install-server

# Install client dependencies
npm run install-client
\`\`\`

### 3. Environment Setup
Create a `.env` file in the `server/` directory:
\`\`\`env
MONGODB_URI=
JWT_SECRET=
PORT=
\`\`\`

### 4. Start MongoDB
Make sure MongoDB is running on your system.

### 5. Run the application
\`\`\`bash
# Run both frontend and backend concurrently
npm run dev

# Or run separately:
npm run server

npm run client
\`\`\`

## API Endpoints

### Notes
- `POST /api/notes` - Create a new note
- `GET /api/notes` - Get all notes (with optional search and filter)
- `GET /api/notes/:id` - Get a specific note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

### Bookmarks
- `POST /api/bookmarks` - Create a new bookmark
- `GET /api/bookmarks` - Get all bookmarks (with optional search and filter)
- `GET /api/bookmarks/:id` - Get a specific bookmark
- `PUT /api/bookmarks/:id` - Update a bookmark
- `DELETE /api/bookmarks/:id` - Delete a bookmark

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Query Parameters
- `q` - Search term for text search
- `tags` - Comma-separated list of tags to filter by

Example: `/api/notes?q=javascript&tags=tutorial,web`

## Usage

### Creating Notes
1. Navigate to the Notes page
2. Click "New Note"
3. Fill in title, content, and optional tags
4. Optionally mark as favorite
5. Save the note

### Creating Bookmarks
1. Navigate to the Bookmarks page
2. Click "New Bookmark"
3. Enter the URL (title will be auto-fetched)
4. Add optional description and tags
5. Optionally mark as favorite
6. Save the bookmark

### Searching and Filtering
- Use the search bar to find notes/bookmarks by text
- Click "Filters" to filter by tags
- Combine search and tag filters for precise results

### Authentication (Optional)
- Register for an account to keep your data private
- Login to access your personal notes and bookmarks
- Data is isolated per user when authenticated

## Development

### Adding New Features
1. Backend: Add routes in `server/routes/`, controllers in `server/controllers/`
2. Frontend: Add components in `client/src/components/`, pages in `client/src/pages/`
3. Update API service in `client/src/services/api.js`

### Database Schema
- **Notes**: title, content, tags[], isFavorite, userId, timestamps
- **Bookmarks**: url, title, description, tags[], isFavorite, userId, timestamps
- **Users**: username, email, password, timestamps

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
