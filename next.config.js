/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // src/ directory jest wspierane domyślnie w Next.js 15
  }
};

module.exports = nextConfig;
```

---

### 3. Sprawdź strukturę folderów w repo na GitHubie

Upewnij się że masz dokładnie tak:
```
cold-mail-generator/
├── src/
│   └── app/
│       ├── page.tsx        ← musi istnieć
│       ├── layout.tsx      ← musi istnieć
│       └── globals.css
