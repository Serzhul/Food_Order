### Code Address : [https://github.com/Serzhul/Food_Order](https://github.com/Serzhul/Food_Order)

## 주요 기능

- 중앙에 표시된 메뉴들의 수량을 선택해 주문하면 장바구니에 주문 내역을 담아 주문 금액을 자동으로 계산해줌
- 메뉴의 수량을 임의로 지정하여 주문할 수 있으며 장바구니에서 변경해도 실시간으로 변경 수량과 금액이 보여짐.

## 프로젝트 설명

- React의 중요한 특징인  hooks를 사용해 보고, React 프로젝트의 Life cycle을 이해하는 것을 중점으로 실습함.
- 또한 `useState`, `useEffect`, `useContext`, `useReducer` 같은 자주 사용되는 hooks의 적용을 통해 State나 Context의 개념을 이해하고 실제 구현하는데 중점을 둠.
- 메뉴 수량과 가격은 items 객체 배열로 totalAmount는 number로 default state를 설정함.
- Reducer를 구현하기 위해 크게 ADD, REMOVE 라는 action을 만들어 각각 state를 변경하는 함수를 구현함

# 주요 사용 기술 분석

[React Hooks](https://www.notion.so/React-Hooks-9636d78fb9964663bf881384f36bd0e7)

### 예시 화면

![ezgif.com-gif-maker.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8780fe75-65db-4451-b9e4-259611cdbc7e/ezgif.com-gif-maker.gif)
