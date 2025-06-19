import { create } from 'zustand';

interface MainScrollContainerState {
  element: HTMLDivElement | null;
}

interface MainScrollContainerActions {
  setElement: (element: HTMLDivElement | null) => void;
}

type MainScrollContainerStore = MainScrollContainerState &
  MainScrollContainerActions;

const initialState: MainScrollContainerState = { element: null };

export const useMainScrollContainer = create<MainScrollContainerStore>(set => ({
  ...initialState,
  setElement: (element: HTMLDivElement | null) => set({ element }),
}));
