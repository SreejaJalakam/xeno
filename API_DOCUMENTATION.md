# API Documentation

Base URL: `http://localhost:4000`

## Tenant Management

### Register a New Tenant
**Endpoint:** `POST /api/tenants/register`

**Description:** Register a new Shopify store as a tenant in the system.

**Request Body:**
```json
{
  "name": "My Store",
  "shopify_store_url": "my-store.myshopify.com",
  "api_key": "shpat_xxxxxxxxxxxxx",
  "api_secret": "shpss_xxxxxxxxxxxxx"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid-here",
  "name": "My Store",
  "shopify_store_url": "my-store.myshopify.com",
  "api_key": "shpat_xxxxxxxxxxxxx",
  "api_secret": "shpss_xxxxxxxxxxxxx",
  "created_at": "2025-12-03T16:30:00.000Z",
  "updated_at": "2025-12-03T16:30:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request` - Missing required fields or tenant already exists
- `500 Internal Server Error` - Server error

---

### Get All Tenants
**Endpoint:** `GET /api/tenants`

**Description:** Retrieve a list of all registered tenants.

**Response:** `200 OK`
```json
[
  {
    "id": "uuid-here",
    "name": "My Store",
    "shopify_store_url": "my-store.myshopify.com",
    "created_at": "2025-12-03T16:30:00.000Z",
    "updated_at": "2025-12-03T16:30:00.000Z"
  }
]
```

---

## Data Ingestion

### Trigger Manual Sync
**Endpoint:** `POST /api/ingestion/trigger`

**Description:** Manually trigger data synchronization for a specific tenant.

**Request Body:**
```json
{
  "tenantId": "uuid-here"
}
```

**Response:** `200 OK`
```json
{
  "message": "Data ingestion started for tenant uuid-here"
}
```

**Error Responses:**
- `400 Bad Request` - Missing tenantId
- `404 Not Found` - Tenant not found
- `500 Internal Server Error` - Ingestion failed

---

## Analytics

### Get Dashboard Statistics
**Endpoint:** `GET /api/analytics/stats`

**Description:** Retrieve aggregated statistics for a tenant's dashboard.

**Query Parameters:**
- `tenantId` (required) - UUID of the tenant

**Example:** `GET /api/analytics/stats?tenantId=uuid-here`

**Response:** `200 OK`
```json
{
  "totalOrders": 150,
  "totalCustomers": 75,
  "totalProducts": 50,
  "totalRevenue": 45000.00,
  "avgOrderValue": 300.00
}
```

**Error Responses:**
- `400 Bad Request` - Missing tenantId
- `500 Internal Server Error` - Server error

---

### Get Sales Chart Data
**Endpoint:** `GET /api/analytics/sales-chart`

**Description:** Retrieve sales data for chart visualization (currently returns mock data).

**Response:** `200 OK`
```json
[
  { "name": "Jan", "sales": 4000 },
  { "name": "Feb", "sales": 3000 },
  { "name": "Mar", "sales": 2000 },
  { "name": "Apr", "sales": 2780 },
  { "name": "May", "sales": 1890 },
  { "name": "Jun", "sales": 2390 }
]
```

---

## Error Handling

All endpoints follow standard HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

Error responses include a JSON body:
```json
{
  "error": "Error message description"
}
```

---

## Authentication

> **Note:** This demo version uses simple tenant ID-based authentication. In production, implement proper OAuth 2.0 or JWT-based authentication.

---

## Rate Limiting

> **Note:** No rate limiting is currently implemented. For production deployment, consider adding rate limiting middleware.

---

## CORS

CORS is enabled for all origins in development. Configure appropriately for production.
