import urlConfig from "../config/url.config";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(urlConfig.appwriteUrl)
      .setProject(urlConfig.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        console.log("Account created Successfully");
        // return this.verifyEmail();
        return this.login({ email, password });
      } else {
        console.log("Account creation failed!");
        // return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service :: createAccount :: error: ", error);
      throw error;
    }
  }

  /** SEND VERIFICATION LINK TO USER'S EMAIL ADDRESS */
  async verifyEmail(url) {
    try {
      const verfiySuccess = await this.account.createVerification(url);
      if (verfiySuccess) {
        console.log('Email verification sent successfully');
        return verfiySuccess;
      } else {
        console.log('Email verification failed to send!');
        return
      }
    } catch (error) {
      console.log('Appwrite service :: verifyEmail :: error: ', error);
      throw error;
    }
  }

  async updateVerification() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get('userId');
      const secret = urlParams.get('secret');

      const updateVeficication = await this.account.updateVerification(userId, secret);
      if (updateVeficication) {
        console.log('Veficication updated successfully', updateVeficication);
        return updateVeficication;
      } else {
        console.log('User verification failed!');
        return
      }
    } catch (error) {
      console.log('Appwrite service :: updateVeficication :: error: ', error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const loginSession = await this.account.createEmailPasswordSession(
        email,
        password
      );
      // console.log("Login Session: ", loginSession);
      return loginSession;
    } catch (error) {
      console.log("Appwrite service :: login :: error: ", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const fetchCurrentLoggedInUser = await this.account.get();
      return fetchCurrentLoggedInUser;
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error: ", error);
      throw error;
    }

    // return null;
  }

  /** Set User Preferences data to Appwrite server */
  async setUserPreferences(userData) {
    try {
      const setUserPreferences = await this.account.updatePrefs({userData});
      return setUserPreferences;
    } catch (error) {
      console.log("Appwrite service :: setUserPreferences :: error: ", error);
      throw error;
    }
  }

  /** Get User Preferences data from Appwrite server */
  async getUserPreferences() {
    try {
      const fetchUserPreferences = await this.account.getPrefs();
      return fetchUserPreferences;
    } catch (error) {
      console.log("Appwrite service :: getUserPreferences :: error: ", error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSession('current');
      console.log("Logout Successfully");
    } catch (error) {
      console.log("Appwrite service :: logout :: error: ", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
