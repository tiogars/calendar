# GitHub Pages Deployment Guide

## Configuration for GitHub Pages

This repository is configured to automatically deploy to GitHub Pages on every
push to `main`.

### Prerequisites

1. **Repository Settings**: Enable GitHub Pages
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Select branch: `gh-pages`
   - Select folder: `/ (root)`

2. **Repository Access**: Ensure GitHub Actions has permission to:
   - Write to the repository (for version bumps)
   - Write to GitHub Pages (for deployment)
   - Create releases (for GitHub Releases)

### Workflow Overview

The CI/CD pipeline consists of three main jobs:

#### 1. Build & Lint (`build`)

- Installs dependencies with pnpm
- Lints Markdown files according to project standards
- Lints TypeScript code with ESLint
- Builds the site with Vite
- Builds documentation with `ghcr.io/tiogars/mkdocs-docker-image` into `dist/docs/`
- Automatically bumps version (semantic versioning)
- Commits and pushes version changes

#### 2. Deploy (`deploy`)

- Downloads the built application (including `docs/` subfolder)
- Configures GitHub Pages
- Deploys to GitHub Pages (application at root, documentation at `/docs/`)
- Returns the deployment URL

#### 3. Release (`release`)

- Creates a GitHub Release with version tag
- Archives the built site as a ZIP file
- Attaches the archive to the release
- Generates release notes

### Version Management

**Versioning Strategy**: Semantic Versioning (MAJOR.MINOR.PATCH)

- **VERSION file**: `./VERSION` - Contains the current version
- **package.json**: Automatically updated with the same version
- **Automatic bumping**: PATCH version increments on each commit

To manually adjust versioning:

1. Edit the `VERSION` file directly
2. Update `package.json` version field
3. Commit both files to `main`
4. The next build will use the new version

### GitHub Actions Permissions

The workflow requires the following permissions:

- `contents: write` - To commit version bumps and push tags
- `pages: write` - To deploy to GitHub Pages
- `id-token: write` - For secure OIDC token authentication

### Customization

#### Base Path for GitHub Pages

If deploying to a project repository
(e.g., `https://username.github.io/calendar/`):

Update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/calendar/',
  // ... other config
})
```

If deploying to a user/organization site
(`https://username.github.io/`), base is already `/`.

#### Environment Variables

The workflow uses:

- `PNPM_VERSION: 9.x` - Specify pnpm version

Modify in `.github/workflows/build-deploy-release.yml` if needed.

#### Node.js Version

Currently using Node.js 20. Update in the workflow if a different version is
required.

### Troubleshooting

**Issue**: Pages are not deploying

- **Solution**: Check repository Settings → Pages and ensure it's enabled with
  branch `gh-pages`

**Issue**: Version bumps are not committing

- **Solution**: Verify `GITHUB_TOKEN` permissions in Settings → Actions →
  General → Workflow permissions

**Issue**: Release creation is failing

- **Solution**: Ensure the branch protection rules allow GitHub Actions to
  create releases

**Issue**: Markdown linting fails

- **Solution**: Run locally:
  `pnpm dlx markdownlint-cli2 "README.md" "docs/**/*.md" ".github/**/*.md"`

### Manual Trigger

You can manually trigger the workflow:

1. Go to Actions tab in GitHub
2. Select "Build, Deploy & Release" workflow
3. Click "Run workflow"
4. Select branch: `main`

This is useful for testing or deploying without making a new commit.

### Artifacts

After each successful build:

- **Pages**: Deployed to GitHub Pages (accessible at your site URL)
- **Release Archive**: Available in GitHub Releases as `calendar-X.Y.Z.zip`
- **Build logs**: Available in the Actions tab for debugging

### Security Considerations

- The workflow uses GitHub's official actions (regularly updated and audited)
- OIDC token authentication is used for GitHub Pages deployment
- Version commits are made with the `github-actions[bot]` account
- The workflow cannot modify your main branch protections or settings
