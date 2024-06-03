import { getDoc, doc } from "firebase/firestore";
import create from "zustand";
import { db } from "../firebase/config";

export const useUserStore = create((set) => ({
    currentUser: null,
    fetchUserinfo: async (uid) => {
        if (!uid) return;
        try {
            const docsnap = await getDoc(doc(db, "users", uid));
            set({ currentUser: docsnap.data() });
        } catch (error) {
            console.error(error);
        }
    }
}));