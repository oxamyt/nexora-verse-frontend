export interface AuthState {
  userId: string | null;
}
export interface ProfileState {
  id: number;
  username: string;
  bio: string;
  avatarUrl: string;
  bannerUrl: string;
  followers: number;
  following: number;
  posts: number;
  isFollowedByRequester: boolean;
}
export interface ProfileContentProps {
  activePostCategory: PostCategories;
  setActivePostCategory: React.Dispatch<React.SetStateAction<PostCategories>>;
  PostCategories: typeof PostCategories;
}

export interface ProfileDetailsProps {
  profile: ProfileState;
  isProfileOwner: boolean;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>;
}

export interface ProfileFormProps {
  profile: ProfileState;
  setProfile: (profile: ProfileState) => void;
}

export interface Follow {
  id: number;
  username: string;
  avatarUrl: string;
}

export interface FollowListProps {
  query: (id: number | string) => any;
  followType: "Followed" | "Followers";
}

export interface AvatarFormProps {
  previewAvatarUrl: string | null;
  profile: ProfileState;
  setAvatarFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export interface BannerFormProps {
  previewBannerUrl: string | null;
  profile: ProfileState;
  setBannerFile: React.Dispatch<React.SetStateAction<File | null>>;
}
export interface BannerAvatarFormProps {
  previewBannerUrl: string | null;
  previewAvatarUrl: string | null;
  profile: ProfileState;
  setBannerFile: React.Dispatch<React.SetStateAction<File | null>>;
  setAvatarFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export interface User {
  id: number;
  username: string;
  avatarUrl: string;
}

export interface Post {
  User: User;
  id: number;
  title: string;
  body?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  _count: PostCounts;
  likes: Like[];
}

export interface Like {
  userId: number;
}

interface PostCounts {
  likes: number;
  comments: number;
}

export interface PostCardProps {
  post: Post;
  user: User;
}

export interface CommentType {
  id: number;
  content: string;
  likes: Like[];
  User: User;
  createdAt: Date;
  updatedAt: Date;
  _count: CommentCounts;
}

interface CommentCounts {
  likes: number;
  comments?: number;
}

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  sender: {
    id: number;
    username: string;
    avatarUrl: string;
  };
  receiver: {
    id: number;
    username: string;
    avatarUrl: string;
  };
}

export enum PostCategories {
  POSTS,
  LIKED_POSTS,
}

export enum FeedPostCategories {
  RECENT_POSTS,
  FOLLOWING_POSTS,
}
