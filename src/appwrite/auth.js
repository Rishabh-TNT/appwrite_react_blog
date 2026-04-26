import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });
      return await this.login({ email, password });
    } catch (error) {
      throw new Error("Appwrite.createAccount:: ", { cause: error });
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({
        email,
        password,
      });
    } catch (error) {
      throw new Error("Appwrite.login:: ", { cause: error });
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw new Error("Appwrite.getCurrentUser:: ", { cause: error });
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw new Error("AuthService.logout:: ", { cause: error });
    }
  }
}

const auth = new AuthService();

export default auth;
