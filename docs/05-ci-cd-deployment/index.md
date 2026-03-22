# CI/CD Deployment Pipeline

## Overview

This project uses GitHub Actions to automatically build, test, deploy to GitHub
Pages, and create releases on every commit to the `main` branch.

## Workflow Jobs

### 1. Build & Lint

Runs initial checks and builds the application:

1. Checks out code with full history
2. Sets up pnpm 9.x and Node.js 20 with dependency caching
3. Installs dependencies with `pnpm install --frozen-lockfile`
4. Runs markdown linting: `pnpm dlx markdownlint-cli2`
5. Runs code linting: `pnpm lint`
6. Builds site: `pnpm build`
7. Builds documentation with [`ghcr.io/tiogars/mkdocs-docker-image`](https://github.com/tiogars/mkdocs-docker-image)
   into `site_output/`, then copies it to `dist/docs/`
8. Automatically bumps PATCH version
9. Commits and pushes version changes to `main`

**Outputs**:

- `version`: Semantic version string (e.g., `0.1.2`)
- `version-tag`: Git tag (e.g., `v0.1.2`)

### 2. Deploy

Deploys built site to GitHub Pages:

1. Downloads build artifacts
2. Configures GitHub Pages settings
3. Uploads artifacts to Pages
4. Deploys using `actions/deploy-pages@v4`

**Environment**: GitHub Pages with OIDC token authentication

**Deployment URL**: Available as `steps.deployment.outputs.page_url`

### 3. Release

Creates GitHub Release with versioned archive:

1. Downloads build artifacts
2. Creates ZIP archive of built site
3. Creates GitHub Release with tag `vX.Y.Z`
4. Uploads ZIP file as release asset
5. Generates automated release notes

**Release Contains**:

- Version tag `vX.Y.Z`
- Automated changelog
- `calendar-X.Y.Z.zip` archive

## Version Management

### Semantic Versioning

The project uses semantic versioning: `MAJOR.MINOR.PATCH`

**Strategy**:

- Each commit to `main` automatically increments PATCH version
- Manual version bumps can be made by editing the `VERSION` file
- `package.json` is automatically kept in sync

**Version File**: `./VERSION` (root of repository)

### How Versioning Works

1. Workflow reads current version from `VERSION` file
2. Increments PATCH component (e.g., `0.0.0` → `0.0.1`)
3. Updates both `VERSION` and `package.json`
4. Commits changes with automated message: `chore: bump version to X.Y.Z`
5. Pushes commits to `main` (will trigger another workflow run)

### Manual Version Control

To bump MAJOR or MINOR version:

1. Edit `VERSION` file directly:

   ```text
   0.1.0  # was 0.0.20
   ```

2. Update `package.json`:

   ```json
   {
     "version": "0.1.0"
   }
   ```

3. Commit: `git commit -am "chore: bump to 0.1.0"`
4. Push: `git push origin main`

Next automated build will increment PATCH: `0.1.1`

## GitHub Pages Configuration

### Prerequisites

1. **Enable GitHub Pages**:
   - Repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages`
   - Folder: `/ (root)`

2. **Set Base Path** (if needed):

   For project site (e.g., `https://username.github.io/calendar/`):

   Update `vite.config.ts`:

   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     base: '/calendar/',
     plugins: [react()],
   })
   ```

   For user/org site (e.g., `https://username.github.io/`):

   ```typescript
   export default defineConfig({
     base: '/',
     plugins: [react()],
   })
   ```

### Deployment

- Automatically deploys on every push to `main`
- Application deployed to the GitHub Pages root URL
- Documentation deployed to the `/docs/` subfolder of the same Pages site
- Deployment URL shown in Actions workflow logs

### Documentation URL

The MkDocs documentation is accessible at `<pages-url>/docs/`
(e.g., `https://tiogars.github.io/calendar/docs/`).

It is built with the
[`ghcr.io/tiogars/mkdocs-docker-image`](https://github.com/tiogars/mkdocs-docker-image)
Docker image using the `mkdocs.yml` configuration at the root of the repository.

## GitHub Runner & Environment

- **OS**: Ubuntu latest (`ubuntu-latest`)
- **Node.js**: Version 20
- **pnpm**: Version 9.x
- **Cache**: Enabled for pnpm dependencies
- **Concurrency**: Maximum 1 deployment at a time

## Permissions & Security

The workflow requires GitHub Actions permissions:

- `contents: write` - Commit version bumps and create releases
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - Secure OIDC token for Pages deployment

All automated commits use `github-actions[bot]` account.

## Manual Workflow Trigger

Manually run the workflow from GitHub UI:

1. Actions tab → "Build, Deploy & Release"
2. Click "Run workflow"
3. Select branch: `main`
4. Click "Run workflow"

Useful for testing or deploying without code changes.

## Artifacts & Outputs

### Build Artifacts

- **dist/**: Primary build directory (Vite output)
- Uploaded as `dist` artifact with 1-day retention
- Downloaded by deploy and release jobs

### GitHub Pages

- Deployed to configured GitHub Pages URL
- Contains complete built site
- Accessible immediately after deployment

### GitHub Releases

- Created with semantic version tag (`vX.Y.Z`)
- Release notes auto-generated from commit history
- Includes `calendar-X.Y.Z.zip` archive
- Downloadable from GitHub Releases page

## Troubleshooting

### Workflow Fails on Lint

**Markdown linting errors**:

```bash
pnpm dlx markdownlint-cli2 "README.md" "docs/**/*.md" \
  ".github/**/*.md"
```

Fix issues locally, then commit.

**ESLint errors**:

```bash
pnpm lint --fix
```

### Pages Not Updating

1. Check repository Settings → Pages is enabled
2. Verify `gh-pages` branch exists
3. Check workflow logs in Actions tab
4. Manually trigger workflow to retry

### Version Commits Not Pushing

Verify GitHub Actions repository permissions:

- Settings → Actions → General
- Workflow permissions: "Read and write permissions"
- Allow GitHub Actions to create and approve pull requests

### Release Creation Failed

Ensure repository allows:

- GitHub Actions to write releases
- No conflicting branch protections
- Sufficient storage quota for ZIP archives

## Best Practices

1. **Always test locally** before pushing:

   ```bash
   pnpm lint
   pnpm build
   ```

2. **Keep VERSION file in sync** with package.json
3. **Review automated commits** in git history (version bumps)
4. **Monitor workflow runs** in Actions tab after each push
5. **Use release archives** for easy rollback and distribution
