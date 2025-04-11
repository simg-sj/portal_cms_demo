import React from "react";
import cls from "classnames";
import Link from "next/link";

interface Props {
    range?: number; // 한 번에 표시할 페이지 갯수
    maxNumber: number; // 전체 페이지 수
    currentPage: number; // 현재 활성화된 페이지 (부모에서 관리)
    numberParameter?: string; // 페이지 번호 쿼리 파라미터 이름
    onChange: (page: number) => void; // 페이지 변경 핸들러
}

function Pagination({
                        range = 5,
                        maxNumber,
                        currentPage,
                        numberParameter = "pageNumber",
                        onChange
                    }: Props) {
    const startNum = currentPage - ((currentPage - 1) % range);

    // URL 생성 함수
    function combineUrl(num: number) {
        return `?${numberParameter}=${num}`;
    }

    // 페이지 버튼 생성 함수
    function numbers() {
        const jsx = [];
        for (let i = 0; startNum + i <= maxNumber && i < range; i++) {
            const num = startNum + i;
            jsx.push(
                <li key={num}>
                    <Link
                        href={combineUrl(num)}
                        className={cls({ selected: currentPage === num })}
                        onClick={(e) => {
                            e.preventDefault();
                            onChange(num - 1); // 페이지 번호 변경 핸들러 호출
                        }}
                    >
                        {num}
                    </Link>
                </li>
            );
        }
        return jsx;
    }

    return (
        <div className="pagenumBox">
            <ul className="page_num">
                {/* 이전 페이지 그룹 */}
                {currentPage !== 1 && (
                    <>
                        <li className="first">
                            <Link
                                href={combineUrl(1)}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onChange(0); // 첫 번째 페이지
                                }}
                            >
                                &lt;&lt;
                            </Link>
                        </li>
                        <li className="prev">
                            <Link
                                href={combineUrl(
                                    currentPage - range < 1 ? 1 : currentPage - range
                                )}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onChange(
                                        currentPage - range < 1
                                            ? 0
                                            : currentPage - range - 1
                                    );
                                }}
                            >
                                &lt;
                            </Link>
                        </li>
                    </>
                )}

                {/* 페이지 번호 */}
                {numbers()}

                {/* 다음 페이지 그룹 */}
                {currentPage !== maxNumber && (
                    <>
                        <li className="next">
                            <Link
                                href={combineUrl(
                                    currentPage + range > maxNumber
                                        ? maxNumber
                                        : currentPage + range
                                )}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onChange(
                                        currentPage + range > maxNumber
                                            ? maxNumber - 1
                                            : currentPage + range - 1
                                    );
                                }}
                            >
                                &gt;
                            </Link>
                        </li>
                        <li className="last">
                            <Link
                                href={combineUrl(maxNumber)}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onChange(maxNumber - 1); // 마지막 페이지
                                }}
                            >
                                &gt;&gt;
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Pagination;