const fn = require("./fn.js");
const wordList = require("./word.json");

test("1초 후 처리. 문제에 정답을 맞췄을 경우 pass",() => {
  function callback(val) {
    expect(val).toBe('pass');
  }
  fn.timer(callback,2,true);
})
test("1초 후 처리. 1초 후 남은 시간이 1초 이상",() => {
  function callback(val) {
    expect(val).toBe('next');
  }
  fn.timer(callback,3,false);
})
test("1초 후 처리. 1초 후 남은 시간이 0초 ",() => {
  function callback(val) {
    expect(val).toBe('finish');
  }
  fn.timer(callback,1,false);
})

test("다음 단어 호출, 다음 단어 호출",() => {
  expect(fn.nextWord(wordList,0)).toEqual(wordList[1]);
  expect(fn.nextWord(wordList,1)).toEqual(wordList[2]);
  expect(fn.nextWord(wordList,2)).toEqual(wordList[3]);
  expect(fn.nextWord(wordList,wordList.length-1)).toEqual('/#/result');
})
test("다음 단어 호출, 다음 단어가 없는 경우 result 페이지 이동",() => {
  expect(fn.nextWord(wordList,wordList.length-1)).toEqual('/#/result');
})

test("평균 점수 계산",() => {
  let clearWordList = [{text:'단어1',successTime:1},
  {text:'단어1',successTime:2},
  {text:'단어1',successTime:3}];
  expect(fn.averageTime(clearWordList)).toBe('2.00');
  
  clearWordList = [{text:'단어1',successTime:2},
  {text:'단어1',successTime:5},
  {text:'단어1',successTime:3}];
  expect(fn.averageTime(clearWordList)).toBe('3.33');
  
  clearWordList = [];
  expect(fn.averageTime(clearWordList)).toBe('0.00');

  clearWordList = null;
  expect(fn.averageTime(clearWordList)).toBe('0.00');
})

