# Aptura Tech Solutions - To-Do App

A modern, responsive To-Do application built with HTML5, CSS3, ES6+ JavaScript, and Bootstrap 5, featuring a beautiful glassmorphism design.

## 🌟 Features

- **Add Tasks**: Easily add new tasks with a clean input interface
- **Edit Tasks**: Double-click any task or use the edit button to modify it
- **Delete Tasks**: Remove tasks with a single click
- **Toggle Completion**: Mark tasks as complete/incomplete with checkbox
- **Filter Tasks**: View All, Active, or Completed tasks
- **Clear Completed**: Bulk remove all completed tasks
- **Local Storage**: Tasks persist across browser sessions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Glassmorphism UI**: Modern, frosted glass aesthetic with gradient backgrounds
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge, or Opera)
- No build tools or dependencies required

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Open `index.html` in your web browser

```bash
# Simply open the file in your browser
start index.html  # Windows
open index.html   # macOS
xdg-open index.html # Linux
```

### Using a Local Server (Optional)

For better development experience, you can use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## 📁 Project Structure

```
todo-app/
├── assets/
│   └── logo.jpg              # Company logo
├── index.html                # Main HTML structure
├── css/
│   └── style.css                #Glassmorphism styling
├── js/
│   └── script.js                    # ES6+ JavaScript logic
├── README.md                 # Project documentation
└── REPORT.md                 # Project report
```

## 🎨 Design Features

### Glassmorphism Theme
- Frosted glass effect with backdrop blur
- Semi-transparent backgrounds
- Gradient color scheme (purple to pink)
- Subtle shadows and borders
- Animated background gradients

### Color Palette
- **Primary Gradient**: Purple (#667eea) to Blue-purple (#764ba2)
- **Secondary Gradient**: Pink (#f093fb) to Red-pink (#f5576c)
- **Success**: Green (#00d26a)
- **Danger**: Red (#f8312f)
- **Info**: Cyan (#00d4ff)
- **Warning**: Yellow (#ffc107)

## 💻 Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Advanced styling with CSS variables, flexbox, and animations
- **JavaScript ES6+**: Modern JavaScript features including:
  - Classes and arrow functions
  - Template literals
  - Destructuring
  - Local Storage API
  - Event delegation
- **Bootstrap 5.3.2**: Responsive grid and utility classes

## 🔧 Functionality

### Core Operations

1. **Adding Tasks**
   - Enter task text in the input field
   - Click "Add" button or press Enter
   - Task appears at the top of the list

2. **Editing Tasks**
   - Double-click the task text
   - Or click the edit (pencil) icon
   - Modify the text and press Enter or click away

3. **Deleting Tasks**
   - Click the delete (trash) icon on any task
   - Task is immediately removed

4. **Toggling Completion**
   - Click the checkbox to mark as complete/incomplete
   - Completed tasks show strikethrough and reduced opacity

5. **Filtering**
   - Use "All", "Active", or "Completed" buttons
   - View specific task categories

6. **Clearing Completed**
   - Click "Clear Completed" to remove all finished tasks
   - Only affects completed tasks

### Data Persistence

- Tasks are automatically saved to browser's Local Storage
- Data persists across browser sessions
- No server or database required

## 📱 Responsive Breakpoints

- **Desktop**: > 768px - Full layout with side-by-side elements
- **Tablet**: 481px - 768px - Adjusted spacing and font sizes
- **Mobile**: ≤ 480px - Stacked layout, full-width buttons

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators for all interactive elements
- Reduced motion support for users with motion sensitivity
- Screen reader compatible

## 🌐 Browser Compatibility

- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+
- Opera: 76+

## 🐛 Troubleshooting

### Tasks not saving
- Ensure cookies and local storage are enabled in your browser
- Check browser console for errors (F12)

### Styling issues
- Clear browser cache
- Ensure Bootstrap CDN is accessible
- Check internet connection for CDN resources

### Logo not displaying
- Verify `assets/logo.jpg` exists in the correct location
- Check file path is case-sensitive

## 🔒 Security

- XSS protection through HTML escaping
- No external API calls
- All data stored locally
- No third-party tracking

## 📝 License

This project is created for Aptura Tech Solutions. All rights reserved.

## 👥 Support

For issues or questions, please contact Aptura Tech Solutions.

---

**Built with ❤️ for Aptura Tech Solutions**
