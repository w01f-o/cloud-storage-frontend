import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface TokenState {
  accessToken: string | null;
}

interface TokenActions {
  setAccessToken: (accessToken: string | null) => void;
}

export type TokenStore = TokenState & TokenActions;

const initialState: TokenState = {
  accessToken: null,
};

export const useTokenStore = create<TokenStore>()(
  devtools(
    persist(
      set => ({
        ...initialState,
        setAccessToken: accessToken =>
          set({ accessToken }, false, 'setAccessToken'),
      }),
      { name: 'session' }
    ),
    { name: 'SessionStore' }
  )
);
