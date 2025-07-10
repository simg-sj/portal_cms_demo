import React from "react";
import Image from "next/image";
import Button from "@/app/components/common/ui/button/button";
import { ListContainer} from "@/app/components/common/ui/input/listContainer";
import ExcelIcon from "../../../../public/images/icon/excel-icon.png";
import { onClickExcel } from "@/app/lib/onClickExcel";

interface ExcelConfig<T> {
  columns: { key: string; header: string }[];
  sheetName: string;
  fileName: string;
  data: T[];
}

interface ExcelTableProps<T> {
  excelConfig: ExcelConfig<T>;
  listProps: {
    items: T[];
    columns: { key: string; header: string }[];
    getItemId: (item: T) => number;
    withCheckbox?: boolean;
    selectedItems?: T[];
    selectedRow?: number ;
    onRowClick?: (item: T) => void;
  };
}

function ExcelTable<T>({
                                      excelConfig,
                                      listProps,
                                    }: ExcelTableProps<T>) {
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button
          color={"green"}
          height={32}
          width={120}
          onClick={() =>
            onClickExcel(
              excelConfig.columns,
              excelConfig.sheetName,
              excelConfig.data,
              excelConfig.fileName
            )
          }
        >
          <Image
            src={ExcelIcon}
            alt="다운로드"
            width={17}
            height={17}
            className="mr-2"
          />
          엑셀다운
        </Button>
      </div>

      <div className="max-h-[280px] overflow-y-auto">
        <ListContainer {...listProps} />
      </div>
    </div>
  );
}

export default ExcelTable;
