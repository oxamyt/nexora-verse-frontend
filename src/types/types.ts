export interface AuthState {
  userId: string | null;
}
export interface ProfileState {
  username: string;
  bio: string;
  avatarUrl: string;
  followers: number;
  following: number;
  posts: number;
}
export interface ProfileContentProps {
  activePostCategory: PostCategories;
  setActivePostCategory: React.Dispatch<React.SetStateAction<PostCategories>>;
  PostCategories: typeof PostCategories;
}

export interface ProfileDetailsProps {
  profile: ProfileState;
  isProfileOwner: boolean;
  setProfile: (profile: ProfileState) => void;
}

export interface ProfileFormProps {
  profile: ProfileState;
  setProfile: (profile: ProfileState) => void;
}

export enum PostCategories {
  POSTS,
  LIKED_POSTS,
}
