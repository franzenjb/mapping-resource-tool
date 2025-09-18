# Development Documentation

## Project Overview

The Mapping Resource Tool is a Next.js application designed to provide easy access to ArcGIS and Red Cross mapping resources for disaster response and planning.

## Current State (v1.0.0)

### ✅ Completed Features
- Basic authentication system (password-based)
- CSV-based resource database (60+ resources)
- Search and filtering functionality
- Interactive ArcGIS map integration
- Layer management (add/remove)
- Responsive UI design
- Vercel deployment

### 🔧 Known Issues
- OAuth authentication needs production redirect URI configuration
- Some feature layers may require additional authentication
- Map export functionality needs testing with complex layers

## Development Roadmap

### Phase 1: Core Improvements (Next Sprint)
- [ ] Implement user preferences storage (localStorage)
- [ ] Add layer opacity controls
- [ ] Implement layer reordering
- [ ] Add basemap switcher
- [ ] Improve error handling for failed layer loads

### Phase 2: Enhanced Features
- [ ] User accounts with saved configurations
- [ ] Layer bookmarking/favorites
- [ ] Share map configurations via URL
- [ ] Print map functionality
- [ ] Layer legend component

### Phase 3: Advanced Integration
- [ ] Real-time data updates via WebSockets
- [ ] Integration with Red Cross CAS
- [ ] Custom layer upload (KML, GeoJSON)
- [ ] Collaborative features (shared maps)
- [ ] Mobile app (React Native)

## Technical Debt

1. **TypeScript**: Remove all `any` types and improve type safety
2. **Testing**: Add unit tests for search functions and integration tests
3. **Performance**: Implement virtual scrolling for large result sets
4. **Accessibility**: Add ARIA labels and keyboard navigation
5. **SEO**: Improve metadata and implement sitemap

## API Keys and Services

### Current Services
- **ArcGIS Client ID**: `KkhuTGzSvjtjGrVc` (development)
- **Vercel Deployment**: https://mapping-resource-tool.vercel.app
- **GitHub Repo**: https://github.com/franzenjb/mapping-resource-tool

### Required for Production
- [ ] Production ArcGIS Client ID
- [ ] Custom domain setup
- [ ] SSL certificate
- [ ] Analytics integration (Google Analytics or similar)
- [ ] Error tracking (Sentry or similar)

## Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Environment Variables
```env
NEXT_PUBLIC_AUTH_MODE=simple          # or 'oauth' for production
NEXT_PUBLIC_ARCGIS_CLIENT_ID=xxx     # Your ArcGIS client ID
NEXT_PUBLIC_AUTH_PASSWORD=xxx        # Simple auth password
```

### Common Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Run linting
npm run lint

# Deploy to Vercel
npx vercel --prod
```

## Architecture Decisions

### Why Next.js App Router?
- Server components for better performance
- Built-in routing and API routes
- Excellent TypeScript support
- Easy deployment with Vercel

### Why CSV for Data?
- Simple to update without database
- Version controlled with Git
- Easy for non-technical users to edit
- No backend required

### Why ArcGIS JavaScript API?
- Industry standard for GIS applications
- Rich feature set
- Good documentation
- Red Cross standard

## Contributing Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing component patterns
- Keep components small and focused
- Use Tailwind classes for styling

### Git Workflow
1. Create feature branch from main
2. Make changes and test locally
3. Commit with descriptive messages
4. Push and create PR
5. Review and merge

### Testing Checklist
- [ ] Works in Chrome, Firefox, Safari
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Authentication flow works
- [ ] Search returns expected results
- [ ] Layers load on map

## Troubleshooting

### Common Issues

**ESLint errors during build**
- Solution: Run with `npm run build --no-lint` or fix linting issues

**ArcGIS layers not loading**
- Check CORS settings
- Verify layer URL is accessible
- Check for authentication requirements

**Authentication redirect issues**
- Ensure redirect URI matches in ArcGIS app settings
- Check environment variables are set correctly

**Vercel deployment fails**
- Check build logs for specific errors
- Ensure all environment variables are set in Vercel
- Verify package.json scripts are correct

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [ArcGIS JavaScript API](https://developers.arcgis.com/javascript/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

## Contacts

- **Project Lead**: Jeff Franzen (jeff.franzen2@redcross.org)
- **GitHub Issues**: https://github.com/franzenjb/mapping-resource-tool/issues

---

Last Updated: September 2025