import Icon from "$store/components/ui/Icon.tsx";

// export interface Props {
//   searchbar?: SearchbarProps;
// }

function FabricSizeTable({ onClose }: { onClose: () => void }) {
  const mockTable = [
    {
      title: "Moda Feminina",
      records: [
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
      ],
    },
    {
      title: "Moda Masculina",
      records: [
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
      ],
    },
    {
      title: "Moda Infantil",
      records: [
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
        {
          name: "Blazer manga curta",
          pSize: 1,
          mSize: 1.7,
          gSize: 2,
        },
      ],
    },
  ];

  return (
    <div class="flex flex-col px-20 pb-20 pt-6 justify-center">
      <div class="flex justify-end mb-12">
        <button onClick={onClose}>
          <Icon id="XMark" size={24} strokeWidth={2} />
        </button>
      </div>
      <div class="p-3 font-bold text-center bg-[#a3a3a3]">
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
        {mockTable.map((t) => (
          <button class="btn bg-black text-white w-44">{t.title}</button>
        ))}
      </div>
      <div class="grid grid-cols-6 p-3 font-bold">
        <div class="col-span-3">
          <span>Modelos Femininos</span>
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
      {mockTable[0].records.map((r, i) => (
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

export default FabricSizeTable;
