/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: requestSecret
// ====================================================

export interface requestSecret_requestSecret {
  __typename: "RequestSecretResponse";
  ok: boolean;
  error: string | null;
}

export interface requestSecret {
  requestSecret: requestSecret_requestSecret;
}

export interface requestSecretVariables {
  email: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: confirmSecret
// ====================================================

export interface confirmSecret_confirmSecret {
  __typename: "ConfirmSecretResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface confirmSecret {
  confirmSecret: confirmSecret_confirmSecret;
}

export interface confirmSecretVariables {
  email: string;
  loginSecret: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createAccount
// ====================================================

export interface createAccount_createAccount {
  __typename: "CreateAccountResponse";
  ok: boolean;
  error: string | null;
}

export interface createAccount {
  createAccount: createAccount_createAccount;
}

export interface createAccountVariables {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFeed
// ====================================================

export interface seeFeed_seeFeed_host {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | null;
}

export interface seeFeed_seeFeed {
  __typename: "Post";
  id: string;
  thumbNail: string;
  caption: string;
  location: string;
  host: seeFeed_seeFeed_host;
  isLiked: boolean;
  isCommented: boolean;
  likeCount: number;
  commentCount: number;
  maxPeopleCount: number;
  checkIn: string;
  checkOut: string;
  price: number;
  createdDate: string | null;
  createdTime: string | null;
}

export interface seeFeed {
  seeFeed: seeFeed_seeFeed[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchPost
// ====================================================

export interface searchPost_searchPost {
  __typename: "Post";
  id: string;
  thumbNail: string;
  caption: string;
  location: string;
  likeCount: number;
  createdDate: string | null;
}

export interface searchPost {
  searchPost: searchPost_searchPost[];
}

export interface searchPostVariables {
  term: string;
  priceGte?: number | null;
  priceLte?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFullPost
// ====================================================

export interface seeFullPost_seeFullPost_post_host {
  __typename: "User";
  id: string;
  fullName: string | null;
  avatar: string | null;
  username: string;
  isSelf: boolean;
}

export interface seeFullPost_seeFullPost_post_comments_user {
  __typename: "User";
  username: string;
  avatar: string | null;
}

export interface seeFullPost_seeFullPost_post_comments {
  __typename: "Comment";
  id: string;
  text: string;
  user: seeFullPost_seeFullPost_post_comments_user;
  createdDate: string | null;
  createdTime: string | null;
}

export interface seeFullPost_seeFullPost_post {
  __typename: "Post";
  id: string;
  thumbNail: string;
  caption: string;
  location: string;
  host: seeFullPost_seeFullPost_post_host;
  comments: seeFullPost_seeFullPost_post_comments[];
  isLiked: boolean;
  isCommented: boolean;
  likeCount: number;
  commentCount: number;
  maxPeopleCount: number;
  checkIn: string;
  checkOut: string;
  price: number;
  createdDate: string | null;
  createdTime: string | null;
}

export interface seeFullPost_seeFullPost {
  __typename: "SeeFullPostResponse";
  ok: boolean;
  error: string | null;
  post: seeFullPost_seeFullPost_post | null;
}

export interface seeFullPost {
  seeFullPost: seeFullPost_seeFullPost;
}

export interface seeFullPostVariables {
  postId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
