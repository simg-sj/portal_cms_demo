import BarTwowayChart from "@/app/components/chart/BarTwowayChart";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import Image from "next/image";
import Search from "../../../../../public/images/icon/detail-icon.png";
import EmptyDataWrapper from "@/app/components/common/ui/input/EmptyDataWrapper";
import FormatNumber from "@/app/components/common/ui/formatNumber";
import React, { useState } from "react";
import { TooltipItem } from "chart.js";
import Error from "../../../../../public/images/icon/error-icon.png";
import dayjs from "dayjs";
import {
  DashboardData,
  ExtendedParamType,
  ParamDashType2,
} from "@/@types/common";
import { ListContainer } from '@/app/components/common/ui/input/listContainer';

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

const ErrorChart = ({
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

  const optionBar = {
    responsive: true,
    scales: {
      x: {
        stacked: false, // 스택 제거
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
            if (tableData.changeGraphData[dataIndex]) {
              return [`접수건: ${tableData.changeGraphData[dataIndex].pAdd}`];
            }
            return "데이터 없음";
          },
        },
      },
    },
  };

  console.log("@@@2", chartData.twowayBar);

  // 장애접수현황 테이블
  const defectColumns = [
    { key: "no", header: "No" },
    { key: "cDay", header: "접수월" },
    { key: "itemDefect", header: "장애" },
    { key: "subscriptionPass", header: "정기권" },
    { key: "refundStatus", header: "환불" },
    { key: "etcReason", header: "기타" },
    { key: "total", header: "총 건수" },
  ];

  const defectDataWithId = tableData.changeData.map((item, index) => ({
    ...item,
    no: index + 1,
    id: index + 1, // 필수: 고유 id 필요
  }));


  return (
    <div>
      <div className={"mb-6 title"}>장애접수율</div>
      <div className="block 2xl:flex">
        <div
          className={
            "mx-auto mb-8 hidden lg:block lg:max-w-[900px] 2xl:mb-0 2xl:mr-16 2xl:w-[600px]"
          }
        >
          <div
            className={"mb-5 text-[16px] font-medium"}
          >{`최근 ${tableData.changeGraphData.length}개월 장애접수현황`}</div>
          <BarTwowayChart data={chartData.twowayBar} options={optionBar} />
        </div>
        <div className={"w-full"}>
          <div className={"mb-4 flex justify-end text-lg"}>
            <div
              className={"flex w-fit items-center rounded-lg border sm:px-5 sm:py-1 px-3 py-0"}
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
              items={defectDataWithId}
              columns={defectColumns}
              getItemId={(item) => item.id}
              withCheckbox={false}
              selectedItems={[]}
            />
          </div>
        </div>
      </div>


      {/*<div className={"flex"}>
        <div className={"mr-16 w-[1000px]"}>
          <div
            className={"mb-5 text-[16px] font-medium"}
          >{`최근 ${tableData.changeGraphData.length}개월 장애접수현황`}</div>
          <BarTwowayChart data={chartData.twowayBar} options={optionBar} />
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
          <div className={"max-h-[260px] overflow-y-auto"}>
            <table className={"relative w-full"}>
              <colgroup>
                <col style={{ width: "" }} />
                <col style={{ width: "" }} />
                <col style={{ width: "120px" }} />
                <col style={{ width: "120px" }} />
                <col style={{ width: "120px" }} />
                <col style={{ width: "120px" }} />
              </colgroup>
              <thead className={"sticky left-0 top-0"}>
                <tr>
                  <th rowSpan={2}>No</th>
                  <th rowSpan={2}>접수월</th>
                  <th colSpan={4}>장애구분</th>
                  <th rowSpan={2}>총 건수</th>
                </tr>
                <tr>
                  <th>장애</th>
                  <th>정기권</th>
                  <th>환불</th>
                  <th>기타</th>
                </tr>
              </thead>
              <tbody>
                <EmptyDataWrapper data={tableData.changeGraphData}>
                  {tableData.changeData.map((changeData, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{changeData.cDay}</td>
                      <td>
                        {changeData.itemDefect > 0
                          ? FormatNumber(changeData.itemDefect)
                          : 0}
                        건
                      </td>
                      <td>
                        {changeData.subscriptionPass > 0
                          ? FormatNumber(changeData.subscriptionPass)
                          : 0}
                        건
                      </td>
                      <td>
                        {changeData.refundStatus > 0
                          ? FormatNumber(changeData.refundStatus)
                          : 0}
                        건
                      </td>
                      <td>
                        {changeData.etcReason > 0
                          ? FormatNumber(changeData.etcReason)
                          : 0}
                        건
                      </td>
                      <td>
                        {changeData.total > 0
                          ? FormatNumber(changeData.total)
                          : 0}
                        건
                      </td>
                    </tr>
                  ))}
                </EmptyDataWrapper>
              </tbody>
            </table>
          </div>
        </div>
      </div>*/}
    </div>
  );
};

export default ErrorChart;
