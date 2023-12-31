import Icon from "$store/components/ui/Icon.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";

function NavLogout() {
  const { user } = useUser();
  const isLogged = Boolean(user.value?.email);

  return (
    <>
      {isLogged && (
        <div class="uppercase flex flex-row text-xs justify-center items-center gap-2">
          <a
            class="flex flex-row  justify-center items-center "
            href="/api/vtexid/pub/logout?scope=tecilar&returnUrl=/"
            aria-label="Log out"
          >
            <Icon
              id="logOut"
              class={`w-full  justify-center items-center  object-cover mr-2`}
              size={20}
              strokeWidth={0.4}
            />
            Sair
          </a>
        </div>
      )}
    </>
  );
}

export default NavLogout;
