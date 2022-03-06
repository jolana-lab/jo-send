# Contributing to Jo Send

We would love for you to contribute to Jo Send and help make it even better than it is today!

## Submitting a Pull Request (PR)

### Before you submit your Pull Request (PR)

1. Fork `jolana-lab/jo-send` repo.

2. In your forked repository, make your changes in a new git branch:

   ```command
   git checkout -b my-fix-branch main
   ```

   > `my-fix-branch` can be replaced by what you want.

3. Write your codes, including **appropriate test cases**.

4. Follow our [Coding Rules](#coding-rules).

5. Run the full test suite, as described in the [developer documentation](./docs/DEVELOPER.md), and ensure that all tests pass.

6. Commit your changes using a descriptive commit message that follows our [commit message conventions](#commit-message-format). Adherence to these conventions is necessary because release notes are automatically generated from these messages.

   ```command
   git commit --all
   ```

7. Push your branch to GitHub

```command
git push origin my-fix-branch
```

8. Send a pull request to `jo-send:main`.

### Reviewing a Pull Request

If we ask for changes via code reviews then:

1. Make the required updates to the code.
2. Re-run all the test suites to ensure tests are still passing.
3. Create a fixup commit and push to your GitHub repository (this will update your Pull Request):

   ```command
   git commit --all --fixup HEAD
   git push
   ```

#### Updating the commit message

A reviewer might often suggest changes to a commit message to
fit our [commit message conventions](#commit-message-format). In order to update the commit message of the **last commit** on your branch:

1. Check out your branch:

   ```command
   git checkout my-fix-branch
   ```

2. Amend the last commit and modify the commit message:

   ```command
   git commit --amend
   ```

3. Push to your GitHub repository:

   ```command
   git push --force-with-lease
   ```

### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes from the main (upstream) repository:

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

  ```command
  git push origin --delete my-fix-branch
  ```

- Check out the main branch:

  ```command
  git checkout main -f
  ```

- Delete the local branch:

  ```command
  git branch -D my-fix-branch
  ```

- Update your main with the latest upstream version:

  ```command
  git pull --ff upstream master
  ```

## Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes must be tested by one or more specs (unit-tests).

- All public API methods must be documented.

- We follow [Google's JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html). An automated formatter is available, see [developer documentation](./docs/DEVELOPER.md).

## Commit Message Format

We have very precise rules over how our Git commit messages must be formatted. This format leads to easier to read commit history.

### Commit Message Header

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: animations|bazel|benchpress|common|compiler|compiler-cli|core|
  │                          elements|forms|http|language-service|localize|platform-browser|
  │                          platform-browser-dynamic|platform-server|router|service-worker|
  │                          upgrade|zone.js|packaging|changelog|docs-infra|migrations|ngcc|ve|
  │                          devtools
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

The `<type>` and `<summary>` fields are mandatory, the `(<scope>)` field is optional.

- **IMPORTANT**: If you find your commit doesn't fit any type, DO NOT add `<type>` at the head of the commit message.
- **IMPORTANT**: There msut be at least one commit with `<type>` in a Pull Request. Otherwise, the Pull request won't be merged.

#### Type

Must be one of the following:

- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (examples: Github Action)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- test: Adding missing tests or correcting existing tests

## References

- [Generate a changelog from git commits](https://www.npmjs.com/package/generate-changelog)
- [Angular Contributing](https://github.com/angular/angular/blob/master/CONTRIBUTING.md)
