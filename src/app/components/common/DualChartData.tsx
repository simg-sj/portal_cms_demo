import React from "react";
import DoughnutChart from "@/app/components/chart/DoughnutChart";
import CountUp from "@/app/components/common/ui/countUp";

interface DualChartDataProps {
  chartData: any;
  primary: {
    label: string;
    value: number;
    suffix?: string;
  };
  secondary: {
    label: string;
    value: number;
    suffix?: string;
  };
}

const DualChartData = ({ chartData, primary, secondary }: DualChartDataProps) => {
  return (
    <div
      className={
        "mb-5 flex max-h-[300px] w-full items-end justify-between lg:mb-0 lg:mr-16 lg:block lg:w-[200px]"
      }
    >
      <div className={"relative w-[160px] sm:w-[200px]"}>
        <DoughnutChart data={chartData} />
        <div
          className={
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center"
          }
        >
          <div className={"mb-1 text-gray-600"}>{primary.label}</div>
          <CountUp
            end={primary.value}
            duration={5}
            className={"text-2xl font-semibold"}
            suffix={primary.suffix}
          />
        </div>
      </div>
      <div className={"mt-4 text-right"}>
        <div className={"text-gray-600"}>{secondary.label}</div>
        <CountUp
          end={secondary.value}
          duration={2}
          className={"text-xl font-semibold sm:text-2xl"}
          suffix={secondary.suffix}
        />
      </div>
    </div>
  );
};

export default DualChartData;
