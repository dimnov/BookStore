# Book Store Application

Welcome to the Book Store application repository! This web application is built using React and Firebase/Firestore to create a seamless and enjoyable experience for users to explore, search, and purchase books.

## Features

### Home Page

- **Hero Section:** Featuring a captivating header and a button that directs users to the catalog of all books.
- **Latest Added Books Section:** Displays the 8 most recently added books.
- **Newsletter Subscription:** Allows users to subscribe to the newsletter using their email.

### Catalog (Shop) Page

- **Book Display:** Shows all books with their cover, title, and price.
- **Pagination:** Initially loads 15 books and provides a button to fetch another 15 books.
- **Book Details:** Clicking on a book opens a details page with category, description, images, and options to add to the cart and favorite list.
- **Comment Section:** Only logged-in users can comment, edit, and delete their comments.
- **Related Books:** Displays books with the same category (1 to 4).

### Search Page

- Allows users to search for books by their name.

### Favorite Page

- Displays the favorite books added by users (only available for logged-in users).

### Admin Panel

- Admins can add new books and delete existing ones.

### Navigation Bar

- Includes links to Home, All Books, Search, and Favorite pages.
- Sign-up button for guests and logout button for logged-in users.
- Displays the cart with the number of products.

### Cart Page

- Lists all added products with detailed information.
- Shows subtotal, shipping fee ($5 if the cart is below $50), and a button to proceed to checkout.
