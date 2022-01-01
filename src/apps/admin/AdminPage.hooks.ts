import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const auth = getAuth();

export const useAdminAuth = () => {
  const form = useForm();
  const router = useRouter();

  const handleSignIn = form.handleSubmit(({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        form.setError("error", { type: "manual", message: errorMessage });
      });
  });

  return {
    form,
    handleSignIn,
  };
};
