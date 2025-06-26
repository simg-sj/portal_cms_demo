import DataTable from '@/app/components/table/DataTable';
import SearchForm from '@/app/components/common/ui/search';
export type SearchField =
  | { type: "text"; name: string; label: string }
  | { type: "select"; name: string; label: string; options: { value: string; label: string }[] }
  | { type: "date"; name: string; label: string };

function Page () {
  const data = [
    { name: "홍길동", email: "hong@example.com", age: 29 },
    { name: "김영희", email: "kim@example.com", age: 34 },
  ];

  const labelMap = {
    name: "이름",
    email: "이메일",
  };


  const fields: SearchField[] = [
    { type: "text", name: "name", label: "이름" },
    { type: "select", name: "status", label: "상태", options: [
        { value: "active", label: "활성" },
        { value: "inactive", label: "비활성" },
      ] },
  ];

  /*const render = {
    email: (v: string) => <button >승인</button>,
  };*/

  return(
    <div>
      <SearchForm fields={fields} />
      <div className="rounded-lg border border-gray-100 bg-white p-3 lg:p-6">
      <DataTable data={data} labelMap={labelMap} selectable rowKey={"name"}  />
      </div>
    </div>
  )
}

export default Page;