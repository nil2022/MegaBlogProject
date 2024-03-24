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
        return this.login({ email, password });
      } else {
        console.log("Account creation failed!");
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service :: createAccount :: error: ", error);
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
      // console.log("Current User: ", fetchCurrentLoggedInUser);
      return fetchCurrentLoggedInUser;
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error: ", error);
      throw error;
    }

    // return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      console.log("Logout Successfully");
    } catch (error) {
      console.log("Appwrite service :: logout :: error: ", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
