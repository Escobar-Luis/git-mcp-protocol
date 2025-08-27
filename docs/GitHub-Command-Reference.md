# GitHub Command Reference - Complete Git Mastery for MCP Development

**Context**: Learning Git commands through MCP server implementation
**Goal**: Master 20+ Git commands with real-world development scenarios

---

## **Quick Reference by Skill Level**

### 🟢 **BASIC COMMANDS** (Reps 1-3)
Essential daily workflow commands you'll use constantly.

### 🟡 **INTERMEDIATE COMMANDS** (Reps 4-7) 
Branching, history management, and collaboration commands.

### 🔴 **ADVANCED COMMANDS** (Reps 8-10)
Debugging, patch management, and expert workflow commands.

---

## 🟢 **BASIC COMMANDS**

### **`git status`** - Your Best Friend
**What it does**: Shows current working directory state
**When to use**: Before every other command - always know where you are
**MCP Scenario**: Check if new MCP tools are staged before committing

```bash
git status
# On branch master
# Changes not staged for commit:
#   modified:   src/mcp-server.js
# Untracked files:
#   docs/new-tool-spec.md
```

### **`git add`** - Stage Changes
**What it does**: Stages files for commit (adds to index)
**Variations**:
- `git add .` - Add all changes in current directory
- `git add src/` - Add all files in src directory
- `git add -A` - Add all changes including deletions
- `git add -p` - Interactively add parts of files

**MCP Scenario**: Stage only related MCP server changes together

```bash
git add src/mcp-server.js        # Add single file
git add src/ docs/               # Add multiple directories  
git add -p src/mcp-server.js     # Interactively choose changes
```

### **`git commit`** - Save Changes
**What it does**: Creates a permanent snapshot with message
**Best Practices**: Clear, descriptive messages explaining why, not what
**MCP Scenario**: Commit each MCP tool implementation separately

```bash
git commit -m "Add git-status tool to MCP server"
git commit -m "Fix error handling in git-branch tool"
git commit --amend -m "Updated commit message"  # Fix last commit message
```

### **`git push`** - Upload to Remote
**What it does**: Sends commits to GitHub repository
**Variations**:
- `git push` - Push current branch to default remote
- `git push origin master` - Push master branch to origin remote
- `git push -u origin feature-branch` - Set upstream tracking

**MCP Scenario**: Push each completed MCP tool implementation

```bash
git push                    # Push current branch
git push origin master      # Explicit branch push
git push -u origin new-tool # Push and set upstream
```

### **`git pull`** - Download from Remote
**What it does**: Fetches and merges changes from remote repository
**When to use**: Before starting work, to get latest changes
**Alternative**: `git fetch` + `git merge` (more controlled)

```bash
git pull                    # Pull current branch
git pull origin master     # Pull specific branch
git pull --rebase          # Pull with rebase instead of merge
```

### **`git diff`** - See Changes
**What it does**: Shows differences between versions
**Variations**:
- `git diff` - Working directory vs staged
- `git diff --staged` - Staged vs last commit
- `git diff HEAD~1` - Current vs previous commit

**MCP Scenario**: Review MCP server changes before committing

```bash
git diff                           # See unstaged changes
git diff --staged                  # See staged changes
git diff HEAD~1 src/mcp-server.js # Compare with previous version
```

---

## 🟡 **INTERMEDIATE COMMANDS**

### **`git branch`** - Branch Management
**What it does**: List, create, or delete branches
**Why important**: Parallel development of MCP features
**MCP Scenario**: Create feature branches for each new MCP tool

```bash
git branch                    # List all branches
git branch new-tool          # Create new branch
git branch -d completed-tool # Delete merged branch
git branch -D force-delete   # Force delete unmerged branch
```

### **`git checkout`** - Switch Context
**What it does**: Switch branches or restore files
**Modern alternative**: `git switch` and `git restore`
**MCP Scenario**: Switch between different MCP tool implementations

```bash
git checkout master              # Switch to master branch
git checkout -b git-log-tool     # Create and switch to new branch
git checkout -- src/file.js     # Discard changes to file
git checkout HEAD~1 -- file.js  # Restore file from previous commit
```

### **`git merge`** - Combine Branches
**What it does**: Integrates changes from one branch into another
**Types**: Fast-forward (linear) vs merge commit (creates merge node)
**MCP Scenario**: Merge completed MCP tool into main branch

```bash
git checkout master          # Switch to target branch
git merge git-status-tool    # Merge feature branch
git merge --no-ff feature    # Force merge commit
git merge --squash feature   # Combine all commits into one
```

### **`git rebase`** - Rewrite History
**What it does**: Re-applies commits on top of another branch
**Why use**: Clean, linear commit history
**MCP Scenario**: Clean up messy MCP development history before merging

```bash
git rebase master               # Rebase current branch onto master
git rebase -i HEAD~3           # Interactive rebase last 3 commits
git rebase --continue          # Continue after resolving conflicts
git rebase --abort             # Cancel rebase and return to original state
```

**Interactive Rebase Options:**
- `pick` - Keep commit as-is
- `reword` - Change commit message
- `edit` - Modify commit content
- `squash` - Combine with previous commit
- `drop` - Remove commit entirely

### **`git cherry-pick`** - Selective Commit Application
**What it does**: Apply specific commits from other branches
**When to use**: Want specific changes without full merge
**MCP Scenario**: Apply bug fix from one MCP tool to another branch

```bash
git cherry-pick abc1234        # Apply specific commit
git cherry-pick branch-name    # Apply latest commit from branch
git cherry-pick abc1234 def5678 # Apply multiple commits
git cherry-pick --no-commit abc1234 # Apply but don't commit
```

### **`git reflog`** - Reference Log (Lifesaver!)
**What it does**: Shows history of all HEAD movements
**Why crucial**: Recover "lost" commits, undo mistakes
**MCP Scenario**: Recover accidentally deleted MCP tool implementation

```bash
git reflog                     # Show all HEAD movements
git reflog --oneline          # Compact format
git checkout HEAD@{2}         # Go back to specific reflog entry
git reset --hard HEAD@{1}     # Reset to previous state
```

### **`git reset`** - Undo Operations
**What it does**: Move branch pointer and optionally modify working directory
**Three modes**:
- `--soft` - Move branch pointer only (commits become staged)
- `--mixed` (default) - Move pointer + unstage files
- `--hard` - Move pointer + unstage + discard working changes

**MCP Scenario**: Undo last MCP server commit but keep changes for editing

```bash
git reset --soft HEAD~1       # Undo commit, keep changes staged
git reset --mixed HEAD~1      # Undo commit, unstage changes
git reset --hard HEAD~1       # Undo commit, discard all changes
git reset abc1234             # Reset to specific commit
```

---

## 🔴 **ADVANCED COMMANDS**

### **`git bisect`** - Binary Search for Bugs
**What it does**: Uses binary search to find the commit that introduced a bug
**Process**: Mark good/bad commits, Git finds the problematic one
**MCP Scenario**: Find which commit broke MCP server functionality

```bash
git bisect start              # Start bisect session
git bisect bad               # Current commit is bad
git bisect good v1.0         # Known good commit
# Git checks out middle commit, test it
git bisect good              # If test passes
git bisect bad               # If test fails
# Repeat until Git finds the problematic commit
git bisect reset             # End bisect session
```

### **`git log -p`** - Show Patches
**What it does**: Shows commit history with full diffs
**When to use**: Understanding how code changed over time
**MCP Scenario**: See how MCP tool implementations evolved

```bash
git log -p                   # Show all commits with diffs
git log -p -2               # Show last 2 commits with diffs
git log -p src/mcp-server.js # Show changes for specific file
git log -p --grep="MCP"     # Show commits matching pattern with diffs
```

### **`git log -S`** - Search Code History
**What it does**: Finds commits that added or removed specific text
**Why powerful**: Track when specific code was introduced/removed
**MCP Scenario**: Find when specific MCP tool was added or modified

```bash
git log -S "git-status"      # Find commits that added/removed "git-status"
git log -S "registerTool"    # Track registerTool function changes
git log -G "async.*git"      # Regex search for async git patterns
git log --pickaxe-all -S "MCP" # Show full commits, not just matching files
```

### **`git format-patch`** - Create Patch Files
**What it does**: Generates patch files from commits
**When to use**: Share commits without pushing, email patches
**MCP Scenario**: Share MCP tool implementation with collaborators

```bash
git format-patch HEAD~3      # Create patches for last 3 commits
git format-patch master      # Create patches for all commits ahead of master
git format-patch -o patches/ HEAD~2 # Output to patches directory
git format-patch --stdout HEAD~1 > my.patch # Single patch file
```

### **`git apply --check`** - Validate Patches
**What it does**: Check if patch can be applied without actually applying
**Why important**: Avoid partial/failed patch applications
**MCP Scenario**: Validate MCP tool patches before applying

```bash
git apply --check patch.diff    # Check if patch applies cleanly
git apply --check --3way patch.diff # Try 3-way merge if needed
git apply --stat patch.diff     # Show stats about patch
git apply --summary patch.diff  # Show summary of changes
```

### **`git am`** - Apply Mailed Patches
**What it does**: Applies patches created with format-patch
**Features**: Preserves commit messages, authorship, dates
**MCP Scenario**: Apply MCP tool patches from other developers

```bash
git am patch.eml             # Apply emailed patch
git am *.patch              # Apply all patch files
git am --3way patch.eml     # Use 3-way merge for conflicts
git am --skip               # Skip current patch and continue
git am --abort              # Abort patch application
```

---

## **Real-World MCP Development Workflows**

### **Workflow 1: New MCP Tool Development**
```bash
git checkout master
git pull                           # Get latest changes
git checkout -b git-commit-tool    # Create feature branch
# ... implement MCP tool ...
git add src/mcp-server.js
git commit -m "Add git-commit tool with validation"
git checkout master
git merge --no-ff git-commit-tool  # Merge with merge commit
git branch -d git-commit-tool      # Clean up feature branch
git push origin master
```

### **Workflow 2: Fix History Before Merging**
```bash
git checkout feature-branch
git rebase -i master              # Clean up commits
# ... squash/reword commits as needed ...
git checkout master
git merge feature-branch          # Now clean merge
```

### **Workflow 3: Emergency Bug Fix**
```bash
git checkout master
git checkout -b hotfix-auth-bug
# ... fix critical MCP authentication bug ...
git commit -m "Fix MCP authentication token validation"
git checkout master
git merge hotfix-auth-bug
git tag v1.0.1                    # Tag the fix
git push origin master --tags
```

### **Workflow 4: Recover Lost Work**
```bash
git reflog                        # Find lost commit
git checkout HEAD@{5}            # Go to lost commit
git checkout -b recovered-work    # Create branch to save work
git checkout master
git merge recovered-work          # Merge recovered work
```

---

## **Command Combinations for MCP Development**

### **Daily Development Flow**
```bash
git status && git pull && git status  # Check state, update, check again
```

### **Commit Review Before Push**
```bash
git log --oneline -5 && git diff HEAD~1  # Review recent commits and changes
```

### **Branch Cleanup**
```bash
git branch --merged | grep -v master | xargs -n 1 git branch -d  # Delete merged branches
```

### **Find Related Changes**
```bash
git log --oneline --grep="MCP" --since="1 week ago"  # Recent MCP-related commits
```

---

## **Pro Tips for MCP Development**

1. **Always `git status` first** - Know your current state
2. **Commit early, commit often** - Small, logical commits are better
3. **Use descriptive commit messages** - Explain why, not just what
4. **Create branches for features** - Keep master stable
5. **Use `git reflog` for recovery** - It's your safety net
6. **Test before you commit** - Ensure MCP tools work correctly
7. **Use `git bisect` for debugging** - Fastest way to find problematic commits
8. **Keep history clean with rebase** - Makes code reviews easier

**Remember**: Git is about managing change over time. Master these commands through repetition while building your MCP server!