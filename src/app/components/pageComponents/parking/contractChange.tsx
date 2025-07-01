import BarTwowayChart from "@/app/components/chart/BarTwowayChart";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import Image from "next/image";
import Search from "../../../../../public/images/icon/detail-icon.png";
import FormatNumber from "@/app/components/common/ui/formatNumber";
import React, { useEffect, useState } from "react";
import { TooltipItem } from "chart.js";
import Error from "../../../../../public/images/icon/error-icon.png";
import dayjs from "dayjs";
import {
  DashboardData,
  ExtendedParamType,
  ParamDashType2,
} from "@/@types/common";
import { ListContainer } from "@/app/components/common/ui/input/listContainer";

interface ContractProps {
  chartData: {
    doughnut: any;
    doughnutValue: number;
    twowayBar: any;
    topCounsel: any;
    topBusiness: any;
    pieCounsel: any;
    pieAccident: any;
  };
  bpk: number;
  tableData: DashboardData;
  handleParam: (type: string, param: ParamDashType2) => Promise<void>;
  param: ParamDashType2;
  setParam: React.Dispatch<React.SetStateAction<ExtendedParamType>>;
}

const ContractComponent = ({
  tableData,
  chartData,
  handleParam,
  param,
  setParam,
}: ContractProps) => {
  const [days, setDays] = useState({
    type: "contract",
    sDay: dayjs().subtract(5, "month").format("YYYY-MM"),
    eDay: dayjs().format("YYYY-MM"),
  });

  const [aspectRatio, setAspectRatio] = useState(4); // 기본값 (1536 미만)

  useEffect(() => {
    function updateAspectRatio() {
      const width = window.innerWidth;
      if (width >= 1536) {
        setAspectRatio(2);
      } else {
        setAspectRatio(4);
      }
    }

    updateAspectRatio(); // 초기 실행
    window.addEventListener("resize", updateAspectRatio);

    return () => window.removeEventListener("resize", updateAspectRatio);
  }, []);

  const optionTwowayBar = {
    responsive: true,
    aspectRatio: aspectRatio,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "left",
        align: "end",
      },
      tooltip: {
        backgroundColor: "white",
        titleColor: "black",
        bodyColor: "black",
        borderWidth: 1,
        borderColor: "#e7e7e7",
        bodyAlign: "center" as const,
        titleAlign: "center" as const,
        position: "average" as const,
        yAlign: "bottom" as const,
        callbacks: {
          label: (context: TooltipItem<"bar">) => {
            const dataIndex = context.dataIndex;
            const datasetIndex = context.datasetIndex;
            if (tableData.changeGraphData[dataIndex]) {
              if (datasetIndex === 0) {
                return [
                  `추가 사업장: ${tableData.changeGraphData[dataIndex].pAdd}`,
                  `추가 보험금: ${tableData.changeGraphData[dataIndex].AddAmt.toLocaleString()} 원`,
                ];
              } else {
                return [
                  `종료 사업장: ${tableData.changeGraphData[dataIndex].pEnd}`,
                  `감소 보험금: ${tableData.changeGraphData[dataIndex].EndAmt.toLocaleString()} 원`,
                ];
              }
            }
            return (
              <div className={"items-centers my-[150px] flex justify-center"}>
                <Image
                  src={Error}
                  alt={"에러"}
                  width={30}
                  height={30}
                  className={"mr-5"}
                />
                <div className={"text-lg text-gray-700"}>
                  데이터가 없습니다.
                </div>
              </div>
            );
          },
        },
      },
    },
  };

  // 테이블 데이터
  const contractColumns = [
    { key: "cDay", header: "변경일" },
    { key: "pNo", header: "증권번호" },
    { key: "pAdd", header: "사업장수 (추가)" },
    { key: "pEnd", header: "사업장수 (종료)" },
    { key: "AddAmt", header: "변경보험료 (추가)" },
    { key: "EndAmt", header: "변경보험료 (종료)" },
  ];

  const contractData = tableData.changeData.map((item, index) => ({
    ...item,
    id: index + 1,
    AddAmt:
      item.AddAmt && !isNaN(Number(item.AddAmt))
        ? `${FormatNumber(Number(item.AddAmt))}원`
        : "0원",
    EndAmt:
      item.EndAmt && !isNaN(Number(item.EndAmt))
        ? `${FormatNumber(Number(item.EndAmt))}원`
        : "0원",
  }));

  return (
    <div>
      <div className={"mb-6 text-lg font-light"}>계약변경현황</div>
      <div className="block 2xl:flex">
        <div
          className={
            "mx-auto mb-8 hidden lg:block lg:max-w-[900px] 2xl:mb-0 2xl:mr-16 2xl:w-[600px]"
          }
        >
          <div
            className={"mb-5 text-[16px] font-medium"}
          >{`최근 ${tableData.changeGraphData.length}개월 계약변경현황`}</div>
          <BarTwowayChart
            data={chartData.twowayBar}
            options={optionTwowayBar}
          />
        </div>
        <div className={"w-full"}>
          <div className={"mb-4 flex justify-end text-lg"}>
            <div
              className={"flex w-fit items-center rounded-lg border px-5 py-1"}
            >
              <DayTerm
                type="month"
                condition={"contract"}
                sDay={new Date(days.sDay)}
                eDay={new Date(days.eDay)}
                setDays={setDays}
                setParam={setParam}
              ></DayTerm>
              <button onClick={() => handleParam("contract", param)}>
                <Image
                  src={Search}
                  alt={"검색"}
                  width={22}
                  height={20}
                  className={"ml-3 cursor-pointer"}
                ></Image>
              </button>
            </div>
          </div>
          <div className={"max-h-[210px] overflow-y-auto 2xl:max-h-[260px]"}>
            <ListContainer
              items={contractData}
              columns={contractColumns}
              getItemId={(item) => item.id}
              withCheckbox={false}
              selectedItems={[]}
            />
            {/*<table className={'w-full relative'}>
                            <colgroup>
                                <col style={{width: ""}}/>
                                <col style={{width: ""}}/>
                                <col style={{width: ""}}/>
                                <col style={{width: "80px"}}/>
                                <col style={{width: "80px"}}/>
                                <col style={{width: "200px"}}/>
                                <col style={{width: "200px"}}/>
                            </colgroup>
                            <thead className={'sticky left-0 top-0'}>
                            <tr>
                                <th rowSpan={2}>No</th>
                                <th rowSpan={2}>변경일</th>
                                <th rowSpan={2}>증권번호</th>
                                <th colSpan={2}>사업장수</th>
                                <th colSpan={2}>변경보험료</th>
                            </tr>
                            <tr>
                                <th>추가</th>
                                <th>종료</th>
                                <th>추가</th>
                                <th>종료</th>
                            </tr>
                            </thead>
                            <tbody>
                            <EmptyDataWrapper data={tableData.changeGraphData}>
                                {tableData.changeData.map((changeData, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{changeData.cDay}</td>
                                        <td>{changeData.pNo}</td>
                                        <td>
                                            {changeData.pAdd}
                                        </td>
                                        <td>
                                            {changeData.pEnd}
                                        </td>
                                        <td className={'text-right'}>
                                            {changeData.AddAmt > 0 ? FormatNumber(changeData.AddAmt) : 0}원
                                        </td>
                                        <td className={'text-right'}>
                                            {changeData.EndAmt > 0 ? FormatNumber(changeData.EndAmt) : 0}원
                                        </td>
                                    </tr>
                                ))}
                            </EmptyDataWrapper>
                            </tbody>
                        </table>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractComponent;
