import { getDoc, doc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../firebase/config";

export const useChatStore = create((set) => ({
    chatID: null,
    chatUser: null,
    changeChat: (chatID, chatUser) => {
        set({ chatID, chatUser });
    }
}));