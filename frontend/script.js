// 테스트 시작 버튼
const startButton = document.querySelector('.start__test-button');
//처음 시작 화면
const firstPage = document.querySelector('.start');
//주의사항 화면
const read = document.querySelector('.read');
//질문,답 화면
const questionPage = document.querySelector('.question');
// 답 선택 버튼
const questionA = questionPage.querySelector('.question__A');
const questionB = questionPage.querySelector('.question__B');
//결과 화면
const result = document.querySelector('.result');

function clickStartButton() {
  //시작 페이지 숨기기
  firstPage.style.display = 'none';
  //주의사항 페이지 나타내기
  read.style.display = '';
}

function clickReadButton() {
  //주의사항 페이지 숨기기
  read.style.display = 'none';
  //문제 페이지 나타내기
  questionPage.style.display = '';
  //
  next();
}

//버튼 클릭할 때
startButton.addEventListener('click', clickStartButton);
read.addEventListener('click', clickReadButton);
questionA.addEventListener('click', clickA);
questionB.addEventListener('click', clickB);

//질문 페이지
//위에 버튼 클릭
function clickA() {
  //질문 타입이 뭔지 알아내기
  let questionType = questionPage
    .querySelector('.question__type')
    .getAttribute('value');
  //mbti 판단하는 부분 value 값 수정
  let questionTypeValue = document
    .querySelector('.' + questionType)
    .getAttribute('value');
  questionTypeValue = parseInt(questionTypeValue) + 1;
  document
    .querySelector('.' + questionType)
    .setAttribute('value', questionTypeValue);

  next();
}

//아래 버튼 클릭
function clickB() {
  next();
}

//결과 화면 보여주기
function showResult() {
  //결과 화면 바디 100%로 바꾸기
  document.querySelector('body').style.height = '100%';
  // 결과화면 나타내기
  result.style.display = '';
  //mbti 결과
  let mbti = checkMBTI();
  console.log(mbti);
  //결과 화면
  //이미지
  result
    .querySelector('.result__character-img')
    .setAttribute('src', 'images/' + icon[mbti]['img']);
  //이름 앞에 내용
  result.querySelector('.result__character-prename').innerHTML =
    icon[mbti]['pre'];
  //조리도구이름
  result.querySelector('.result__character-name').innerHTML =
    icon[mbti]['character'];
  //mbti 성격 한줄 요약
  // result.querySelector(".result__character-explain").innerHTML =
  //   icon[mbti]["explain"];
  //최고/최악 조합 이름
  result.querySelector('.result__best-name').innerHTML = icon[mbti]['best'];
  result.querySelector('.result__worst-name').innerHTML = icon[mbti]['worst'];
  //최고/최악 조합 그림
  result
    .querySelector('.result__best-img')
    .setAttribute('src', 'images/' + icon[mbti]['best'] + '.png');
  result
    .querySelector('.result__worst-img')
    .setAttribute('src', 'images/' + icon[mbti]['worst'] + '.png');
  // mbti 성격 나열( li 생성 )
  addExplains(mbti);
  //공유버튼 나타내기
  showAddThis();
}

//공유 버튼 나타내기
function showAddThis() {
  document.querySelector('.addthis').removeAttribute('hidden');
}

//다음 페이지 넘어갈 때 문제,답 등등 수정
function next() {
  //더 이상 문제가 없을 때
  if (number == 13) {
    //문제 페이지 숨기기
    questionPage.style.display = 'none';
    // 로딩 아이콘 보이기
    document.querySelector('.loading').style.display = '';
    setTimeout(() => {
      //로딩 아이콘 숨기기
      document.querySelector('.loading').style.display = 'none';

      showResult();
      return;
    }, 3000);
  }

  //질문 페이지 - 문제,선택문항 부분
  //문제 번호
  questionPage.querySelector('.question__number').innerHTML =
    '[ ' + number + '/12 ]';
  //문제 진행도 상황(progress)
  // questionPage
  //   .querySelector(".question__progress")
  //   .setAttribute("value", eval((number / 12) * 100));
  //문제 타입 설정부분
  questionPage
    .querySelector('.question__type')
    .setAttribute('value', question[number]['type']);
  //문제 내용 바꾸기
  questionPage.querySelector('.question__title').innerHTML =
    question[number]['title'];
  // 답변 버튼 내용 바꾸기
  questionPage.querySelector('.question__A').innerHTML = question[number]['A'];
  questionPage.querySelector('.question__B').innerHTML = question[number]['B'];
  //문제 번호 증가
  number++;
}

//mbti 구하기
function checkMBTI() {
  let mbti = '';
  let types = ['EI', 'SN', 'TF', 'JP'];
  let front = ['E', 'S', 'T', 'J'];
  let last = ['I', 'N', 'F', 'P'];
  for (let i = 0; i < 4; i++) {
    if (
      parseInt(document.querySelector('.' + types[i]).getAttribute('value')) >=
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
  for (let i = 0; i < icon[mbti]['personality'].length; i++) {
    let element = icon[mbti]['personality'][i];
    let lii = document.createElement('li');
    lii.innerText = element;
    document.querySelector('.result__explains').appendChild(lii);
  }
  for (let i = 0; i < icon[mbti]['danger'].length; i++) {
    let element = icon[mbti]['danger'][i];
    let lii2 = document.createElement('li');
    lii2.innerText = element;
    document.querySelector('.result__explains').appendChild(lii2);
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
    title: '요리를 하려고 하는데 재료가 없다.. 어쩌지? 나는?',
    type: 'EI',
    A: '"날씨도 좋은데, 바람도 쐴겸 장보러 가자!"<br><u>-직접 사러 간다-<u>',
    B: '"배민 B마트로 주문하면 금방 갖다 주지롱"<br><u>-온라인으로 주문한다-<u>',
  },
  2: {
    title: '요리를 할 때, 나는?',
    type: 'EI',
    A: '"둘이서 요리하면 맛이 두배~"<br><u>-친구랑 같이 요리하는게 재밌다-<u>',
    B: '"요리는 혼자하는게 편하지!"<br><u>-같이 하는 것 보단 혼자가 좋다-<u>',
  },
  3: {
    title: '내가 요리한게 너무 맘에 들 때, 찰칵! 나는?',
    type: 'EI',
    A: '"인스타그램 각"<br><u>-남들에게 보여준다-<u>',
    B: '"내 사진첩에 저장"<br><u>-혼자 만족한다-<u>',
  },
  4: {
    title: '내가 자주쓰는 재료를 추천할 때, 나는?',
    type: 'SN',
    A: '"이 재료는 잡내도 잡아주고 음식의 맛을..."<br><u>-재료에 대한 설명을 자세히 한다-<u>',
    B: '"일단 써봐, 맛 없으면 아웃백 쏜다"<br><u>-맛있을 거라고 확신하며 소개한다-<u>',
  },
  5: {
    title: '장보고 집에서 과일을 확인해 봤더니 상했을 때, 나는?',
    type: 'SN',
    A: '"과일이 쉽게 상하긴 하지..그럴 수 있지"<br><u>-상한 부분을 피해 먹는다-<u>',
    B: '"어떻게 상한 과일을 팔 수가 있지..?"<br><u>-장본 곳으로 가서 따진다-<u>',
  },
  6: {
    title: '요리 하는데 친구가 "이렇게 하면 더 맛있어!"라고 하면 나는?',
    type: 'SN',
    A: '"그래? 나중에 그렇게 해볼게!"<br><u>-기존 실용적인 방법으로 진행한다-<u>',
    B: '"오 그렇구만? 해보자!"<br><u>-새로운 방법으로 시도해본다-<u>',
  },
  7: {
    title: '처음 보는 재료를 발견한 나는?',
    type: 'TF',
    A: '"이게 뭐지? 나중에 알아봐야겠다"<br><u>-평소 사던 재료를 산다-<u>',
    B: '"이거 넣으면 맛있을 것 같은데..?"<br><u>-새로운 시도를 해본다-<u>',
  },
  8: {
    title: '요리 할 때 지켜야 할 규칙을 정할 때, 나는?',
    type: 'TF',
    A: '"요리하기전 앞치마는 무조건 착용하기!"<br><u>-일관성 있게 규칙을 정한다-<u>',
    B: '"에이 그래도 이럴 땐 이렇게 해야지~"<br><u>-융퉁성 있게 예외를 둔다-<u>',
  },
  9: {
    title: '제일 좋아하는 재료가 냉장고에 있을 때, 나는?',
    type: 'TF',
    A: '"누가 냉장고에 이걸 넣어 놨지..?"<br><u>-써도 되는지 연락해 본다-<u>',
    B: '"이거 쓰면 완벽한데..일단 쓰자~"<br><u>-그냥 사용한다-<u>',
  },
  10: {
    title: '장을 보러온 나는?',
    type: 'JP',
    A: '"어디보자..내가 사려고 했던 재료가 어디있지?"<br><u>-미리 생각해둔 재료를 구매한다-<u>',
    B: '"뭐어!? 오늘만 1+1? 오늘은 그냥 이거 사야겠다"<br><u>-세일 중인 저렴한 재료 구매한다-<u>',
  },
  11: {
    title: '캠핑을 가게 된 상황, 요리할 재료를 챙기는 나는?',
    type: 'JP',
    A: '"양파 2개, 당근 3개, 감자 4개..."<br><u>-구체적으로 준비한다-<u>',
    B: '"양파 요정도 가져가고 어? 당근이네 이것도 가져가"<br><u>-손에 잡히는 대로 가져간다-<u>',
  },
  12: {
    title: '해야 할 일은 많은데 갑자기 요리가 하고 싶은 나는?',
    type: 'JP',
    A: '"요리하더라도 맘 편하게 요리 해야지.."<br><u>-얼른 일을 마무리 하고 요리 한다-<u>',
    B: '"에라 모르겠다~ 오늘의 요리는 로바로바~ 김치찌개!"<br><u>-우선 하고싶은거 부터 한다-<u>',
  },
};

let icon = {
  ISTJ: {
    type: 'ISTJ',
    pre: '한 치의 오차도 용서못해',
    character: '계량컵',
    explain: '과거와 현재의 기억(정보)들을 감상하고자 하는 사람들',
    img: '계량컵.png',
    best: '뒤집개',
    worst: '레시피',
    personality: [
      '전체적으로 차분하고 신중함',
      '친해지면 의외로 능글맞음',
      '겉으론 무덤덤 속으론 혼자 생각 많음',
      '진지할 때가 많다',
      '규칙 잘 지킴',
      '보수적임',
    ],
    danger: [
      '사람 많은 곳 가면 금방 방전됨',
      '같이 X 혼자 O',
      '즉흥적인거 별로 안 좋아함',
      '앞뒤 다른사람 극혐함',
      '약속 어기는 사람 진짜 극혐함',
      '현실 감각이 좋은 편',
    ],
  },
  ISTP: {
    type: 'ISTP',
    pre: '중간에 열지 말아라',
    character: '밥통',
    explain: '논리적이며 비평적인 관점을 통찰하고자 하는 사람들',
    img: '밥통.png',
    best: '가위',
    worst: '레시피',
    personality: [
      '남에게 관심 별로 없음',
      '인스타그램 비공개 계정 확률 높음',
      '선톡 잘 안함.',
      '한번 꽂히면 못 빠져나옴',
      '즉흥적, 충동적이라 내 지갑은 가벼움',
      '관심 있는거 없는거 확실함',
    ],
    danger: [
      '간섭하는거 극혐함',
      '피해 받는 거 주는 거 둘다 싫어함',
      '공감 능력 살짝 부족함',
      '결론이 있는 대화를 선호함',
      '시끄러운거 안 좋아함',
      '카톡 할 말 없으면 읽씹함',
    ],
  },
  ISFJ: {
    type: 'ISFJ',
    pre: '안다치게 내가 도와줄게',
    character: '장갑',
    explain: '과거와 현재의 기억(정보)들을 사유하고자 하는 사람들',
    img: '장갑.png',
    best: '거품기',
    worst: '레시피',
    personality: [
      '내성적이지만 상황따라 변함',
      '배려심도 깊고, 인관관계도 깊고!',
      '게으른데 완벽한거 좋아함',
      '항상 계획을 세우는 편',
      '전화오면 바로 안 받고 고민하고 받음',
      '나서는건 싫고, 관심 받는거 좋음',
    ],
    danger: [
      '쓸데없는 감정 소모 싫어함',
      '가벼운 연애 X, 찐사랑 O',
      '남 부탁 거절 못함, 나도 부탁 못함',
      '남을 위한 잔소리 많이 함',
      '할말 다 못하는 스타일 속앓이 많이함',
      '많은 관심은 오히려 불편',
    ],
  },
  ISFP: {
    type: 'ISFP',
    pre: '너 이거 찾고 있었지?',
    character: '집게',
    explain: '이상적이며 따뜻한 감성을 통찰하고자 하는 사람들',
    img: '집게.png',
    best: '가위',
    worst: '그릇',
    personality: [
      '흰둥이 아니고 순둥이',
      '감정 표현이 서툰편',
      '남들을 편안하게 해주는 능력소유',
      '할일은 최대한 미루는 편',
      '사람 만나는거 좋은데 싫음',
      '집가면 연락 두절',
    ],
    danger: [
      '개인적인 시간 좋아함',
      '감정 기복 심한편',
      "'오빠는 풍각쟁이야~' 아니고 고집쟁이",
      '웬만한 상황 피하는거 선택',
      '싸우는거보단 조용히 멀어짐',
      '팩폭에 상처 잘 받음',
    ],
  },
  INFJ: {
    type: 'INFJ',
    pre: '잡생각이 많은',
    character: '주전자',
    img: '주전자.png',
    best: '뒤집개',
    worst: '젓가락',
    personality: [
      '조용한 편임',
      '관종이지만 내성적, 평소 티가 안남',
      '감수성 충만함',
      '모든 사람에게 다정하고 친절한 금자씨',
      '마음 맞는 사람이랑만 노는거 선호',
      '싫어하는 사람 기분 안나쁘게 디스 잘함',
    ],
    danger: [
      '친하다고 선 넘으면 얄짤없음',
      '행동 전 머리속 시물레이션 100번',
      '스트레스 받으면 몸도 아픔',
      '예의 없는 사람 극혐',
      '자기랑 가치관 안 맞으면 선 그어버림',
      '내적으로 고민, 갈등 많은 편',
    ],
  },
  INFP: {
    type: 'INFP',
    pre: '떨어뜨리면 알지?',
    character: '그릇',
    explain: '이상적이며 따뜻한 감성을 축적하고자 하는 사람들',
    img: '그릇.png',
    best: '뒤집개',
    worst: '집게',
    personality: [
      '완벽하지 못하면 시작도 못하는 편',
      '앉는 건 무조건 뒷자리',
      '혼자 해결하려고 함',
      '사소한거에 감동 받고 충격 받음',
      '머리속에선 정리 완료, 말하면 절음',
      '멘탈이 약한 편',
    ],
    danger: [
      '개인적인 얘기하는거 안 좋아함',
      '외로운거 별로',
      '민폐되는 행동 극혐',
      '백번 잘해줘도 한번 반응 안하면..',
      '스트레스 받으면 안 좋은 기억남',
      '해야할 일을 자주 미룸',
    ],
  },
  INTJ: {
    type: 'INTJ',
    pre: '관계 정리는 칼 같이',
    character: '식칼',
    img: '식칼.png',
    best: '뒤집개',
    worst: '전자레인지',
    personality: [
      '친해질 때 한 세월, 관계 정리는 하루',
      '은근 허당',
      '생각보다 감수성 풍부함',
      '관심있는 건 거의 전문가 수준',
      '고집이 세다',
      '혼자 있는 거 좋아함',
    ],
    danger: [
      "대화할 때 '결론이 뭐야?' 자주 함",
      '비효율적인거 싫어함',
      '타당한 이유만 내 고집을 꺽기 가능',
      '감정표현 서툰 편',
      '고민 상담 들어주는거 힘들어 함',
      '공감능력 부족',
    ],
    like: [
      '거짓말 X 솔직함 O',
      '수다쟁이는 별로',
      '내 생활을 존중해주는 사람',
      '일을 효율적으로 처리하는 사람',
      '예의, 배려심 있으면 최고',
    ],
  },
  INTP: {
    type: 'INTP',
    pre: '아직 꺼내면 안돼!',
    character: '전자레인지',
    img: '전자레인지.png',
    best: '뒤집개',
    worst: '숟가락',
    personality: [
      '질문 다시 못하는 편',
      '대화하다 딴생각 자주 함',
      '직설적으로 말 잘 못함',
      '관심 적당히 받는거 좋아함',
      "'내일부터 시작 해야지' 달고 살음",
      '자기 주관이 뚜렷하고 호불호 확실',
    ],
    danger: [
      '선은 넘지 말지?',
      '나 무시하면 못 참아',
      '연락하는거 귀찮아 함',
      '무논리인데 목소리 퉁퉁이 제일 싫어함',
      '친한 친구여도 별일 없으면 연락 X',
      '나한테 피해주는거 싫어함',
      '집착하는거 싫어함',
    ],
  },
  ESTP: {
    type: 'ESTP',
    pre: '한판 승부사',
    character: '뒤집개',
    explain: '삶의 기쁨과 즐거움을 함께 나누고자 하는 사람들',
    img: '뒤집개.png',
    best: '장갑',
    worst: '레시피',
    personality: [
      '술자리, 내기, 노는거 환장함',
      '유혹에 약한 편',
      '즉흥적이고 자유분방 함',
      '순발력과 임기응변 능력이 뛰어남',
      '눈치 빠르고 감정 캐치 잘함',
      '타인에 대한 선입견이 없는 편',
    ],
    danger: [
      '통제당하는거 안 좋아함',
      '진지한 분위기 X 가벼운 분위기 O',
      '변덕이 심한 편',
      '집착하는거 안 좋아함',
      '스킨쉽 좋아함',
      '돌직구 스타일',
    ],
  },
  ESTJ: {
    type: 'ESTJ',
    pre: '애매한게 제일 싫어',
    character: '가위',
    explain: '완전한 질서체제 안에서 새롭게 모험하고자 하는 사람들',
    img: '가위.png',
    best: '뒤집개',
    worst: '레시피',
    personality: [
      '고집이 세고 현실적인 편',
      '호불호가 매우 확실',
      '이것저것 배우는거 좋아함',
      '상황을 객관적으로 판단 하는 편',
      '과정보단 결과중요',
      '사전 계획 철저하지만 융통성 없음',
    ],
    danger: [
      '일 잘하는 사람 좋아함',
      '위로 잘 못하는 편',
      '외로움이 뭔지 잘 모름',
      '시간 약속 어기는 사람 극혐함',
      '내 시간 방해하는거 싫어함',
      '다른 사람에게 인정받는거 좋아함',
    ],
  },
  ESFP: {
    type: 'ESFP',
    pre: '요즘엔 이게 유행이지',
    character: '거품기',
    explain: '삶의 기쁨과 즐거움을 구조화시키고자 하는 사람들',
    img: '거품기.png',
    best: '장갑',
    worst: '레시피',
    personality: [
      '사교적, 긍정적, 낙천적',
      '유행에 민감한 편',
      '우주 최강 오지라퍼',
      '충동적인 경향이 있고 성격이 급함',
      '거절 잘 못하는 편',
      '하고싶은건 다하는 성격',
    ],
    danger: [
      '유리멘탈',
      '싸우는거 싫어하는데 지는건 용납안됨',
      '잘 삐지지만 금방 풀림',
      '이론수업 최악',
      '하기 싫은건 죽어도 안함',
      '조용하고 어색한거 아찔해 함',
    ],
  },
  ENFJ: {
    type: 'ENFJ',
    pre: '나만 따라와',
    character: '레시피',
    img: '레시피.png',
    best: '뒤집개',
    worst: '장갑',
    personality: [
      '쓸데없는 걱정 많이 함',
      '사회생활 마스터',
      '공감 능력 쩌는 핵인싸',
      '상대방 기분은 잘 맞춰 줌',
      '고민상담 잘해줌',
      '남 생각을 많이 하는 편',
      '칭찬은 나를 춤추게 하지',
    ],
    danger: [
      '외로움을 많이 타는 편',
      '내 주변이 힘들면 같이 힘들어 함',
      '배려하다가 손해보는 경우가 있음',
      '버려지는 느낌 싫어 함',
      '귀가 얇은 편',
      '나를 인정해주면 감동 받음',
    ],
  },
  ENFP: {
    type: 'ENFP',
    pre: '혼자보단 둘이 좋지!',
    character: '젓가락',
    img: '젓가락.png',
    best: '장갑',
    worst: '뒤집개',
    personality: [
      '인싸중에 인싸',
      '생각이 너무 많음',
      '슬퍼도 우울해도 밝은 척 하는 편',
      '남탓보단 내 자신을 돌아 보는 편',
      '나는야 긍정왕',
      '베짱이 스타일(자유로움)',
    ],
    danger: [
      '선은 넘지 말지?',
      '놀고 들어오면 체력 방전',
      '항상 웃고 있지만 내면에 고민이 많음',
      '주변에 사람이 많음',
      '감정기복이 심한 편',
      '가만히 있는거 못함',
    ],
  },
  ESFJ: {
    type: 'ESFJ',
    pre: '내가 바로 인싸',
    character: '숟가락',
    explain: '소중한 사람들과 함께 삶을 즐기고자 하는 사람들',
    img: '숟가락.png',
    best: '집게',
    worst: '레시피',
    personality: [
      '말을 잘한다는 소리를 자주 들음',
      '훌륭한 언변덕에 대인관계가 좋음',
      '가끔 감정에 휘둘릴 때 있음',
      '귀가 얇은 편',
      '항상 긍정적이다',
      '솔로 라이프, 연애 둘다 즐기는 편',
    ],
    danger: [
      '사람을 너무 잘 믿음',
      '한 고집 함',
      '뚜껑 열리면 미친듯이 화냄',
      '나보다 남 먼저 생각함',
      '싸울 때 이성 잃으면 팩폭함',
      '내 사람 잘 챙김',
    ],
  },
  ENTP: {
    type: 'ENTP',
    pre: '내가 바로 인싸',
    character: '숟가락',
    explain: '소중한 사람들과 함께 삶을 즐기고자 하는 사람들',
    img: '숟가락.png',
    best: '장갑',
    worst: '뒤집개',
    personality: [
      '머리가 좋으며 사람 파악 잘함',
      '싸워도 금방 해결하는 편',
      '또라이 소리 자주 들음',
      '아는 것은 많지만 자세히는 모름',
      '내 사람 확실하게 구분',
      '스트레스 잘 안 받음',
    ],
    danger: [
      '감정 기복이 큰 편',
      '변덕쟁이, 고집쟁이, 존심쟁이',
      '정해진 틀이나 반복적인거 싫어함',
      '복종하는거 싫어함',
      '꼰대 보면 한숨',
      '쿨해보지만 쿨한 척',
    ],
    like: [
      '말 보단 행동으로 보여주는 사람 좋아함',
      '배울점이 있고 같이 성장 할 수 있어야 함',
      '나를 잘 챙겨주는 사람',
      '한 발자국 물러 날줄 아는 사람',
      '나한테 반응을 잘해주는 사람',
    ],
  },
  ENTJ: {
    type: 'ENTJ',
    pre: '내가 바로 인싸',
    character: '숟가락',
    explain: '소중한 사람들과 함께 삶을 즐기고자 하는 사람들',
    img: '숟가락.png',
    best: '장갑',
    worst: '뒤집개',
    personality: [
      '일 잘한다고 해주면 더 열심히 하려 함',
      '집중하는 나의 모습 Like It',
      '자신을 아끼며 성공하고 싶은 마음 큰편',
      '우선순위 부터 차근차근 처리 하는 편',
      "'하면 한다' 마인드",
      '목표를 많이 세우는 편',
    ],
    danger: [
      '노력 안하는 사람 보면 답답',
      '반복되는 실수 용납 못함',
      '비효율적인거 이해 못함',
      '승부욕이 강한편',
      '지적하는거 싫어함',
      '감성팔이 안 먹히는 스타일',
    ],
    like: [
      '말과 행동이 가벼운 사람 out',
      '호불호 확실한 편',
      '지적인 사람 좋아함',
      '미래에 대한 대화 좋아 함',
      '베짱이 보단 개미 스타일 좋아함',
    ],
  },
};
