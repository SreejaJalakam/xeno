# Testing Guide

This project includes example test files to demonstrate testing patterns.

## Setup

### Install Testing Dependencies
```bash
cd backend
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
```

### Configure Jest
Create `jest.config.js` in the backend directory:
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
};
```

### Add Test Scripts
Update `package.json`:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage report
npm run test:coverage
```

## Test Structure

Tests are located in `src/__tests__/` directory:
- `tenant.test.ts` - Tenant API endpoint tests
- Add more test files as needed

## Writing Tests

Example test pattern:
```typescript
import request from 'supertest';
import app from '../server';

describe('API Endpoint', () => {
  it('should return expected result', async () => {
    const response = await request(app)
      .get('/api/endpoint')
      .expect(200);
    
    expect(response.body).toHaveProperty('data');
  });
});
```

## Test Data

For testing with real database:
1. Create a test database
2. Use environment variable: `DATABASE_URL_TEST`
3. Run migrations before tests
4. Clean up after tests

## Mocking

For unit tests, mock Prisma client:
```typescript
jest.mock('../utils/prisma', () => ({
  tenant: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
}));
```

## CI/CD Integration

Tests can be integrated into CI/CD pipelines:
```yaml
# Example GitHub Actions
- name: Run tests
  run: |
    cd backend
    npm test
```

## Notes

- Current tests are examples and require proper database setup
- Add integration tests for Shopify API calls
- Consider E2E tests for critical user flows
- Mock external API calls in unit tests
