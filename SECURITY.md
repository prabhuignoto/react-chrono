# Security Policy

## Supported Versions

We actively support and provide security updates for the following versions of react-chrono:

| Version | Supported          |
| ------- | ------------------ |
| 3.x.x   | :white_check_mark: |
| 2.x.x   | :white_check_mark: |
| < 2.0   | :x:                |

## Reporting a Vulnerability

We take the security of react-chrono seriously. If you discover a security vulnerability, please follow these steps:

### How to Report

1. **Do NOT** open a public GitHub issue for security vulnerabilities
2. Email security details to: **prabhu.m.murthy@gmail.com** (or create a private security advisory on GitHub)
3. Include the following information:
   - Description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact and severity
   - Suggested fix (if available)
   - Your contact information

### What to Expect

- **Initial Response**: We will acknowledge receipt of your report within 48 hours
- **Assessment**: We will review and assess the vulnerability within 7 days
- **Updates**: We will provide regular updates on the status of the vulnerability
- **Resolution**: We will work to resolve critical vulnerabilities as quickly as possible
- **Disclosure**: After a fix is released, we may publish a security advisory (with your permission)

### Severity Levels

We use the following severity classification:

- **Critical**: Remote code execution, authentication bypass, or data loss
- **High**: Privilege escalation, sensitive data exposure, or significant functionality compromise
- **Medium**: Information disclosure, denial of service, or limited privilege escalation
- **Low**: Minor information leakage or best practice violations

## Security Best Practices for Users

### Dependency Management

- **Keep dependencies updated**: Regularly update react-chrono and its dependencies
  ```bash
  # Using npm
  npm audit
  npm update react-chrono
  
  # Using pnpm (recommended for this project)
  pnpm audit
  pnpm update react-chrono
  
  # Using yarn
  yarn audit
  yarn upgrade react-chrono
  ```

- **Use dependency scanning**: Enable automated security scanning in your CI/CD pipeline
  ```bash
  npm audit  # or pnpm audit, yarn audit
  # or use tools like Snyk, Dependabot, or npm audit
  ```

### Input Sanitization

React Chrono includes XSS protection via the `xss` library, but you should still:

- **Sanitize user input**: Always sanitize any user-provided content before passing it to timeline items
- **Use React's built-in protections**: React automatically escapes content in JSX, but be cautious with `dangerouslySetInnerHTML` or custom HTML rendering
- **Validate data types**: Ensure timeline items match the expected TypeScript interfaces

### Content Security Policy (CSP)

If you're using Content Security Policy headers, ensure they allow:

- **Inline styles**: React Chrono uses CSS-in-JS (Vanilla Extract) which may require `style-src 'self' 'unsafe-inline'`
- **External media**: If using external images/videos, configure `img-src` and `media-src` appropriately
- **Fonts**: If using Google Fonts integration, allow `font-src https://fonts.googleapis.com https://fonts.gstatic.com`

Example CSP header:
```
Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; media-src 'self' https:
```

### Safe Usage Patterns

```tsx
// ✅ Good: Sanitized user input
import { sanitize } from 'dompurify'; // or similar

const userContent = sanitize(userProvidedText);
const items = [{ title: userContent, cardTitle: 'Safe Title' }];

// ❌ Bad: Direct user input without sanitization
const items = [{ title: userProvidedHTML, cardTitle: 'Unsafe' }];

// ✅ Good: Type-safe props
<Chrono items={items} mode="vertical" />

// ❌ Bad: Untyped or any types
<Chrono items={unsafeItems as any} />
```

### Environment Variables

- Never commit sensitive data (API keys, tokens) to version control
- Use environment variables for configuration
- Validate environment variables at runtime

### Build Security

- Use `npm ci`, `pnpm install --frozen-lockfile`, or `yarn install --frozen-lockfile` instead of regular install commands in production builds
- Enable dependency auditing (`npm audit`, `pnpm audit`, or `yarn audit`) in your CI/CD pipeline
- Review and update dependencies regularly

## Security Features in React Chrono

### Built-in Protections

- **XSS Prevention**: Uses the `xss` library for content sanitization
- **Type Safety**: Full TypeScript support helps prevent type-related vulnerabilities
- **Input Validation**: TypeScript interfaces ensure data structure integrity
- **No Eval**: React Chrono does not use `eval()` or similar dangerous functions
- **Safe DOM Manipulation**: Uses React's virtual DOM and safe rendering patterns

### Dependency Security

We regularly audit and update dependencies:

- **Automated Scanning**: We use Snyk and npm audit to monitor dependencies
- **Regular Updates**: Dependencies are updated regularly to patch known vulnerabilities
- **Minimal Dependencies**: React Chrono has minimal runtime dependencies to reduce attack surface

## Known Security Considerations

### HTML Content

If you enable `content.allowHTML` in the content configuration, ensure:

- All HTML content is from trusted sources
- User-generated HTML is sanitized before rendering
- React Chrono automatically sanitizes HTML using the `xss` library when `allowHTML` is enabled
- For additional protection, consider pre-sanitizing with a library like DOMPurify before passing content to timeline items

**Example:**
```tsx
<Chrono
  items={items}
  content={{ allowHTML: true }}  // HTML is automatically sanitized with xss
/>
```

### Media Sources

When using external media (images, videos):

- Validate URLs before passing them to timeline items
- Use HTTPS for all external media sources
- Consider implementing Content Security Policy restrictions
- Be cautious with user-provided media URLs

### Third-Party Integrations

If integrating with third-party services (e.g., YouTube embeds):

- Review the security practices of third-party services
- Use official, supported integration methods
- Monitor for security updates from third-party providers

## Security Updates

- **Security Advisories**: Published on GitHub Security Advisories
- **Release Notes**: Security fixes are documented in release notes and GitHub releases
- **GitHub Releases**: Check [GitHub Releases](https://github.com/prabhuignoto/react-chrono/releases) for security-related updates

## Contact

For security-related questions or concerns:

- **Security Email**: prabhu.m.murthy@gmail.com
- **GitHub Security Advisories**: [Create a private security advisory](https://github.com/prabhuignoto/react-chrono/security/advisories/new)
- **General Issues**: Use [GitHub Issues](https://github.com/prabhuignoto/react-chrono/issues) for non-security bugs

## Acknowledgments

We appreciate the security research community's efforts to help keep react-chrono secure. Security researchers who responsibly disclose vulnerabilities will be credited (with permission) in security advisories.

---

**Last Updated**: 2025

**Maintainer**: [Prabhu Murthy](https://github.com/prabhuignoto)

