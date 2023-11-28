import Icon from "$store/components/ui/Icon.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import { useCallback } from "preact/hooks";
import { invoke } from "$store/runtime.ts";

// const logout = useCallback(() => {
//   alert("LOGOOUT!");
//   // const data = invoke["deco-sites/teciplast"].actions.createReview(
//   //   body,
//   // );
// }, []);

const logout = () => {
  const data = invoke["deco-sites/teciplast"].actions.logout();
  window.location.href = "/";
};

function NavLogout() {
  const { user } = useUser();
  const isLogged = Boolean(user.value?.email);

  return (
    <>
      {isLogged && (
        <div class="uppercase flex flex-row text-base justify-center items-center gap-2">
          <a
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
            class="flex flex-row  justify-center items-center "
            href="#"
            aria-label="Log out"
          >
            <Icon
              id="logOut"
              class={`w-full  justify-center items-center  object-cover mr-2`}
              size={24}
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
