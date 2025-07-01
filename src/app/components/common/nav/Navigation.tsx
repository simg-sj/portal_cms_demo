"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { getThemeConfig } from "@/config/themeConfig";
import MenuItem from "@/app/components/common/nav/MenuItem";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOutWithForm } from "@/middleware";
import Loading from "@/app/(Navigation-Group)/loading";
import { Theme } from "@/@types/common";
import { useNotifications } from "@/context/NotificationContext";
import CenterPopup from "@/app/components/popup/CenterPopup";
import ErrorReception, {
  ErrorReceptionRef,
} from "@/app/components/pageComponents/errorReception";

export default function Navigation() {
  const pathname = usePathname();
  const { data } = useSession();
  const [themeConfig, setThemeConfig] = useState<Theme | undefined>(undefined);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [showSupportMenu, setShowSupportMenu] = useState(false);
  const [showMobileSupportMenu, setShowMobileSupportMenu] = useState(false); // 모바일 서브메뉴 상태
  const { setRenewals, showConfirm, showAlert, resetNotiThen } =
    useNotifications();
  const [addOpen, setAddOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const errorRef = useRef<ErrorReceptionRef>(null);

  const supportMenuRef = useRef<HTMLDivElement | null>(null);
  const supportButtonRef = useRef<HTMLDivElement | null>(null);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showSupportMenu &&
        supportMenuRef.current &&
        !supportMenuRef.current.contains(event.target as Node) &&
        supportButtonRef.current &&
        !supportButtonRef.current.contains(event.target as Node)
      ) {
        setShowSupportMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSupportMenu]);

  //모바일일 경우 메뉴 스크롤 외 제외
  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSidebar]);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  // 모바일에서 메뉴 아이템 클릭 시 사이드바 닫기
  const handleMenuItemClick = (link: string) => {
    setActiveLink(link);
    // 모바일일 때만 사이드바 닫기
    if (window.innerWidth < 1024) {
      setShowSidebar(false);
    }
  };

  //고객지원
  const handleUserGuide = async (e: React.MouseEvent<HTMLDivElement>) => {
    try {
      e.preventDefault();

      const response = await fetch(
        "https://center-api.simg.kr/api/portal/DownLoadUserGuide",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.user),
        },
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
          `Error ${response.status}: ${response.statusText} - ${errorDetails}`,
        );
      }

      const blob = await response.blob(); // 응답 데이터를 Blob으로 변환
      const downloadUrl = window.URL.createObjectURL(blob);

      // 가상의 링크 생성 및 클릭 트리거
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "사용자메뉴얼"; // 다운로드될 파일 이름
      document.body.appendChild(a);
      a.click();
      a.remove();

      // 모바일에서는 메뉴 닫기
      if (window.innerWidth < 1024) {
        setShowSidebar(false);
      }
    } catch (error) {
      console.error("파일 다운로드 실패:", error);
      alert("파일 다운로드에 실패했습니다.");
    }
  };

  //갱신예정보험 정보
  const fetchRenewals = async (bpk: number) => {
    try {
      const response = await fetch(
        "https://center-api.simg.kr/api/portal/getPolicyRenew",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bpk }),
        },
      );

      if (response.ok) {
        const data = await response.json();

        // daysRemaining이 30 미만인 데이터 필터링
        return data.filter(
          (item: { daysRemaining: number }) => item.daysRemaining < 30,
        ); // NotificationContext에 저장
      } else {
        console.error("보험 갱신 데이터를 가져오는 데 실패했습니다.");
      }
    } catch (err) {
      console.error("API 호출 중 오류 발생:", err);
    }
  };

  //마이페이지 권한
  useEffect(() => {
    if (data && data.user) {
      const { service, authLevel, bpk } = data.user; // data.user가 존재하는지 확인
      const config = getThemeConfig(service);
      let authPage = [];
      authPage = config.menuItems.filter((item) =>
        item.visibleRoles?.includes(authLevel),
      );

      // 마이페이지 이름 추가, 권한 별 보이기
      if (Array.isArray(config.menuItems)) {
        authPage = config.menuItems.map((item) =>
          item.title === "mypage"
            ? { ...item, label: `${data.user.name}님` }
            : item,
        );
      }

      setThemeConfig({
        ...config,
        menuItems: authPage,
      });
      document.documentElement.setAttribute("data-theme", service);

      fetchRenewals(bpk).then(setRenewals);
    }
  }, [data]);

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean); // 빈 문자열 제거
    if (segments.length > 0) {
      setActiveLink(`/${segments.join("/")}`);
    }
  }, [pathname]);

  if (!themeConfig) {
    return <Loading />;
  }

  //로그아웃
  const logoutSubmit = async () => {
    // 모바일에서는 먼저 사이드바 닫기
    if (window.innerWidth < 1024) {
      setShowSidebar(false);
    }

    showConfirm("로그아웃하시겠습니까?", async () => {
      await signOutWithForm();
    });
  };

  const toggleSupportMenu = () => {
    setShowSupportMenu(!showSupportMenu);
  };

  // 모바일 고객지원 메뉴 토글
  const toggleMobileSupportMenu = () => {
    setShowMobileSupportMenu(!showMobileSupportMenu);
  };

  //오류접수 팝업
  const addConfirm = async () => {
    if (errorRef.current) {
      const isValid = await errorRef.current.validateForm();

      if (isValid) {
        const formData = errorRef.current.getFormData();
        console.log("제출오류내용", formData);
        resetNotiThen(() => {
          setAddOpen(false);
          showAlert("시스템 오류접수가 완료되었습니다.");
        });
      }
    }
  };

  const addClose = () => {
    if (errorRef.current) {
      errorRef.current.clearForm();
    }
    setAddOpen(false);
  };

  const formButtons = [
    {
      label: "확인",
      onClick: addConfirm,
      color: "main" as const,
      fill: true,
      width: 130,
      height: 40,
    },
    {
      label: "취소",
      onClick: addClose,
      color: "gray" as const,
      width: 130,
      height: 40,
    },
  ];

  return (
    <>
      {/* 모바일 상단 바 */}
      <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-main px-10 py-4 text-white lg:hidden">
        <Image src={themeConfig.logoSrc} alt="로고" width={60} height={30} />
        <Image
          src={'/images/icon/menu-icon.png'}
          alt="Menu"
          width={24}
          height={24}
          onClick={toggleSidebar}
          className="cursor-pointer"
        />
      </div>
      {/*웹 메뉴 겸 모바일 사이드 바*/}
      {showSidebar && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <div
        className={`fixed z-50 h-screen overflow-y-auto bg-main transition-transform duration-300 lg:overflow-y-hidden ${showSidebar ? "translate-x-0" : "translate-x-full"} right-0 w-full p-3.5 lg:left-0 lg:flex lg:w-[90px] lg:translate-x-0`}
      >
        <div className="mb-5 flex justify-end px-3 py-2 lg:hidden">
          <Image
            src={'/images/icon/close-white-icon.png'}
            alt="닫기"
            width={24}
            height={24}
            onClick={toggleSidebar}
            className="cursor-pointer"
          />
        </div>
        <div
          className={
            "flex h-[calc(100%-80px)] flex-col justify-between lg:h-full"
          }
        >
          <div>
            <Image
              src={themeConfig.logoSrc}
              alt="업체로고"
              width={60}
              height={35}
              className="mb-14 mt-5 hidden lg:block"
              priority={true}
            />
            {themeConfig.menuItems
              .filter((item) => item.visibleRoles.includes(data.user.authLevel)) // 권한 필터링
              .slice(0, -1) // 마이페이지 제외
              .map((item, index) => (
                <div key={index}>
                  <MenuItem
                    {...item}
                    isActive={activeLink === item.link}
                    onClick={() => handleMenuItemClick(item.link)}
                  />
                </div>
              ))}
          </div>
          <div>
            {themeConfig.menuItems.slice(-1).map((item, index) => (
              <div key={index}>
                <MenuItem
                  {...item}
                  isActive={activeLink === item.link}
                  onClick={() => handleMenuItemClick(item.link)}
                />
              </div>
            ))}
            {/* 웹에서의 고객지원 메뉴 */}
            <div className="hidden lg:block relative">
              <div
                ref={supportButtonRef}
                className={`my-5 flex cursor-pointer items-center rounded-md px-4 py-4 lg:flex-col lg:px-1 lg:py-2 ${showSupportMenu ? "bg-white bg-opacity-30" : "hover:bg-white hover:bg-opacity-30"}`}
                onClick={toggleSupportMenu}
              >
                <button className={"flex items-center lg:flex-col"}>
                  <Image
                    src={'/images/icon/support-icon.png'}
                    alt={"고객지원"}
                    height={28}
                    width={28}
                  />
                  <div className="ml-5 mt-0 text-[16px] text-white lg:ml-0 lg:mt-2 lg:text-[12px]">
                    고객지원
                  </div>
                </button>
              </div>
            </div>

            {/* 모바일에서의 고객지원 메뉴 */}
            <div className="lg:hidden">
              <div
                className={`my-5 flex cursor-pointer items-center justify-between rounded-md px-4 py-4 ${showMobileSupportMenu ? "bg-white bg-opacity-30" : "hover:bg-white hover:bg-opacity-30"}`}
                onClick={toggleMobileSupportMenu}
              >
                <div className="flex items-center">
                  <Image
                    src={'/images/icon/support-icon.png'}
                    alt={"고객지원"}
                    height={28}
                    width={28}
                  />
                  <div className="ml-5 mt-0 text-[16px] text-white">
                    고객지원
                  </div>
                </div>
                <div
                  className={`transform text-sm text-white transition-transform duration-200 ${showMobileSupportMenu ? "rotate-180" : ""}`}
                >
                  ▼
                </div>
              </div>

              {/* 모바일 서브메뉴 */}
              {showMobileSupportMenu && (
                <div className="ml-4 space-y-2">
                  <div
                    className="cursor-pointer rounded-md px-4 py-3 text-[14px] text-white hover:bg-white hover:bg-opacity-20"
                    onClick={(e) => handleUserGuide(e)}
                  >
                    사용자정의서 다운로드
                  </div>
                  {/* 추가 서브메뉴들을 여기에 추가할 수 있습니다 */}
                  {/*<div className="px-4 py-3 text-white text-[14px] cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-md"
                                     onClick={() => setAddOpen(true)}>
                                    시스템 오류접수
                                </div>*/}
                </div>
              )}
            </div>

            <form
              action={logoutSubmit}
              className={
                "my-5 flex cursor-pointer items-center rounded-md px-4 py-4 hover:bg-white hover:bg-opacity-30 lg:flex-col lg:px-1 lg:py-2"
              }
            >
              <button className={"flex w-full items-center lg:flex-col"}>
                <Image
                  src={'/images/icon/logout-icon.png'}
                  alt={"로그아웃"}
                  height={28}
                  width={28}
                />
                <div className="ml-5 mt-0 text-[16px] text-white lg:ml-0 lg:mt-2 lg:text-[12px]">
                  로그아웃
                </div>
              </button>
            </form>
            <Image
              src={'/images/logo/simg-white-logo.png'}
              alt="SIMG로고"
              width={55}
              height={55}
              className="mb-5 ml-1 mt-14"
              priority={true}
            />
            <CenterPopup
              isOpen={addOpen}
              onClose={addClose}
              title="시스템 오류접수"
              Content={() => <ErrorReception ref={errorRef} />}
              buttons={formButtons}
            />
          </div>
        </div>
      </div>
      {showSupportMenu && (
        <div
          ref={supportMenuRef}
          className={
            "absolute bottom-[230px] left-[110px] space-y-2 rounded-lg bg-white font-medium shadow-lg z-20"
          }
        >
          <div
            className={
              "w-[220px] cursor-pointer px-8 py-5 hover:bg-main-lighter"
            }
            onClick={(e) => handleUserGuide(e)}
          >
            보험약관
          </div>
          <div
            className={
              "w-[220px] cursor-pointer px-8 py-5 hover:bg-main-lighter"
            }
            onClick={(e) => handleUserGuide(e)}
          >
            상품설명서
          </div>
          <div
            className={
              "w-[220px] cursor-pointer px-8 py-5 hover:bg-main-lighter"
            }
            onClick={(e) => handleUserGuide(e)}
          >
            사용자정의서 다운로드
          </div>
          {/*<div className={'px-8 py-5 w-[220px] cursor-pointer hover:bg-main-lighter'} onClick={() => setAddOpen(true)}>시스템 오류접수</div>*/}
        </div>
      )}
    </>
  );
}
