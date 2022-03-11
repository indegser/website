import { supabase } from "@src/apis/supabase";
import { useForm } from "react-hook-form";

export const useAdminAuth = () => {
  const form = useForm();

  const handleSignIn = form.handleSubmit(async ({ email }) => {
    await supabase.auth.signIn({ email });
    alert(`Sent Magic Link! 🔗`);
  });

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      alert(err.message);
    }
  };

  return {
    form,
    handleSignIn,
    handleSignOut,
  };
};
