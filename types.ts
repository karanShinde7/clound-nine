
export type Gender = 'boy' | 'girl';

export interface GuestEntry {
  id: string;
  guestName: string;
  genderVote: Gender;
  suggestedBabyName: string;
  timestamp: number;
}

export interface AppState {
  isAdmin: boolean;
  isAuthenticated: boolean;
  currentUser: string | null;
}
