// 테스트 시작 버튼
const startButton = document.querySelector(".start__test-button");
//처음 시작 화면
const firstPage = document.querySelector(".start");
//주의사항 화면
const read = document.querySelector(".read");
//질문,답 화면
const questionPage = document.querySelector(".question");
// 답 선택 버튼
const questionA = questionPage.querySelector(".question__A");
const questionB = questionPage.querySelector(".question__B");
//결과 화면
const result = document.querySelector(".result");

function clickStartButton() {
  //시작 페이지 숨기기
  firstPage.style.display = "none";
  //주의사항 페이지 나타내기
  read.style.display = "";
}

function clickReadButton() {
  //주의사항 페이지 숨기기
  read.style.display = "none";
  //문제 페이지 나타내기
  questionPage.style.display = "";
  //
  next();
}

//버튼 클릭할 때
startButton.addEventListener("click", clickStartButton);
read.addEventListener("click", clickReadButton);
questionA.addEventListener("click", clickA);
questionB.addEventListener("click", clickB);

//질문 페이지
//위에 버튼 클릭
function clickA() {
  //질문 타입이 뭔지 알아내기
  let questionType = questionPage
    .querySelector(".question__type")
    .getAttribute("value");
  //mbti 판단하는 부분 value 값 수정
  let questionTypeValue = document
    .querySelector("." + questionType)
    .getAttribute("value");
  questionTypeValue = parseInt(questionTypeValue) + 1;
  document
    .querySelector("." + questionType)
    .setAttribute("value", questionTypeValue);

  next();
}

//아래 버튼 클릭
function clickB() {
  next();
}

//결과 화면 보여주기
function showResult() {
  //결과 화면 바디 100%로 바꾸기
  document.querySelector("body").style.height = "100%";
  // 결과화면 나타내기
  result.style.display = "";
  //mbti 결과
  let mbti = checkMBTI();
  console.log(mbti);
  //결과 화면
  //이미지
  result
    .querySelector(".result__character-img")
    .setAttribute("src", icon[mbti]["img"]);
  //이름 앞에 내용
  result.querySelector(".result__character-prename").innerHTML =
    icon[mbti]["pre"];
  //조리도구이름
  result.querySelector(".result__character-name").innerHTML =
    icon[mbti]["character"];
  //mbti 성격 한줄 요약
  // result.querySelector(".result__character-explain").innerHTML =
  //   icon[mbti]["explain"];
  //최고/최악 조합 이름
  result.querySelector(".result__best-name").innerHTML = icon[mbti]["best"];
  result.querySelector(".result__worst-name").innerHTML = icon[mbti]["worst"];
  //최고/최악 조합 그림
  result
    .querySelector(".result__best-img")
    .setAttribute("src", icon[mbti]["best"] + ".png");
  result
    .querySelector(".result__worst-img")
    .setAttribute("src", icon[mbti]["worst"] + ".png");
  // mbti 성격 나열( li 생성 )
  addExplains(mbti);
  //공유버튼 나타내기
  showAddThis();
}

//공유 버튼 나타내기
function showAddThis() {
  document.querySelector(".addthis").removeAttribute("hidden");
}

//다음 페이지 넘어갈 때 문제,답 등등 수정
function next() {
  //더 이상 문제가 없을 때
  if (number == 13) {
    //문제 페이지 숨기기
    questionPage.style.display = "none";
    showResult();
    return;
  }

  //질문 페이지 - 문제,선택문항 부분
  //문제 번호
  questionPage.querySelector(".question__number").innerHTML =
    "[ " + number + "/12 ]";
  //문제 타입 설정부분
  questionPage
    .querySelector(".question__type")
    .setAttribute("value", question[number]["type"]);
  //문제 내용 바꾸기
  questionPage.querySelector(".question__title").innerHTML =
    question[number]["title"];
  // 답변 버튼 내용 바꾸기
  questionPage.querySelector(".question__A").innerHTML = question[number]["A"];
  questionPage.querySelector(".question__B").innerHTML = question[number]["B"];
  //문제 번호 증가
  number++;
}

//mbti 구하기
function checkMBTI() {
  let mbti = "";
  let types = ["EI", "SN", "TF", "JP"];
  let front = ["E", "S", "T", "J"];
  let last = ["I", "N", "F", "P"];
  for (let i = 0; i < 4; i++) {
    if (
      parseInt(document.querySelector("." + types[i]).getAttribute("value")) >=
      2
    ) {
      mbti += front[i];
    } else {
      mbti += last[i];
    }
  }
  return mbti;
}

//mbti 성격 list 생성
function addExplains(mbti) {
  for (let i = 0; i < icon[mbti]["personality"].length; i++) {
    let element = icon[mbti]["personality"][i];
    let lii = document.createElement("li");
    lii.innerText = element;
    document.querySelector(".result__explains").appendChild(lii);
  }
  for (let i = 0; i < icon[mbti]["danger"].length; i++) {
    let element = icon[mbti]["danger"][i];
    let lii2 = document.createElement("li");
    lii2.innerText = element;
    document.querySelector(".result__explains").appendChild(lii2);
  }
}

//문제 시작 번호
let number = 1;

//질문페이지 - 문제내용, 선택문항
const question = {
  // { type: "EI", A: "E", B: "I" },
  // { type: "SN", A: "S", B: "N" }
  // { type: "TF", A: "T", B: "F" }
  // { type: "JP", A: "J", B: "P" }
  1: {
    title: "요리를 하려고 하는데 재료가 없다.. 어쩌지? 나는?",
    type: "EI",
    A: '"날씨도 좋은데, 바람도 쐴겸 장보러 가자!"<br>-직접 사러 간다-',
    B: '"배민 B마트로 주문하면 금방 갖다 주지롱"<br>-온라인으로 주문한다-',
  },
  2: {
    title: "요리를 할 때, 나는?",
    type: "EI",
    A: '"둘이서 요리하면 맛이 두배~"<br>-친구랑 같이 요리하는게 재밌다-',
    B: '"요리는 혼자하는게 편하지!"<br>-같이 하는 것 보단 혼자가 좋다-',
  },
  3: {
    title: "내가 요리한게 너무 맘에 들 때, 찰칵! 나는?",
    type: "EI",
    A: '"인스타그램 각"<br>-남들에게 보여준다-',
    B: '"내 사진첩에 저장"<br>-혼자 만족한다-',
  },
  4: {
    title: "내가 자주쓰는 재료를 추천할 때, 나는?",
    type: "SN",
    A: '"이 재료는 잡내도 잡아주고 음식의 맛을..."<br>-재료에 대한 설명을 자세히 한다-',
    B: '"일단 써봐, 맛 없으면 아웃백 쏜다"<br>-맛있을 거라고 확신하며 소개한다-',
  },
  5: {
    title: "장보고 집에서 과일을 확인해 봤더니 상했을 때, 나는?",
    type: "SN",
    A: '"과일이 쉽게 상하긴 하지..그럴 수 있지"<br>-상한 부분을 피해 먹는다-',
    B: '"어떻게 상한 과일을 팔 수가 있지..?"<br>-장본 곳으로 가서 따진다-',
  },
  6: {
    title: '요리 하는데 친구가 "이렇게 하면 더 맛있어!"라고 하면 나는?',
    type: "SN",
    A: '"그래? 나중에 그렇게 해볼게!"<br>-기존 실용적인 방법으로 진행한다-',
    B: '"오 그렇구만? 해보자!"<br>-새로운 방법으로 시도해본다-',
  },
  7: {
    title: "처음 보는 재료를 발견한 나는?",
    type: "TF",
    A: '"이게 뭐지? 나중에 알아봐야겠다"<br>-평소 사던 재료를 산다-',
    B: '"이거 넣으면 맛있을 것 같은데..?"<br>-새로운 시도를 해본다-',
  },
  8: {
    title: "요리 할 때 지켜야 할 규칙을 정할 때, 나는?",
    type: "TF",
    A: '"요리하기전 앞치마는 무조건 착용하기!"<br>-일관성 있게 규칙을 정한다-',
    B: '"에이 그래도 이럴 땐 이렇게 해야지~"<br>-융퉁성 있게 예외를 둔다-',
  },
  9: {
    title: "제일 좋아하는 재료가 냉장고에 있을 때, 나는?",
    type: "TF",
    A: '"누가 냉장고에 이걸 넣어 놨지..?"<br>-써도 되는지 연락해 본다-',
    B: '"이거 쓰면 완벽한데..일단 쓰자~"<br>-그냥 사용한다-',
  },
  10: {
    title: "장을 보러온 나는?",
    type: "JP",
    A: '"어디보자..내가 사려고 했던 재료가 어디있지?"<br>-미리 생각해둔 재료를 구매한다-',
    B: '"뭐어!? 오늘만 1+1? 오늘은 그냥 이거 사야겠다"<br>-세일 중인 저렴한 재료 구매한다-',
  },
  11: {
    title: "캠핑을 가게 된 상황, 요리할 재료를 챙기는 나는?",
    type: "JP",
    A: '"양파 2개, 당근 3개, 감자 4개..."<br>-구체적으로 준비한다-',
    B: '"양파 요정도 가져가고 어? 당근이네 이것도 가져가"<br>-손에 잡히는 대로 가져간다-',
  },
  12: {
    title: "해야 할 일은 많은데 갑자기 요리가 하고 싶은 나는?",
    type: "JP",
    A: '"요리하더라도 맘 편하게 요리 해야지.."<br>-얼른 일을 마무리 하고 요리 한다-',
    B: '"에라 모르겠다~ 오늘의 요리는 로바로바~ 김치찌개!"<br>-우선 하고싶은거 부터 한다-',
  },
};

let icon = {
  ISTJ: {
    type: "ISTJ",
    pre: "한 치의 오차도 용서못해",
    character: "계량컵",
    explain: "과거와 현재의 기억(정보)들을 감상하고자 하는 사람들",
    img: "계량컵.png",
    best: "뒤집개",
    worst: "레시피",
    personality: [
      "전체적으로 차분하고 신중함",
      "친해지면 의외로 능글맞음",
      "겉으론 무덤덤..속으론 혼자 생각 많음",
      "진지할 때가 많다",
      "규칙 잘 지킴",
      "보수적임",
    ],
    danger: [
      "사람 많은 곳 가면 금방 방전됨",
      "말 많은 사람이랑 잘 안 맞음(싫어하는 건 아님)",
      "즉흥적인거 별로 안 좋아함",
      "앞뒤 다른사람 극혐함",
      "약속 어기는 사람 진짜 극혐함",
      "내 얘기하는거 남 얘기 들어주는거 둘다 힘들어함",
    ],
  },
  ISTP: {
    type: "ISTP",
    pre: "@@",
    character: "@@ ",
    explain: "논리적이며 비평적인 관점을 통찰하고자 하는 사람들",
    img: "@@.png",
    best: "가위",
    worst: "레시피",
    personality: [
      "남에게 관심 별로 없음",
      "인스타그램 비공개 계정 확률 높음",
      "선톡 잘 안함.",
      "한번 꽂히면 못 빠져나옴",
      "즉흥적, 충동적이라 내 지갑은 가벼움",
      "관심 있는거 없는거 확실함",
    ],
    danger: [
      "간섭하는거 극혐함",
      "피해 받는 것, 피해 주는 것 둘다 싫어함",
      "공감 능력 살짝 부족함",
      "결론이 있는 대화를 선호함",
      "시끄러운거 안 좋아함",
      "",
    ],
  },
  ISFJ: {
    type: "ISFJ",
    pre: "안다치게 내가 도와줄게",
    character: "장갑",
    explain: "과거와 현재의 기억(정보)들을 사유하고자 하는 사람들",
    img: "장갑.png",
    best: "거품기",
    worst: "레시피",
    personality: [
      "내성적이지만 상황따라 변함",
      "배려심도 깊고, 인관관계도 깊고!",
      "게으른데 완벽한거 좋아함",
      "항상 계획을 세우는 편",
      "전화오면 바로 안 받고 고민하고 받음",
      "나서는거 싫어하는데 관심 받는건 좋아함",
    ],
    danger: [
      "쓸데없는 감정 소모 싫어함",
      "가벼운 연애 X, 찐사랑 O",
      "남 부탁 거절 못함, 나도 부탁 못함",
      "남을 위한 잔소리 많이 함",
      "할말 다 못하는 스타일 속앓이 많이함",
      "많은 관심은 오히려 불편",
    ],
  },
  ISFP: {
    type: "ISFP",
    pre: "너 이거 찾고 있었지?",
    character: "집게",
    explain: "이상적이며 따뜻한 감성을 통찰하고자 하는 사람들",
    img: "집게.png",
    best: "가위",
    worst: "그릇",
    personality: [
      "흰둥이 아니고 순둥이",
      "감정 표현이 서툰편",
      "남들을 편안하게 해주는 능력소유",
      "할일은 최대한 미루는 편",
      "사람 만나는거 좋은데 싫음",
      "집가면 연락 두절",
    ],
    danger: [
      "개인적인 시간 좋아함",
      "감정 기복 심한편",
      "'오빠는 풍각쟁이야~' 아니고 고집쟁이",
      "웬만한 상황 피하는거 선택",
      "싸우는거보단 조용히 멀어짐",
      "팩폭에 상처 잘 받음",
    ],
  },
  INFJ: {
    type: "INFJ",
    pre: "잡생각이 많은",
    character: "주전자",
    explain: "이면의 본질적 통찰을 사유하고자 하는 사람들",
    img: "주전자.png",
    best: "ENTP",
    worst: "젓가락",
    personality: [
      "조용한 편임",
      "관종이지만 내성적이라 평소인 티가 안남",
      "감수성 충만함",
      "모든 사람에게 다정하고 친절한 금자씨",
      "마음 맞는 사람이랑만 노는거 선호",
      "남들보다 성숙하다고 생각함",
    ],
    danger: [
      "친하다고 선 넘으면 얄짤없음",
      "행동하기 전 머리속으로 시물레이션 100번 실행",
      "스트레스 받으면 몸도 아픔",
      "예의 없는 사람 극혐",
      "자기랑 가치관 안 맞으면 선 그어버림",
      "",
    ],
  },
  INFP: {
    type: "INFP",
    pre: "떨어뜨리면 알지?",
    character: "그릇",
    explain: "이상적이며 따뜻한 감성을 축적하고자 하는 사람들",
    img: "그릇.png",
    best: "ENTJ",
    worst: "집게",
    personality: [
      "완벽하지 못하면 시작도 못하는 편",
      "앉는 건 무조건 뒷자리",
      "혼자 해결하려고 함",
      "사소한거에 감동 받고 충격 받음",
      "머리속에선 정리 완료, 말하면 더듬더듬",
      "멘탈이 약한 편",
    ],
    danger: [
      "개인적인 얘기하는거 안 좋아함",
      "외로운거 별로",
      "민폐되는 행동 극혐",
      "백번 잘해줘도 한번 반응 안하면 끄응..",
      "스트레스 받으면 안 좋은 기억들 자동재생",
      "",
    ],
  },
  INTJ: {
    type: "INTJ",
    pre: "관계 정리는 칼 같이",
    character: "식칼",
    explain: "이면의 본질적 통찰을 감상하고자 하는 사람들",
    img: "식칼.png",
    best: "젓가락",
    worst: "없음",
    personality: [
      "친해질 때는 한세월, 관계 정리는 하루",
      "남 눈치 잘 안 보는 편",
      "여러명보단 혼자가 편함",
      "완전한 개인주의",
      "완벽을 추구하는 스타일",
      "사실과 원리원칙 중요시하고, 돈관리 잘함",
    ],
    danger: [
      "단체활동은 별로",
      "효울성 잘 따짐",
      "타당한 이유만이 내 고집을 꺽을 수 있음",
      "감정에 휘둘리는거 안 좋아함",
      "나한테 고민상담 하면 겉으로 관심있는 척",
      "공감능력 부족",
    ],
  },
  INTP: {
    type: "INTP",
    pre: "아직 꺼내면 안돼!",
    character: "전자레인지",
    explain: "논리적이며 비평적인 관점을 축적하고자 하는 사람들",
    img: "전자레인지.png",
    best: "ENTJ",
    worst: "없음",
    personality: [
      "중요한거 아니면 금방 잊어버림",
      "멘탈이 강함",
      "책 좋아하는데 읽기 귀찮아함",
      "스스로 아싸가 되려함",
      "낯가림이 심한편",
      "자기 주관이 뚜렷하고 호불호 확실",
    ],
    danger: [
      "남한테 관심 별로 없음",
      "공감 능력 부족",
      "가벼운 대화내용 X",
      "무논리인데 목소리 퉁퉁이 제일 싫어함",
      "친한 친구여도 별일 없으면 연락 잘 안함",
      "",
    ],
  },
  ESTP: {
    type: "ESTP",
    pre: "한판 승부사",
    character: "뒤집개",
    explain: "삶의 기쁨과 즐거움을 함께 나누고자 하는 사람들",
    img: "뒤집개.png",
    best: "장갑",
    worst: "레시피",
    personality: [
      "술자리, 내기, 노는거 환장함",
      "유혹에 약한 편",
      "즉흥적이고 자유분방 함",
      "순발력과 임기응변 능력이 뛰어남",
      "눈치 빠르고 감정 캐치 잘함",
      "타인에 대한 선입견이 없는 편",
    ],
    danger: [
      "통제당하는거 안 좋아함",
      "진지한 분위기 보단 가벼운 분위기 선호",
      "변덕이 심한 편",
      "집착하는거 안 좋아함",
      "스킨쉽 좋아함",
      "",
    ],
  },
  ESTJ: {
    type: "ESTJ",
    pre: "애매한게 제일 싫어",
    character: "가위",
    explain: "완전한 질서체제 안에서 새롭게 모험하고자 하는 사람들",
    img: "가위.png",
    best: "ISTP",
    worst: "레시피",
    personality: [
      "고집이 세고 현실적인 편",
      "호불호가 매우 확실",
      "이것저것 배우는거 좋아함",
      "상황 분석 후 누가 잘못햇는지 객관적 판단함",
      "과정보단 결과중요",
      "사전 계획 철저하지만 융통성 없음",
    ],
    danger: [
      "일 잘하는 사람 좋아함",
      "위로 잘 못하는 편",
      "외로움이 뭔지 잘 모름",
      "시간 약속 어기는 사람 극혐함",
      "내 시간 방해하는거 싫어함",
      "일 못하는 사람 보면 답답해서 잔소리 많이 함",
    ],
  },
  ESFP: {
    type: "ESFP",
    pre: "언제까지 그럴거야! 요즘엔 이거지!",
    character: "거품기",
    explain: "삶의 기쁨과 즐거움을 구조화시키고자 하는 사람들",
    img: "거품기.png",
    best: "장갑",
    worst: "레시피",
    personality: [
      "사교적, 긍정적, 낙천적",
      "유행에 민감한 편",
      "우주 최강 오지라퍼",
      "충동적인 경향이 있고 성격이 급함",
      "겉으로 순종적인 척, 하지만 내가 원하는대로 바꿔놓음",
      "하고싶은건 다하는 성격",
    ],
    danger: [
      "유리멘탈",
      "싸우는거 싫어하는데 지는건 용납안됨",
      "잘 삐지지만 금방 풀림",
      "이론수업 최악",
      "하기 싫은건 죽어도 안함",
      "조용하고 어색한거 아찔해 함",
    ],
  },
  ENFJ: {
    type: "ESFJ",
    pre: "나만 따라와",
    character: "레시피",
    explain: "소중한 사람들과 함께 새롭게 모험하고자 하는 사람들",
    img: "레시피.png",
    best: "그릇",
    worst: "가위",
    personality: [
      "쓸데없는 걱정 많이 함",
      "사회생활 마스터",
      "공감 능력 쩌는 핵인싸",
      "정답은 못 맞춰도 상대방 기분은 잘 맞춰줌",
      "고민상담 잘해줌",
      "하루에 한번 '그럴 수 있지'라고 함",
    ],
    danger: [
      "감정 기복이 심함",
      "내 주변이 힘들면 나도 같이 힘들어 함",
      "티 내지 않고 묵묵한 스타일",
      "가끔 공감이 안 가도 공감 가는 척",
      "",
      "",
    ],
  },
  ENFP: {
    type: "ENFP",
    pre: "혼자보단 둘이 좋지!",
    character: "젓가락",
    explain: "풍부한 상상력과 아이디어를 구조화시키고자 하는 사람들",
    img: "젓가락.png",
    best: "주전자",
    worst: "가위",
    personality: [
      "싫고 좋은 게 감정에서 드러남",
      "아부 잘 못함",
      "일 벌리고 마무리 잘 못함",
      "누가 나서지 않으면 답답해서 나서는 스타일",
      "눈치 빠른데 하기 싫으면 모르는 척",
      "매력이 많은 편",
    ],
    danger: [
      "소외되는거 싫어함",
      "겉보기에 인싸",
      "항상 웃고 있지만 내면에 고민이 많음",
      "가만히 있는거 못함",
      "나를 위해 쓰는건 아끼지 않음",
      "",
    ],
  },
  ESFJ: {
    type: "ESFJ",
    pre: "@@",
    character: "@@",
    explain: "소중한 사람들과 함께 삶을 즐기고자 하는 사람들",
    img: "@@.png",
    best: "집게",
    worst: "레시피",
    personality: [
      "말을 잘한다는 소리를 자주 들음",
      "훌륭한 언변덕에 대인관계가 좋음",
      "가끔 감정에 휘둘려 객관적 판단을 잘 못함",
      "귀가 얇은 편",
      "항상 긍정적이다",
      "솔로 라이프, 연애 둘다 즐기는 편",
    ],
    danger: [
      "사람을 너무 잘 믿음",
      "한 고집 함",
      "뚜껑 열리면 미친듯이 화냄",
      "나보다 남 먼저 생각함",
      "싸울 때 이성 잃으면 팩폭함",
      "",
    ],
  },
  ENTP: {
    type: "ENTP",
    pre: "@@",
    character: "@@",
    explain: "풍부한 상상력과 아이디어를 함께 나누고자 하는 사람들",
    img: "@@.png",
    best: "주전자",
    worst: "없음",
    personality: [
      "혼자서 돌아다니는거 좋아함",
      "나한테 잘해주면 2배로 잘해줌",
      "좋고 싫음이 명확함",
      "자기합리화 잘함",
      "하고싶은대로 살아서 스트레스 잘 안 받음",
      "다재다능한 편",
    ],
    danger: [
      "감정 기복이 심함",
      "변덕쟁이, 고집쟁이, 존심쟁이",
      "정해진 틀이나 반복적인거 싫어함",
      "복종하는거 절대 못함",
      "꼰대 보면 극혐함",
      "한번 꽂히면 못 빠져나옴",
    ],
  },
  ENTJ: {
    type: "ENTJ",
    pre: "@@",
    character: "@@",
    explain: "완전한 질서체제 안에서 삶을 즐기고자 하는 사람들",
    img: "@@.png",
    best: "주전자",
    worst: "없음",
    personality: [
      "끈기와 책임감이 뛰어남",
      "피해주는거, 피해 받는거 싫어함",
      "웬만해서 혼자 해결하려 함",
      "고민상담하면 해결책 제시함",
      "머리가 똑똑한 편이다",
      "매사에 자신감이 넘치고 목표가 확실함",
    ],
    danger: [
      "나보다 안 똑똑하면 살짝 무시하는 경향있음",
      "반복되는 실수 용납 못함",
      "비효율적인거 이해 못함",
      "승부욕이 강한편",
      "지적하는거 싫어함",
      "",
    ],
  },
};
