const { OAuth2Client } = require('google-auth-library');

class GoogleAuthService {
  constructor() {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async verifyToken(token) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      
      const payload = ticket.getPayload();
      
      return {
        success: true,
        user: {
          googleId: payload.sub,
          email: payload.email,
          name: payload.name,
          picture: payload.picture,
          emailVerified: payload.email_verified
        }
      };
    } catch (error) {
      console.error('Google token verification failed:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new GoogleAuthService();