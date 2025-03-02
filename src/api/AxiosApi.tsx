import JwtAxios from "./JwtAxios";
import { AxiosResponse } from "axios";
import axios from "axios";
import Common from "../util/Common";
import { API_BASE_URL } from "../util/Common";

interface LoginRequest {
  userId: string;
  password?: string;
}

interface SignupRequest {
  userId: string;
  password?: string;
  name: string;
  email: string;
  nickname: string;
  imgPath?: string;
  socialId?: string; // 소셜 ID는 선택적 속성
  sso?: string; // SSO 정보는 선택적 속성
}

interface MemberReqDto {
  name: string;
  email: string;
}

const AxiosApi = {
  // 로그인
  // 아직 잘 몰라서 AxiosResponse<any>로 설정함
  login: async (
    userId: string,
    password: string
  ): Promise<AxiosResponse<any>> => {
    const loginRequest: LoginRequest = {
      userId: userId,
      password: password,
    };
    console.log("로그인 요청:", loginRequest); // 로그인 요청 정보 출력

    return await JwtAxios.post("/auth/login", loginRequest);
  },
  // 회원가입
  signup: async (signupRequest: SignupRequest): Promise<AxiosResponse<any>> => {
    try {
      const member: SignupRequest = {
        // Use SignupRequest interface
        userId: signupRequest.userId,
        password: signupRequest.password,
        name: signupRequest.name,
        email: signupRequest.email,
        nickname: signupRequest.nickname,
        imgPath: signupRequest.imgPath,
        socialId: signupRequest.socialId,
        sso: signupRequest.sso,
      };
      console.log("AxiosApi - 회원가입 요청 데이터:", signupRequest); // 추가 확인

      return await JwtAxios.post("/auth/signup", signupRequest);
    } catch (error: any) {
      console.error("Signup Error: ", error);
      throw error;
    }
  },
  // 멤버 정보 조회
  memberInfo: async (userId?: string) => {
    console.log(JwtAxios.get(`/member/get-info/${userId}`));
    return JwtAxios.get(`/member/get-info/${userId}`);
  },
  // 멤버 조회 (전체)
  memberList: async (
    page = 1,
    size = 10,
    searchType = "NAME",
    searchValue = "",
    type: boolean | null = null,
    sort = "idDesc"
  ) => {
    try {
      // const response = await JwtAxios.get("/admin/member-list", {
      //   params: { page, size, searchType, searchValue },
      // });
      // 토큰, 관리자 구현전까지 그냥 다이렉트 조회
      const response = await axios.get(
        `${Common.FINAL_DOMAIN}/admin/member-list`,
        {
          params: { page, size, searchType, searchValue, type, sort },
        }
      );
      return response.data;
    } catch (error) {
      console.error("멤버 리스트 조회 중 오류 발생:", error);
      throw error;
    }
  },
  // 신고 조회 (전체)
  reportList: async (
    page = 1,
    size = 10,
    reportType = "MEMBER",
    type = "WAIT",
    sort = "idAsc"
  ) => {
    try {
      // const response = await JwtAxios.get(`/admin/report-list`, {
      //   params: { page, size, reportType },
      // });
      // 토큰, 관리자 구현전까지 그냥 다이렉트 조회
      const response = await axios.get(
        `${Common.FINAL_DOMAIN}/admin/report-list`,
        {
          params: { page, size, reportType, type, sort },
        }
      );
      return response.data;
    } catch (error) {
      console.error("신고 리스트 조회 중 오류 발생:", error);
      throw error;
    }
  },
  // 신고 처리
  reportProcess: async (
    reportId: number = 1,
    state: boolean = true,
    userId: number | null = null,
    day: number = 1,
    reason: string = "",
    diaryId: string | null = null,
    reviewId: number | null = null
  ) => {
    try {
      const response = await axios.post(
        `${Common.FINAL_DOMAIN}/admin/report-manage`,
        {
          reportId,
          state,
          ...(userId !== null ? { userId } : {}),
          ...(day !== null ? { day } : {}),
          reason,
          ...(diaryId !== null ? { diaryId } : {}),
          ...(reviewId !== null ? { reviewId } : {}),
        },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "신고 처리 실패:",
          error.response?.status,
          error.response?.data
        );
      } else {
        console.error("신고 처리 실패:", error);
      }
      throw error;
    }
  },
  // 유저 정지
  banMember: async (id = 1, day = 0, reason = "") => {
    try {
      const response = await axios.post(
        `${Common.FINAL_DOMAIN}/admin/member-ban`,
        { id, day, reason }
      );
      return response.data;
    } catch (error) {
      console.error("유저 정지 실패:", error);
      throw error;
    }
  },
  // 아이디 중복 체크
  checkMemberIdExists: async (userId: string) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/member/idExists/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("아이디 중복 확인 에러:", error);
      return true;
    }
  },
  // 이메일 중복 체크
  checkMemberEmailExists: async (email: string) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/member/emailExists/${email}`
      );
      return response.data;
    } catch (error) {
      console.error("이메일 중복 확인 에러:", error);
      return true;
    }
  },
  // 닉네임 중복 체크
  checkMemberNicknameExists: async (nickname: string) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/member/nicknameExists/${nickname}`
      );
      return response.data;
    } catch (error) {
      console.error("닉네임 중복 확인 에러:", error);
      return true;
    }
  },
  // 아이디 찾기
  findMemberId: async (name: string, email: string): Promise<string | null> => {
    try {
      const requestData: MemberReqDto = { name, email };
      const response: AxiosResponse<string> = await axios.post(
        `${API_BASE_URL}/member/find-id`,
        requestData
      );
      return response.data; // 성공 시 userId 반환
    } catch (error) {
      console.error("아이디 찾기 에러:", error);
      return null;
    }
  },
  // 비밀번호 찾기
  findMemberPw: async (userId: string, email: string) => {
    const memberInfo = {
      userId: userId,
      email: email,
    };
    return await axios.post(`${API_BASE_URL}/member/find-pw`, memberInfo);
  },
  // 비밀번호 확인
  checkMemberPw: async (userId: string, password: string) => {
    const member = {
      userId: userId,
      password: password,
    };
    return await JwtAxios.put(`${API_BASE_URL}/member/check-pw`, member);
  },
  // 비밀번호 변경
  changeMemberPw: async (userId: string, password: string) => {
    const member = {
      userId: userId,
      password: password,
    };
    return await JwtAxios.put(`${API_BASE_URL}/member/change-pw`, member);
  },
  // 회원정보 수정(이름, 닉네임)
  updateMember: async (
    userId: string,
    editName: string,
    editNickname: string
  ) => {
    const params = {
      userId: userId,
      name: editName,
      nickname: editNickname,
    };
    return await JwtAxios.put(`${API_BASE_URL}/auth/update`, params);
  },
  changeMemberProfile: async (userId: string, profileName: string) => {
    const params = {
      userId: userId,
      imgPath: profileName,
    };
    return await JwtAxios.put(`${API_BASE_URL}/member/change-profile`, params);
  },
};

export default AxiosApi;
