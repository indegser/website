import backend from "apis/backend";
import Router from "next/router";
import { useEffect } from "react";
import { useAuthStore } from "stores/authStore";

const useFirebaseAuth = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  const signIn = () => {
    const email = prompt("Email address");
    if (!email) return;

    const password = prompt("Password");
    if (!password) return;

    backend
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        alert(`Cannot sign in as admin. ` + err.message);
      });
  };

  useEffect(() => {
    const unsub = backend.auth().onAuthStateChanged((user) => {
      setAuth(user ? "ADMIN" : "ANONYMOUS");
    });

    return () => {
      unsub();
    };
  }, []);

  return { signIn };
};

export const useProfileActions = (user: object) => {
  const auth = useAuthStore((s) => s.auth);
  const { signIn } = useFirebaseAuth();

  const goWrite = () => {
    Router.push("/story/[...slug]", Router.asPath + "?edit=true");
  };

  const goNew = () => {
    Router.push("/new-story");
  };

  return {
    signIn: auth !== "ADMIN" ? signIn : undefined,
    goWrite,
    goNew,
  };
};
