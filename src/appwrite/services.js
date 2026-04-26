import { Client, ID, Query, Storage, TablesDB } from "appwrite";
import conf from "../conf/conf";

class Service {
  client = new Client();
  tablesDB;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, content, slug, status, userid, featuredImage }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
        data: {
          title,
          content,
          status,
          userid,
          featuredImage,
        },
      });
    } catch (error) {
      console.log("Appwrite Services:: createPost:: Error:: ", error);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.tablesDB.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
      });
    } catch (error) {
      console.log("Appwrite Services:: getPost:: Error:: ", Error);
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return this.tablesDB.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        queries,
      });
    } catch (error) {
      console.log("Appwrite Services:: getPosts:: Error:: ", Error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, status, featuredImage }) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
        data: {
          title,
          content,
          status,
          featuredImage,
        },
      });
    } catch (error) {
      console.log("Appwrite Services:: updatePost:: Error:: ", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
      });
    } catch (error) {
      console.log("Appwrite Services:: deletePost:: Error:: ", error);
      throw error;
    }
  }

  // File upload services
  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.log("Appwrite Servicess:: uploadFile:: Error:: ", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId,
      });
    } catch (error) {
      console.log("Appwrite Services:: deleteFile:: error:: ", error);
    }
  }

  viewFile(fileId) {
    try {
      return this.storage.getFileView({
        bucketId: conf.appwriteBucketId,
        fileId,
      });
    } catch (error) {
      console.log("Appwrite Services:: viewFile:: error:: ", error);
      throw error;
    }
  }
}

const service = new Service();

export default service;
