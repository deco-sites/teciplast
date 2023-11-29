import Button from "$store/components/ui/Button.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";

const LoginToReview = () => {
  const { user } = useUser();
  // const isLogged = true;
  const isLogged = Boolean(user.value?.email);

  return (
    <>
      {!isLogged && (
        <div class="flex flex-col items-center mt-4">
          <span>Faça login para avaliar o produto</span>
          <a href="/login" class="btn btn-secondary">Fazer Login</a>
        </div>
      )}
    </>
  );
};

export default LoginToReview;
