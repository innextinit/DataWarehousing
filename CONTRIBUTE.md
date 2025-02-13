# How to Contribute

Thank you for your interest in contributing to this project! Whether you're new to Git and GitHub or an experienced developer, the steps below will guide you through the process.

## Prerequisites

- **Git Installed:** Make sure you have [Git installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) on your computer.
- **GitHub Account:** You'll need a GitHub account. If you don't have one, [sign up here](https://github.com/join).

## Step-by-Step Guide

1. **Fork the Repository**

   - Navigate to the [project repository](https://github.com/innextinit/DataWarehousing) on GitHub.
   - Click the **Fork** button (usually in the top-right corner) to create your own copy of the repository under your GitHub account.

2. **Clone Your Fork Locally**

   - Copy the URL of your forked repository (it will look similar to `https://github.com/your-username/DataWarehousing.git`).
   - Open your terminal (or Git Bash on Windows) and run:
     ```bash
     git clone https://github.com/your-username/DataWarehousing.git
     ```
     This command downloads your forked repository to your local machine.

3. **Navigate to the Project Directory**

   - Run:
     ```bash
     cd DataWarehousing
     ```

4. **Set Up the Upstream Remote (Optional but Recommended)**

   - This step helps you keep your fork updated with the original repository.
   - Run:
     ```bash
     git remote add upstream https://github.com/innextinit/DataWarehousing.git
     ```
   - To fetch the latest changes from the original repository, run:
     ```bash
     git fetch upstream
     ```

5. **Create a New Branch**

   - Always create a new branch for your changes to keep your work separate from the main codebase.
   - Run:
     ```bash
     git checkout -b your-feature-branch
     ```
     Replace `your-feature-branch` with a descriptive name for your changes (e.g., `fix-typo-readme` or `add-new-feature`).

6. **Make Your Changes**

   - Open the project in your preferred code editor and make your changes.
   - **Tip for Beginners:** Save your work often and use meaningful commit messages to describe your changes.

7. **Stage Your Changes**

   - Add the files you've changed to the staging area:
     ```bash
     git add .
     ```
   - Or stage specific files:
     ```bash
     git add path/to/your-file
     ```

8. **Commit Your Changes**

   - Commit your changes with a clear and concise message:
     ```bash
     git commit -m "A brief description of your changes"
     ```
   - **Tip:** Use [Conventional Commit Messages](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13) to keep commit history clean.

9. **Push Your Changes to GitHub**

   - Push your branch to your forked repository:
     ```bash
     git push origin your-feature-branch
     ```

10. **Open a Pull Request (PR)**

    - Go to your forked repository on GitHub.
    - Click the **Compare & pull request** button next to your recently pushed branch.
    - Fill out the PR form:
      - **Title:** Summarize your changes.
      - **Description:** Provide a detailed explanation of what you've changed and why.
    - Submit the pull request.

11. **Participate in the Review Process**

    - Your pull request will be reviewed by the project maintainers.
    - They might leave comments or request changes. Please address any feedback by making additional commits to your branch.

12. **Merging Your Changes**
    - Once your pull request is approved, a project maintainer will merge your changes into the main repository.

## Additional Resources

- [GitHub Docs: Forking a Repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
- [Git Branching Basics](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
- [Creating a Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-issues-and-pull-requests/about-pull-requests)

We truly appreciate your contributions and effort to help improve this project. Happy coding!
