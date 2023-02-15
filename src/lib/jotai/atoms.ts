import { atom } from "jotai";

let localPosts, localReplies, screenHeight;

if (typeof window !== "undefined") {
  // localPosts = localStorage.getItem("posts");
  localReplies = localStorage.getItem("replies");
  screenHeight = window.screen.height;
}

// const storedPosts = atom(localPosts ? JSON.parse(localPosts) : []);
const storedReplies = atom(localReplies ? JSON.parse(localReplies) : []);

// export const postAtom = atom(
//   (get) => get(storedPosts),
//   (get, set, newPosts) => {
//     set(storedPosts, newPosts);
//     localStorage.setItem("posts", JSON.stringify(newPosts));
//   }
// );

export const replyAtom = atom(
  (get) => get(storedReplies),
  (get, set, newReplies) => {
    set(storedReplies, newReplies);
    localStorage.setItem("replies", JSON.stringify(newReplies));
  }
);

export const postIDs = atom<Array<string>>([]);
export const countPosts = atom(0);
export const paginationAtom = atom({
  from: 0,
  to: 7,
});
