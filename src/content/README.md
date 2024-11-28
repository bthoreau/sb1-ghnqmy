# Content Directory Structure

```
content/
├── guides/           # Markdown files for tax guides and articles
│   ├── crypto-tax-101.md
│   ├── tax-loss-harvesting.md
│   └── ...
├── courses/         # E-learning course content
│   ├── crypto-tax-fundamentals/
│   │   ├── index.json         # Course metadata
│   │   ├── module1/          # Module content
│   │   │   ├── intro.mp4
│   │   │   ├── basics.pdf
│   │   │   └── quiz.json
│   │   └── ...
│   └── ...
└── assets/          # Shared media assets
    ├── images/
    ├── videos/
    └── documents/
```

## Content Guidelines

### Guides
- Use Markdown format
- Include frontmatter with metadata
- Place images in `/assets/images`
- Reference assets using relative paths

### Courses
- Create index.json for course metadata
- Organize content by modules
- Support multiple content types:
  - Videos (.mp4)
  - Presentations (.pdf)
  - Documents (.pdf)
  - Quizzes (.json)
  - Assignments (.md)

### Assets
- Use descriptive filenames
- Optimize images and videos
- Maintain consistent naming convention