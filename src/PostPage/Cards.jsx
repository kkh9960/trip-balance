import React from "react";
import styled from "styled-components";
import { FcLike } from "react-icons/fc";

export const Cards = () => {
  // const getProducts = () => {
  //   //q=서치퀄리 넣어줌 알아서 찾아준다
  //   let searchQuery = query.get("q") || "";
  //   dispatch(productAction.getProducts(searchQuery));        ///검색햇을경우 미리세팅 test해봐야됨

  // };

  // useEffect(() => {
  //   getProducts();
  // }, [query]);

  return (
    <Layout>
      <CardBox>
        <div>
          <ImgBox src="https://cdn.pixabay.com/photo/2016/11/21/17/44/arches-national-park-1846759__340.jpg" />
          <TextBox>
            <Title>
              개수
              <FcLike />
            </Title>

            <Name>제목</Name>
          </TextBox>
        </div>
      </CardBox>

      <Line></Line>
    </Layout>
  );
};

export default Cards;

{
  /* <InfiniteScroll
    pageStart={0}
    loadMore={loadFunc}
    hasMore={true || false}
    loader={<div className="loader" key={0}>Loading ...</div>}
>
    {items} // <-- This is the content you want to load
</InfiniteScroll> */
}

const Layout = styled.div`
  justify-content: center;

  text-align: center;
  display: flex;
  align-items: center;
  margin: 0 auto;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Line = styled.div`
  border: 1px solid #9a9797;
  width: 1333.1px;
  margin: 20.9px 110.8px 61.6px 2px;
  margin-bottom: 20px;
`;

const ImgBox = styled.img`
  background-position: center;
  background-size: cover;
  align-items: center;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;

  width: 345px;

  height: 414px;
  border-radius: 10%;
`;

const CardBox = styled.div`
  font-family: "Gowun Dodum", sans-serif;
  display: flex;
  border: none;
  margin-bottom: 30px;
  margin: 20px;
  width: 344px;

  border-radius: 10%;
  transition: 1.1s;
  :hover {
    transform: scale(1.1);
  }
`;

const TextBox = styled.div`
  width: 300px;
  overflow: hidden;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  z-index: 2;
`;

const Title = styled.div`
  font-size: 20px;
  display: block;
  text-decoration: none;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-family: "KakaoBigRegular";
  cursor: pointer;
  line-height: 23px;
  word-break: normal;
  margin-left: 30px;
  z-index: 1;
`;

const Name = styled.div`
  font-family: "KakaoBigRegular";
  font-size: 20px;
  line-height: 20px;
  margin-left: -180px;
`;