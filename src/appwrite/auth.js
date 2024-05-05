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

  // ! Check code below for appwrite 'createVerification' method NOT WORKING !!
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
