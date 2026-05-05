# API Documentation

## Base URL

**Local:** `http://localhost:5000`
**Production:** `https://xxxx.railway.app`

---

## Photo Operations

### Upload Photo

```http
POST /api/photos/upload
Content-Type: multipart/form-data

Body:
- photo: [image file]
```

**Response:**
```json
{
  "success": true,
  "filePath": "/uploads/photo-123456.jpg",
  "fileName": "photo-123456.jpg",
  "metadata": {
    "width": 1920,
    "height": 1080,
    "format": "jpeg"
  }
}
```

---

### Edit Photo

```http
POST /api/photos/edit
Content-Type: application/json

Body:
{
  "imagePath": "/uploads/photo-123456.jpg",
  "rotate": 45,
  "brightness": 20,
  "contrast": 10
}
```

**Response:**
```json
{
  "success": true,
  "imagePath": "/uploads/edited-123456.png",
  "message": "Photo edited successfully"
}
```

---

### Remove Background

```http
POST /api/photos/remove-bg
Content-Type: application/json

Body:
{
  "imageUrl": "/uploads/photo-123456.jpg",
  "bgColor": "white"
}
```

**Response:**
```json
{
  "success": true,
  "imagePath": "/uploads/bg-removed-123456.png",
  "message": "Background removed successfully"
}
```

---

### Change Clothes Style

```http
POST /api/photos/change-clothes
Content-Type: application/json

Body:
{
  "imagePath": "/uploads/photo-123456.jpg",
  "clothesStyle": "formal"
}
```

**Response:**
```json
{
  "success": true,
  "imagePath": "/uploads/photo-123456.jpg",
  "clothesStyle": "formal",
  "message": "Clothes style applied"
}
```

---

## Print Operations

### Arrange Photos

```http
POST /api/print/arrange
Content-Type: application/json

Body:
{
  "imagePath": "/uploads/photo-123456.jpg",
  "photoSize": "passport",
  "copies": 6
}
```

**Response:**
```json
{
  "success": true,
  "arrangement": {
    "photoSize": "passport",
    "copies": 6,
    "pixelWidth": 413,
    "pixelHeight": 531,
    "photoBuffer": "base64encodedstring..."
  },
  "message": "6 copies arranged for passport size"
}
```

---

### Generate PDF

```http
POST /api/print/generate-pdf
Content-Type: application/json

Body:
{
  "arrangement": {
    "photoSize": "passport",
    "copies": 6,
    "pixelWidth": 413,
    "pixelHeight": 531,
    "photoBuffer": "base64encodedstring..."
  }
}
```

**Response:**
```json
{
  "success": true,
  "pdfPath": "/uploads/passport-photos-123456.pdf",
  "fileName": "passport-photos-123456.pdf",
  "pages": 1,
  "message": "PDF generated successfully"
}
```

---

## Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-05-05T23:45:00.000Z"
}
```

---

## Photo Sizes

| Name | Dimensions | mm |
|------|------------|----|
| Passport | 1.38" × 1.77" | 35 × 45 |
| 2×2 | 2" × 2" | 50 × 50 |
| 4×6 | 4" × 6" | 101 × 152 |
| Custom | Custom | Custom |

---

## Error Handling

### 400 Bad Request
```json
{
  "error": "imagePath is required"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to process image"
}
```

---

## Rate Limiting

No rate limiting on free Railway tier.
Production should implement:
- Max 10 requests/second per IP
- Max file size: 50MB
- Max concurrent uploads: 100

---

## CORS

All endpoints accept requests from:
- `http://localhost:3000` (local)
- `https://*.vercel.app` (production)
- `http://localhost:*` (any local port)
