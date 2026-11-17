// Public, non-secret settings. Fall back to local development addresses.
export const siteUrl = (process.env.SITE_URL || 'http://localhost:3102').replace(/\/$/, '')
export const adminUrl = (process.env.ADMIN_APP_URL || 'http://localhost:3100').replace(/\/$/, '')
// Organizers register and sign in on the admin app, where they manage their leagues.
export const loginUrl = `${adminUrl}/login`
export const signupUrl = `${adminUrl}/register`
