## README

Live Application URL: **[https://pastebin-lite-t5l1.vercel.app/](https://pastebin-lite-t5l1.vercel.app/)**

### Running the App Locally

1. Clone the repository:

```bash
git clone https://github.com/ayashakushwaha/pastebin-lite
cd pastebin-lite
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   Create a `.env` file and add:

```env
DATABASE_URL=""
NEXT_PUBLIC_APP_URL=""
```

4. Run database migrations:

```bash
npx drizzle-kit push
```

5. Start the development server:

```bash
npm run dev
```

The app will be available at **[http://localhost:3000](http://localhost:3000)**.

---

### Persistence Layer

* **Database**: PostgreSQL
* **ORM**: **Drizzle ORM**
* **Database Client**: **PrismaDB**

---