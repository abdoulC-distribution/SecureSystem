### Roles

- USER: standard authenticated user
- ADMIN: privileged user with full access

### Access rules

- Any authenticated user can access their own profile
- Only ADMIN users can access admin resources
- Unauthorized access attempts must be blocked and logged

### Security choices

Passwords are stored using bcrypt hashing to prevent password disclosure in case of database compromise.

Authentication is handled using signed JWT tokens transmitted via HTTP-only cookies.

Access control is enforced through centralized middleware that verifies authentication and role permissions before request processing.

Sensitive configuration values are stored as environment variables and are not committed to version control.

The system applies basic operating system security principles such as restricted file permissions and process isolation using Docker.

Unauthorized access attempts are logged to enable auditing and detection of abnormal behavior.
