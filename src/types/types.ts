export interface AuthState {
  userId: string | null;
}
export interface ProfileState {
  id: number;
  username: string;
  bio: string;
  avatarUrl: string;
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

export enum PostCategories {
  POSTS,
  LIKED_POSTS,
}
