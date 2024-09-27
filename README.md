# SIMG 업체용 CMS

###  File Structure

📁public

└──favicon.ico  //파비콘 아이콘

📁src

├── 📁@types

    └── common.d.ts //타입스크립트 타입정의

├── 📁assets

    ├── 📁fonts                         //폰트파일
    └── 📁images                        //이미지파일
        ├── 📁icon
        └── 📁logo


├── 📁components

    ├── 📁common                        //공통컴포넌트
    ├── 📁layout                        //화면 레이아웃
    └── 📁popup                         //팝업

    ├── 📁pages                               //페이지
        ├── App.tsx                         //메인페이지
        └── login.tsx                       //로그인페이지

    ├── 📁styles                              //css 스타일
        ├── common.css                      //전체 css 불러오기
        ├── globals.css                     //공통 css
        └── index.css                       //반응형, 컴포넌트스타일

    └── main.tsx                              //페이지링크설정

└── 📁config

    └── themeConfig                         //테마변경설정

index.html                                //페이지명, 기본페이지 설정

tailwind.config.js                        //프로젝트색상정의