import Modal from "$store/components/ui/Modal.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { TableItem } from "$store/sections/Product/ProductInfo.tsx";

function FabricSizeTable(
  { onClose, table }: { onClose: () => void; table: TableItem[] },
) {
  const { fabricTabOpen } = useUI();

  return (
    <div class="flex flex-col px-20 pb-20 pt-6 justify-center">
      <div class="flex justify-end mb-12">
        <button onClick={onClose}>
          <Icon id="XMark" size={24} strokeWidth={2} />
        </button>
      </div>
      <div class="p-3 font-bold text-center bg-[#e0e0e0]">
        <span class="uppercase text-lg">tabela de medidas</span>
      </div>
      <div class="text-center pt-3 font-semibold">
        <span>
          Aqui estão listadas as quantidades de tecido que você deve comprar
          baseado no tipo de roupa que deseje costurar. Selecione o tipo de
          roupa que quer, veja o tamanho na tabela, e faça sua compra com
          segurança!
        </span>
      </div>
      <div class="flex justify-center gap-14 my-12">
        {table.map((t) => (
          <button
            class={`btn ${
              Number(fabricTabOpen) === table.indexOf(t)
                ? "bg-black text-white"
                : "border bg-white text-black"
            }  w-44`}
            onClick={() => fabricTabOpen.value = table.indexOf(t)}
          >
            {t.title}
          </button>
        ))}
      </div>
      <div class="grid grid-cols-6 p-3 font-bold">
        <div class="col-span-3">
          <span>{table[Number(fabricTabOpen)].title}</span>
        </div>
        <div class="col-span-1">
          <span>P (36-42)</span>
        </div>
        <div class="col-span-1">
          <span>M (44-52)</span>
        </div>
        <div class="col-span-1">
          <span>G (54-60)</span>
        </div>
      </div>
      {table[Number(fabricTabOpen)].records.map((r, i) => (
        <div class={`grid grid-cols-6 p-3 ${i % 2 === 0 && "bg-[#e0e0e0]"}`}>
          <div class="col-span-3">
            <span class="uppercase">{r.name}</span>
          </div>
          <div class="col-span-1">
            <span>{r.pSize.toFixed(2)} m</span>
          </div>
          <div class="col-span-1">
            <span>{r.mSize.toFixed(2)} m</span>
          </div>
          <div class="col-span-1">
            <span>{r.gSize.toFixed(2)} m</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function FabricSizeTableModal({ table }: { table: TableItem[] }) {
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
        <div class="absolute bg-base-100 container h-[80vh] overflow-auto">
          <FabricSizeTable
            onClose={() => displayFabricSizeTable.value = false}
            table={table}
          />
        </div>
      </Modal>
    </>
  );
}

export default FabricSizeTableModal;
