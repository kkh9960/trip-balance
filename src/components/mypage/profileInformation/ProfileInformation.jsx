import React, { useState, useRef } from "react";
import * as t from "./ProfileinformationStyle";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __putMyInformation } from "../../../redux/modules/MyPageSlice";
import profile from "../../../img/profile.jpg";
import AWS from "aws-sdk";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useInput from "../../../hooks/useInput";
import instance from "../../../lib/instance";
import InformationChart from "./InformationChart";
import IconFacebooke from "../../../img/Facebook.png";
import IconInstagram from "../../../img/Instagram.png";
import IconYoutube from "../../../img/Youtube.png";

export default function ProfileInformation({}) {
  const id = useParams();
  const dispatch = useDispatch();
  const [profileMode, setProfileMode] = useState(true);
  const [profileImg, setProfileImg] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userSns, setUserSns] = useState();
  const [userSelf, setUserSelf, introduceonChange] = useInput();
  const [nickname, setNickname, nicknameChange] = useInput();
  const profileImgInput = useRef(null);
  const [instaInput, setInstaInput] = useState(true);
  const [faceInput, setFaceInput] = useState(true);
  const [youInput, setYouInput] = useState(true);
  const [topNickname, setTopNickname] = useState();

  useEffect(() => {
    async function fetchData() {
      const result = await instance.get("/tb/mypage/info");
      setProfileImg(result.data.data.profileImg);
      if (result.data.data.profileImg === null) {
        setProfileImg(profile);
      } else {
        setProfileImg(result.data.data.profileImg);
      }
      setNickname(result.data.data.nickName);
      setUserEmail(result.data.data.email);
      setUserSelf(result.data.data.self);
      setUserSns(result.data.data.sns);
      setTopNickname(result.data.data.nickname);
    }
    fetchData();
  }, [nickname]);
  //이미지업로드
  const S3URL = "https://react-image-seongwoo.s3.ap-northeast-2.amazonaws.com";
  const onFileUpload = async (e) => {
    const ACCESS_KEY = "AKIAXQKS7DPZ7R5C4WNA";
    const SECRET_ACCESS_KEY = "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";
    const REGION = "ap-northeast-2";
    const S3_BUCKET = "react-image-seongwoo";

    // AWS ACCESS KEY를 세팅합니다.
    AWS.config.update({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    });

    // 버킷에 맞는 이름과 리전을 설정합니다.
    const myBucket = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });
    const file = e.target.files[0];
    const fileName = file.name.replaceAll(" ", "");
    // 파일과 파일이름을 넘겨주면 됩니다.
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: fileName,
    };

    if (profileImg) {
      await myBucket
        .putObject(params)
        .on("httpUploadProgress", (Progress, Response) => {
          const imgURL = S3URL + Response.request.httpRequest.path;
          setProfileImg(imgURL);
        })
        .send((err) => {});
    } else {
    }
  };
  const changeprofile = () => {
    setProfileMode(false);
  };
  const saveprofile = () => {
    dispatch(
      __putMyInformation({
        nickName: nickname,
        self: userSelf,
        profileImg: profileImg,
      })
    );
    setNickname(nickname);
    setProfileImg(profileImg);
    setUserSelf(userSelf);
    setProfileMode(true);
  };

  const cancelprofile = () => {
    setProfileMode(true); //취소하면 그전 데이터 가져오기 작업할것
    setNickname(nickname);
    setProfileImg(profileImg);
    setUserSelf(userSelf);
  };
  // const instalink = () => {
  //   instaInput ? setInstaInput(false) : setInstaInput(true);
  // };
  // const facelink = () => {
  //   faceInput ? setFaceInput(false) : setFaceInput(true);
  // };
  // const youlink = () => {
  //   youInput ? setYouInput(false) : setYouInput(true);
  // };
  return (
    <>
      <t.userName>
        {profileMode ? nickname : topNickname}
        <span>님의 마이페이지</span>
      </t.userName>
      <t.UserInfor>
        {profileMode ? (
          <t.myInformation>
            <t.ProfileImgBox src={profileImg} />
            <t.profileinfo>
              <t.nickName>{nickname}님</t.nickName>
              <t.email style={{ color: "#848484" }}>{userEmail}</t.email>
              <t.introduce>
                <t.textName>자기소개</t.textName>
                <t.selfBox value={userSelf}></t.selfBox>
              </t.introduce>
              <t.snsLink>
                <t.textName>링크걸기</t.textName>
                {/* <t.snsIcon src={IconInstagram} />
                <t.snsIcon src={IconFacebooke} />
                <t.snsIcon src={IconYoutube} /> */}
              </t.snsLink>
              <t.buttonGroup>
                <button onClick={changeprofile}>프로필변경</button>
              </t.buttonGroup>
            </t.profileinfo>
          </t.myInformation>
        ) : (
          <t.myInformation>
            <t.ProfileImgBox
              src={profileImg}
              style={{
                margin: "20px",
                cursor: "pointer",
              }}
              onClick={() => {
                profileImgInput.current.click();
              }}
            />
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/jpg,impge/png,image/jpeg"
              name="profile_img"
              onChange={onFileUpload}
              ref={profileImgInput}
            />
            <t.profileinfo>
              <t.nickName>
                <input
                  type="text"
                  onChange={nicknameChange}
                  defaultValue={nickname || ""}
                  maxLength={10}
                />
              </t.nickName>
              <t.email>{userEmail}</t.email>
              <t.introduce>
                <t.textName>자기소개</t.textName>
                <t.selfBox
                  onChange={introduceonChange}
                  defaultValue={userSelf || ""}
                  maxLength={100}
                />
              </t.introduce>
              <t.snsLink>
                <t.textName>링크걸기</t.textName>
                {/* {instaInput ? (
                  <>
                    <t.snsIcon src={IconInstagram} onClick={instalink} />
                  </>
                ) : (
                  <>
                    <t.snsIcon src={IconInstagram} onClick={instalink} />
                    <input type="text" />
                  </>
                )}
                {faceInput ? (
                  <>
                    <t.snsIcon src={IconFacebooke} onClick={facelink} />
                  </>
                ) : (
                  <>
                    <t.snsIcon src={IconFacebooke} onClick={facelink} />
                    <input type="text" />
                  </>
                )}
                {youInput ? (
                  <>
                    <t.snsIcon src={IconYoutube} onClick={youlink} />
                  </>
                ) : (
                  <>
                    <t.snsIcon src={IconYoutube} onClick={youlink} />
                    <input type="text" />
                  </>
                )} */}
              </t.snsLink>
              <t.buttonGroup>
                <button onClick={saveprofile}>저장</button>
                <button onClick={cancelprofile}>취소</button>
              </t.buttonGroup>
            </t.profileinfo>
          </t.myInformation>
        )}
        <InformationChart />
      </t.UserInfor>
    </>
  );
}
