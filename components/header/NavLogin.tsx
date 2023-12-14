import Icon from "$store/components/ui/Icon.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";

function NavLogin() {
  const { user } = useUser();
  const isLogged = Boolean(user.value?.email);

  return (
    <>
      {!isLogged && (
        <div class="uppercase flex flex-row text-xs justify-center items-center gap-2">
          <a
            class="flex flex-row  justify-center items-center "
            href="/login"
            aria-label="Log in"
          >
            <Icon
              id="User-Circle2"
              class={`w-full  justify-center items-center  object-cover mr-2`}
              size={20}
              strokeWidth={0.4}
            />
            Entrar
          </a>
        </div>
      )}
    </>
  );
}

export default NavLogin;
