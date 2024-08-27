import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';
export const appriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.vien.aora",
  projectId: "66c6d58b000a429e2807",
  databaseId: "66c6d74d001a5c98f78b",
  userCollectionId: "66c6d78a0001a66405d8",
  videoCollectionId: "66c6d7d2000ec1f31bc2",
  storageId: "66c6dabf00038dbce0cd",
}
const { endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId } = appriteConfig

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setPlatform(platform) // Your application ID or bundle ID.
  ;


const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  // Register User
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )
    if (!newAccount) throw Error;
    const avatarUrl = avatar.getInitials(username);
    await signIn(email, password);
    const newUser = await database.createDocument(databaseId, userCollectionId, ID.unique(), {
      accountId: newAccount.$id,
      email,
      username,
      avatar: avatarUrl,
    })

    return newUser
  } catch (error) {
    console.log("Error while create a new user", error);
    throw new Error(error);
  }
}

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAcount = await account.get();
    if (!currentAcount) throw Error;
    const currenUser = await database.listDocuments(databaseId, userCollectionId, [Query.equal("accountId", currentAcount.$id)]);
    if (!currenUser) throw Error;
    return currenUser.documents[0];
  } catch (error) {
    throw new Error(error);
  }
}


export const getAllPosts = async () => {
  try {

    const posts = await database.listDocuments(databaseId, videoCollectionId);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}


export const getLatestPosts = async () => {
  try {

    const posts = await database.listDocuments(databaseId, videoCollectionId, [Query.orderDesc("$createdAt", Query.limit(7))]);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const searchPosts = async (queryParams) => {
  try {
    const posts = await database.listDocuments(databaseId, videoCollectionId, [Query.search('title', queryParams)])
    return posts.documents;
  } catch (error) {
    throw new Error(error)
  }
}

export const getUserPosts = async (userId) => {
  try {
    const posts = await database.listDocuments(databaseId, videoCollectionId, [Query.equal("creator", userId), Query.orderDesc("$createdAt")])
    return posts.documents
  } catch (error) {
    throw new Error(error)
  }
}

export const signOut = async () => {
  try {
    const section = await account.deleteSession("current");
    return section
  } catch (error) {
    throw new Error(error)
  }
}

export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    if (type === "video") {
      fileUrl = storage.getFilePreview(storageId, fileId);

    } else if (type === 'image') {
      fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, "top", 100);

    } else {
      throw new Error("Invalid file type")
    }

    if (!fileUrl) throw Error;
    return fileUrl;

  } catch (error) {
    throw new Error(error);
  }
}

export const uploadFile = async (file, type) => {
  if (!file) return;
  const assets = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };
  try {
    const uploadFile = await storage.createFile(storageId, ID.unique(), assets);

    const fileUrl = await getFilePreview(uploadFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all(
      [uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video")]
    )

    const newPost = await database.createDocument(databaseId, videoCollectionId, ID.unique(), {
      title: form.title,
      thumbnail: thumbnailUrl,
      video: videoUrl,
      prompt: form.prompt,
      creator: form.userId
    })
    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}