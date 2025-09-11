import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";

const useLogin = () => {
    // when u want to just make a get request you use "useQuery"
    // but when u want to make requests : post,put,delete 
    // we use mutations
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { error, isPending, loginMutation: mutate };
};
export default useLogin;

// mutationFn: login -> when you call this mutation, it runs your login API function.
// onSuccess -> after a successful login, it tells React Query to invalidate the cached ["authUser"] query.
// This forces useAuthUser (the other hook) to re-fetch the logged-in user.
// mutate -> the function you call to trigger the login.
// isPending -> true while the login request is ongoing.
// error -> holds any error if login fails.
