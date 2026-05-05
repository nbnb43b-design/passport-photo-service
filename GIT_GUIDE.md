# Git Workflow Guide

## Basic Commands

### Clone Repository
```bash
git clone https://github.com/nbnb43b-design/passport-photo-service.git
cd passport-photo-service
```

### Create New Branch
```bash
git checkout -b feature/your-feature-name
```

### Make Changes
```bash
# Edit files, then:
git add .
git commit -m "Add your feature description"
```

### Push to GitHub
```bash
git push origin feature/your-feature-name
```

### Create Pull Request
- Go to GitHub
- Click "New Pull Request"
- Select your branch
- Click "Create Pull Request"

### Merge to Main
```bash
git checkout main
git pull origin main
git merge feature/your-feature-name
git push origin main
```

---

## Useful Commands

```bash
# Check status
git status

# View commits
git log --oneline

# Undo changes
git checkout -- filename

# Delete branch
git branch -d feature/your-feature-name

# Stash changes temporarily
git stash
```

---

## Railway Auto-Deploy

Whenever you push to `main` branch, Railway automatically:
1. Pulls latest code
2. Installs dependencies
3. Starts server
4. Your app is live!

No manual deployment needed! 🚀
