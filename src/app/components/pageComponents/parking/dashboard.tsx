"use client";
import Button from "@/app/components/common/ui/button/button";
import Excel from "../../../../../public/images/icon/excel-icon.png";
import "react-datepicker/dist/react-datepicker.css";
import DoughnutChart from "@/app/components/chart/DoughnutChart";
import FormatNumber from "@/app/components/common/ui/formatNumber";
import Tab from "@/app/components/common/ui/tab";
import Image from "next/image";
import CarIcon from "../../../../../public/images/icon/car-icon.png";
import ChargeIcon from "../../../../../public/images/icon/charge-icon.png";
import BarHorizonChart from "@/app/components/chart/BarHorizonChart";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import { DashboardData, MonthCumulativeData, ParamDashType2 } from '@/@types/common';
import CountUp from "@/app/components/common/ui/countUp";
import React, { SetStateAction, useEffect, useState } from "react";
import Search from "../../../../../public/images/icon/detail-icon.png";
import dayjs from "dayjs";
import { onClickExcel } from "@/app/lib/onClickExcel";
import { monthColumns, platformList, policyColumns } from "@/config/data";
import { useNotifications } from "@/context/NotificationContext";
import Notifications from "@/app/components/popup/Notifications";
import ContractComponent from "@/app/components/pageComponents/parking/contractChange";
import ErrorChart from "@/app/components/pageComponents/parking/errorChart";
import { ListContainer } from "@/app/components/common/ui/input/listContainer";
import CountCardGroup from '@/app/components/common/CountCardGroup';
import DualChartData from '@/app/components/common/DualChartData';
import ExcelTable from '@/app/components/common/ExcelTable';

interface DashboardProps {
  chartData: {
    doughnut: any;
    doughnutValue: number;
    twowayBar: any;
    topCounsel: any;
    topBusiness: any;
    topError: any;
    pieCounsel: any;
    pieAccident: any;
  };
  bpk: number;
  tableData: DashboardData;
  setDoughnutValue: React.Dispatch<SetStateAction<number | null>>;
  updateTableData: (param: ParamDashType2, type: string) => Promise<string>;
}

interface DoughnutValueType {
  lossRatio: number;
  closingAmt: number;
}

export default function DashboardComponent({
  chartData,
  tableData,
  bpk,
  updateTableData,
  setDoughnutValue,
}: DashboardProps) {
  //업체별 라우팅 옵션
  const { showAlert } = useNotifications();
  const { renewals } = useNotifications(); // 알림 데이터 가져오기
  const [donutValues, setDounutValues] = useState<DoughnutValueType>({
    lossRatio: tableData.counselData.at(-1).lossRatio,
    closingAmt: tableData.counselData.at(-1).closingAmt,
  });

  const [param, setParam] = useState<ParamDashType2>({
    job: "dash",
    bpk: bpk,
    gbn: "",
    pNo: "",
    sDay: dayjs().subtract(5, "month").format("YYYY-MM"),
    eDay: dayjs().format("YYYY-MM"),
  });
  const [days, setDays] = useState([
    {
      type: "contract",
      sDay: dayjs().subtract(5, "month").format("YYYY-MM"),
      eDay: dayjs().format("YYYY-MM"),
    },
    {
      type: "top",
      sDay: dayjs().subtract(5, "month").format("YYYY-MM"),
      eDay: dayjs().format("YYYY-MM"),
    },
    {
      type: "month",
      sDay: dayjs().subtract(5, "month").format("YYYY-MM"),
      eDay: dayjs().format("YYYY-MM"),
    },
  ]);
  const handleParam = async (type: string, param: ParamDashType2) => {
    let code = await updateTableData(param, type);

    if (code === "401") {
      showAlert("데이터가 없습니다.");
    }
  };

  const handleDoughnut = async (counsel) => {
    const pNo = counsel.pNo;

    setParam({ ...param, pNo });

    // ✅ 도넛 차트용 값만 로컬 상태에 반영
    setDounutValues({
      lossRatio: counsel.lossRatio,
      closingAmt: counsel.closingAmt,
    });

    setDoughnutValue(counsel.lossRatio);
  };

  useEffect(() => {
    if (tableData?.counselData?.length > 0) {
      const maxLossItem = tableData.counselData.reduce((prev, curr) =>
        curr.total > prev.total ? curr : prev,
      );

      // 상태 업데이트
      setDounutValues({
        lossRatio: maxLossItem.lossRatio,
        closingAmt: maxLossItem.closingAmt,
      });

      setDoughnutValue(maxLossItem.lossRatio); // 도넛 차트에도 반영

      setParam((prev) => ({
        ...prev,
        pNo: maxLossItem.pNo,
      }));
    }
  }, []);

  useEffect(() => {
    updateTableData(param, "init");
  }, [param.pNo]);

  const tabs = {
    hiparking: [
      {
        label: "지급보험금",
        content: (
          <>
            <div className={"my-5 text-lg font-medium"}>지급보험금 TOP 5</div>
            <BarHorizonChart data={chartData.topCounsel} />
          </>
        ),
      },
      {
        label: "사고발생업소",
        content: (
          <>
            <div className={"my-5 text-lg font-medium"}>사고발생업소 TOP 5</div>
            <BarHorizonChart data={chartData.topBusiness} />
          </>
        ),
      },
    ],
    kmpark: [
      {
        label: "지급보험금",
        content: (
          <>
            <div className={"my-5 text-lg font-medium"}>지급보험금 TOP 5</div>
            <BarHorizonChart data={chartData.topCounsel} />
          </>
        ),
      },
      {
        label: "사고발생업소",
        content: (
          <>
            <div className={"my-5 text-lg font-medium"}>사고발생업소 TOP 5</div>
            <BarHorizonChart data={chartData.topBusiness} />
          </>
        ),
      },
      {
        label: "장애발생업소",
        content: (
          <>
            <div className={"my-5 text-lg font-medium"}>장애발생업소 TOP 5</div>
            <BarHorizonChart data={chartData.topError} />
          </>
        ),
      },
    ],
  };

  // 테이블 데이터
  const insuColumns = [
    { key: "pNo", header: "증권번호" },
    { key: "nickName", header: "별칭" },
    { key: "insurancePeriod", header: "보험기간" },
    { key: "bCount", header: "사업장수" },
    { key: "total", header: "총보험료" },
    { key: "closingAmt", header: "지급보험금" },
    { key: "repairCost", header: "손조비용" },
    { key: "lossRatio", header: "손해율" },
  ];
  const insuData = tableData.counselData.map((counsel) => ({
    ...counsel,
    insurancePeriod: `${counsel.sDay} ~ ${counsel.eDay}`,
    lossRatio:
      counsel.lossRatio !== null && counsel.lossRatio !== undefined
        ? `${counsel.lossRatio}%`
        : "-",
  }));

  const accidentColumns = [
    { key: "changeDay", header: "변경일" },
    { key: "acceptNum", header: "접수건수" },
    { key: "endNum", header: "종결건수" },
    { key: "estimateNum", header: "추산건수" },
    { key: "disclaimerNum", header: "면책건수" },
    { key: "total", header: "보험금" },
  ];

  const accidentData = tableData.monthAccidentData.map((item, index) => ({
    ...item,
    id: index,
    total: typeof item.total === "number" ? item.total : 0,
  }));

  //카드 데이터

  const cardData: MonthCumulativeData | undefined = tableData.monthCumulativeData[0];

  const cardItems = [
    {
      icon: ChargeIcon,
      title: '월 누적 보험금',
      value: FormatNumber(cardData.total ?? 0),
      unit: '원',
      percentChange: cardData.total_percent_change,
    },
    {
      icon: CarIcon,
      title: '월 누적 사고접수',
      value: FormatNumber(cardData.counts ?? 0),
      unit: '건',
      percentChange: cardData.counts_percent_change,
    },
  ];

  //계약현황 손해율, 지급보험금
  const dualChartStats = {
    chartData: chartData.doughnut,
    primary: {
      label: "손해율",
      value: donutValues.lossRatio,
      suffix: "%",
    },
    secondary: {
      label: "지급보험금",
      value: donutValues.closingAmt,
      suffix: "원",
    },
  }

  return (
    <>
      <div className={"box-layout"}>
          <div className={"title"}>계약현황</div>
          {/*<Button
            color={"green"}
            height={32}
            width={120}
            onClick={() =>
              onClickExcel(
                policyColumns,
                "policy",
                tableData.counselData,
                "증권별_손해자료.xlsx",
              )
            }
          >
            <Image
              src={Excel}
              alt={"다운로드"}
              width={17}
              height={17}
              className={"mr-2"}
            />
            엑셀다운
          </Button>*/}
        <div className={"lg:flex"}>
          {/*<div
            className={
              "mb-5 flex max-h-[300px] w-full items-end justify-between lg:mb-0 lg:mr-16 lg:block lg:w-[200px]"
            }
          >
            <div className={"relative w-[160px] sm:w-[200px]"}>
              <DoughnutChart data={chartData.doughnut}></DoughnutChart>
              <div
                className={
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center"
                }
              >
                <div className={"mb-1 text-gray-600"}>손해율</div>
                <CountUp
                  end={donutValues.lossRatio}
                  duration={5}
                  className={"text-2xl font-semibold"}
                  suffix={"%"}
                />
              </div>
            </div>
            <div className={"mt-4 text-right"}>
              <div className={"text-gray-600"}>지급보험금</div>
              <CountUp
                end={donutValues.closingAmt}
                duration={2}
                className={"text-xl font-semibold sm:text-2xl"}
                suffix={"원"}
              />
            </div>
          </div>*/}

          <DualChartData
            {...dualChartStats}
          />
          <div
            className={
              "w-full xl:w-[calc(100%-200px)]"
            }
          >

            <ExcelTable
              excelConfig={{
                columns: policyColumns,
                sheetName: "policy",
                fileName: "증권별_손해자료.xlsx",
                data: tableData.counselData,
              }}
              listProps={{
                items: insuData,
                columns: insuColumns,
                getItemId: (item) => Number(item.pNo),
                withCheckbox: false,
                selectedItems: [],
                selectedRow: param.pNo ? Number(param.pNo) : null,
                onRowClick: (item) => handleDoughnut(item),
              }}
            />
            {/*<ListContainer
              items={insuData}
              columns={insuColumns}
              getItemId={(item) => Number(item.pNo)}
              withCheckbox={false}
              selectedRow={param.pNo ? Number(param.pNo) : null}
              selectedItems={[]}
              onRowClick={(item) => handleDoughnut(item)}
            />*/}
          </div>
        </div>
      </div>
      <div className={"my-5 box-layout"}>
        {bpk === 2 && (
          <ContractComponent
            chartData={chartData}
            tableData={tableData}
            handleParam={handleParam}
            bpk={bpk}
            param={param}
            setParam={setParam}
          />
        )}
        {bpk === 1 && (
          <ErrorChart
            chartData={chartData}
            tableData={tableData}
            handleParam={handleParam}
            bpk={bpk}
            param={param}
            setParam={setParam}
          />
        )}
      </div>

      <div className={"flex flex-wrap 2xl:flex-nowrap"}>
        <div
          className={
            "my-5 w-full box-layout lg:w-1/3 2xl:w-1/6"
          }
        >
          <div className={"title"}>월 누적 현황</div>
            {/*<CountCard
              icon={ChargeIcon}
              title={"월 누적 보험금"}
              value={
                tableData.monthCumulativeData[0]?.total
                  ? FormatNumber(tableData.monthCumulativeData[0].total)
                  : 0
              }
              unit={"원"}
              percentChange={
                tableData.monthCumulativeData[0].total_percent_change
              }
            />
            <CountCard
              icon={CarIcon}
              title={"월 누적 사고접수"}
              value={
                tableData.monthCumulativeData[0]?.counts
                  ? FormatNumber(tableData.monthCumulativeData[0].counts)
                  : 0
              }
              unit={"건"}
              percentChange={
                tableData.monthCumulativeData[0].counts_percent_change
              }
            />*/}
            <CountCardGroup items={cardItems}/>
        </div>

        <div
          className={
            "my-5 w-[calc(100vw-30px)] box-layout lg:w-2/3 2xl:mx-8 2xl:w-2/6"
          }
        >
          <div className={"lg:flex lg:justify-between"}>
            <div className={"title"}>Top 5</div>
            <div className={"mb-4 flex justify-end text-lg"}>
              <div
                className={
                  "flex w-fit items-center rounded-lg border px-5 py-1"
                }
              >
                <DayTerm
                  type="month"
                  condition={"top"}
                  sDay={new Date(days[1].sDay)}
                  eDay={new Date(days[1].eDay)}
                  setDays={setDays}
                  setParam={setParam}
                ></DayTerm>
                <button onClick={() => handleParam("top", param)}>
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
          </div>
          <Tab tabs={tabs[platformList[bpk]]} />
        </div>

        <div
          className={
            "my-5 w-full box-layout 2xl:w-1/2"
          }
        >
          <div>
            <div className={"lg:flex lg:justify-between"}>
              <div className={"title"}>월별 사고접수현황</div>
              <div className={"mb-4 flex justify-end text-lg"}>
                <div
                  className={
                    "flex w-fit items-center rounded-lg border px-5 py-1"
                  }
                >
                  <DayTerm
                    type="month"
                    condition={"month"}
                    sDay={new Date(days[2].sDay)}
                    eDay={new Date(days[2].eDay)}
                    setDays={setDays}
                    setParam={setParam}
                  ></DayTerm>
                  <button onClick={() => handleParam("month", param)}>
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
            </div>
            {/*<div>
              <div className={"mb-4 flex justify-end"}>
                <Button
                  color={"green"}
                  height={32}
                  width={120}
                  onClick={() =>
                    onClickExcel(
                      monthColumns,
                      "month",
                      tableData.monthAccidentData,
                      "월별_사고접수_현황.xlsx",
                    )
                  }
                >
                  <Image
                    src={Excel}
                    alt={"다운로드"}
                    width={17}
                    height={17}
                    className={"mr-2"}
                  />
                  엑셀다운
                </Button>
              </div>
              <div className={"max-h-[350px] overflow-y-auto"}>
                <ListContainer
                  items={accidentData}
                  columns={accidentColumns}
                  getItemId={(item) => item.id}
                  withCheckbox={false}
                  selectedItems={[]}
                />
              </div>
            </div>*/}
            <ExcelTable
              excelConfig={{
                columns: monthColumns,
                sheetName: "month",
                fileName: "월별_사고접수_현황.xlsx",
                data: tableData.monthAccidentData,
              }}
              listProps={{
                items: accidentData,
                columns: accidentColumns,
                getItemId: (item) => item.id,
                withCheckbox: false,
                selectedItems: [],
              }}
            />
          </div>
        </div>
        {renewals.length > 0 && <Notifications />}
      </div>
    </>
  );
}
