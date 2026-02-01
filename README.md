# Albera - The Ultimate Sticker Album Wiki 🃏

Albera is an open-source, high-performance wiki platform dedicated to sticker album collectors worldwide. Our goal is to digitize the collecting experience by providing a comprehensive database of albums, stickers, and rarities.

## 🚀 Tech Stack

- **Frontend:** React 18 (Vite)
- **Styling:** Tailwind CSS
- **Runtime:** Node.js 22 (LTS)

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/albera.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## 🤝 How to Contribute to the Database

We are looking for collectors and enthusiasts to help us populate our database! You can contribute by adding new albums or updating sticker information.

### Data Structure

All album data is stored in `src/data/albums.json`. To add a new album, follow this schema:

```json
{
  "albumId": "unique-slug-id",
  "title": "Album Name",
  "publisher": "e.g., Panini, Topps",
  "releaseYear": 2024,
  "totalStickers": 600,
  "categories": ["Sports", "World Cup"],
  "description": "A brief history of the collection."
}
```

### Contribution Workflow

1. Fork the repository.
2. Create a new branch: `git checkout -b data/add-new-album`.
3. Update `src/data/albums.json` with accurate information.
4. Submit a Pull Request for review.

## 📈 Roadmap & Monetization

- **SEO Optimization:** Dynamic meta tags for every sticker to ensure high visibility in search engines.
- **Affiliate Integration:** Direct links to marketplaces to help users complete their collections.
- **User Portfolios:** Personal dashboards for users to track their "Got/Need" lists.

## 📝 License

This project is licensed under the MIT License.