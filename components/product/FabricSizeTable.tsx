import Icon from "$store/components/ui/Icon.tsx";

// export interface Props {
//   searchbar?: SearchbarProps;
// }

function FabricSizeTable() {
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
  ];

  return (
    <div class="flex flex-col p-20">
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
            <span>{r.name}</span>
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
