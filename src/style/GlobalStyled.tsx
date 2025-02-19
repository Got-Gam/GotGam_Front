import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalFont = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Nanum+Brush+Script&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap');
  
.title-font {
  font-family: "Jua", serif;
  font-weight: 400;
  font-style: normal;
}
.content-font1{
  font-family: "Nanum Brush Script", serif;
  font-weight: 400; 
  font-style: normal;
}
.content-font2{
  font-family: "Gothic A1", serif;
  font-weight: 400;
  font-style: normal;
}
`;

export const HeaderSt = styled.div`
  position: relative;
  height: 100px;
  background-color: aliceblue;
  display: flex;
  align-items: center;
  padding: 0 10%;
  justify-content: space-between;
  .logo {
    border: 1px solid black;
    height: 80px;
    width: 120px;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  .search {
    display: flex;
    align-items: center;
    position: relative;

    input {
      width: 500px;
      padding: 8px 35px 8px 10px;
      border: 1px solid #ccc;
      border-radius: 50px;
      font-size: 14px;
      outline: none;
    }

    .search-icon {
      position: absolute;
      right: 10px;
      font-size: 16px;
      color: #888;
      cursor: pointer;
    }
  }

  .usericon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid black;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const NavSt = styled.div`
  height: 50px;
  background-color: antiquewhite;
`;

export const FooterSt = styled.div`
  height: 150px;
  width: 100%;
  background-color: lightgray;
  position: static;
  bottom: 0;
`;

export const Body = styled.div`
  height: 800px;
`;
