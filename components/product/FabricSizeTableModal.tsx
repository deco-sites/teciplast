import Modal from "$store/components/ui/Modal.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import Icon from "$store/components/ui/Icon.tsx";
import FabricSizeTable from "$store/components/product/FabricSizeTable.tsx";

// export interface Props {
//   searchbar?: SearchbarProps;
// }

function FabricSizeTableModal() {
  const { displayFabricSizeTable } = useUI();

  return (
    <>
      <button
        class={"btn-square btn-ghost join-item  w-[48%] h-11 border border-[#403F3F] lg:text-base flex justify-start gap-10 px-4  items-center"}
        onClick={() => displayFabricSizeTable.value = true}
      >
        <Icon class={`rotate-180`} id="ruler" width={16} height={16} />{" "}
        Quantos mestros comprar
      </button>
      <Modal
        loading="lazy"
        open={displayFabricSizeTable.value}
        onClose={() => displayFabricSizeTable.value = false}
      >
        <div
          class="absolute bg-base-100 container"
          style={{ marginTop: 200 }}
        >
          <FabricSizeTable />
        </div>
      </Modal>
    </>
  );
}

export default FabricSizeTableModal;
