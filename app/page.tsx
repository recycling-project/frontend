"use client"; // 기본

import { useRouter } from "next/navigation"; //useRouter가 다음 페이지로 넘어갈 수 있도록 돕는 걸로 압니다.

export default function Home() {
  const router = useRouter(); //3번 문항의 router와 세트. 둘 중 하나만 있으면 작동 안 됨.

//router.push('/이름') 이름과 동일한 url으로 이동시킵니다. 폴더 메뉴로 간 게 아니라 '메뉴'라는 파일명과 동일한 url로 이동하게 된 것. 
// 그러니까 메뉴 파일이 여러개면 꼬여서 오류날 수 있으니 잘 나눠야 함. 
// 요약 : 루터 푸쉬 괄호 안에 menu를 적었고 파일구조중에서 app/menu/page.jsx가 있으면 그 페이지가 렌더링됨
  const goToMenu = () => {
    router.push("/menu");
  };
//<br/>은 엔터 역할을 합니다.
// oneClick={goToMenu}> -> oneClick이 부여된 걸 누르면(아래와 같은 경우에는 화면 그 자체)goTomenu 함수를 실행해서
//router.push()의 ()안에 있는 Url으로 이동하는 것. 이 코드일 경우 menu와 연결되어서 menu페이지로 이동.
  return (
    <div className="start-screen" onClick={goToMenu}> 
      <div className="start-text">
        완벽한 분리수거가 깨끗한<br />세상을 만듭니다. 
      </div>
      <div className="start-sub">
        화면을 터치하여<br />분리수거 시작
      </div>
    </div>
  );
}
