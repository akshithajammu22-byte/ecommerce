# ShopHub - Ecommerce Website

A modern, fully functional ecommerce website built with HTML, CSS, and JavaScript.

## Features

✨ **Product Catalog**
- Browse 12+ sample products across multiple categories
- Search products by name or description
- Filter products by category (Electronics, Fashion, Home, Books)

🛒 **Shopping Cart**
- Add/remove products from cart
- Adjust product quantities
- Real-time cart total calculation
- Persistent cart (saved in browser localStorage)

📦 **Product Details**
- View detailed product information in modal
- High-quality product images
- Complete product descriptions and pricing

💳 **Checkout**
- Simple checkout process
- Order confirmation

🎨 **Responsive Design**
- Mobile-friendly interface
- Works on all screen sizes (desktop, tablet, mobile)
- Smooth animations and transitions

📧 **Contact Form**
- Get in touch with customer support
- Message validation

## Project Structure

```
ecommerce/
├── index.html      # Main HTML file
├── styles.css      # CSS styling and responsive design
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## How to Use

### Clone the Repository
```bash
git clone https://github.com/akshithajammu22-byte/ecommerce.git
cd ecommerce
```

### Open in Browser
Simply open `index.html` in your web browser:
- **Windows:** Double-click `index.html`
- **Mac/Linux:** Right-click → Open with → Your browser

Or use a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (with http-server installed)
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## Features in Detail

### 1. Product Search & Filter
- Real-time search across product titles and descriptions
- Category-based filtering
- Combined search + filter functionality

### 2. Shopping Cart
- Add products with custom quantities
- Update quantities directly in cart
- Remove items from cart
- Cart persists across browser sessions using localStorage
- Dynamic cart item count display

### 3. Product Modal
- Click "View" on any product to see full details
- Adjust quantity before adding to cart
- Beautiful modal overlay

### 4. Responsive Layout
- Mobile-first design approach
- Breakpoints for tablets (768px) and phones (480px)
- Touch-friendly buttons and interface

### 5. Local Storage
- Cart data automatically saved to browser
- Data persists even after closing the browser
- Easy cart restoration on page reload

## Customization

### Add More Products
Edit `script.js` and add products to the `products` array:

```javascript
const products = [
    {
        id: 13,
        title: "Your Product Name",
        category: "Category Name",
        price: 99.99,
        image: "image-url",
        description: "Product description"
    },
    // Add more...
];
```

### Change Colors
Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #007bff;      /* Main blue */
    --secondary-color: #6c757d;    /* Gray */
    --success-color: #28a745;      /* Green */
    --danger-color: #dc3545;       /* Red */
    --dark-color: #343a40;         /* Dark */
    --light-color: #f8f9fa;        /* Light */
}
```

### Customize Product Images
Replace placeholder images with actual product images:
```javascript
image: "https://your-image-url.com/image.jpg"
```

## Future Enhancements

🔧 Potential features to add:
- User authentication/login system
- Payment gateway integration (Stripe, PayPal)
- Backend database for products
- Order history and tracking
- Product reviews and ratings
- Wishlist functionality
- Discount codes and coupons
- Admin panel for product management
- Email notifications for orders

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Styling and animations
- **Vanilla JavaScript** - No dependencies, pure JS
- **LocalStorage API** - Client-side data persistence

## File Sizes

- `index.html` - ~6 KB
- `styles.css` - ~15 KB
- `script.js` - ~11 KB
- **Total** - ~32 KB (lightweight!)

## Tips for Usage

1. **Test the Search:** Try searching for "phone" or "shirt"
2. **Try Filtering:** Select a category from the dropdown
3. **Add to Cart:** Click the "Add to Cart" button or use "View" for details
4. **Modify Quantities:** Use the +/- buttons in the cart
5. **Checkout:** Click "Checkout" to complete your order
6. **Contact Us:** Fill the contact form to send a message

## Performance Optimizations

- ✅ No external dependencies (faster loading)
- ✅ Minified CSS and JS (smaller file sizes)
- ✅ Lazy loading ready for images
- ✅ Efficient DOM manipulation
- ✅ CSS animations (GPU accelerated)
- ✅ LocalStorage for cart persistence

## Notes

- Product images use placeholder service - replace with real images
- Contact form is demo only (doesn't send emails)
- Checkout is demo only - integrate with payment gateway for production
- All data is stored locally in the browser

## License

MIT License - Feel free to use and modify this project!

## Support

For questions or issues, please open an issue on GitHub or contact the repository owner.

---

**Happy Shopping! 🛍️**

Made with ❤️ by Akshitha