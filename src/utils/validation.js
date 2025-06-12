// 아이디 유효성 검사
export const validateUsername = (username) => {
  const regex = /^[a-zA-Z0-9]{8,20}$/;
  return regex.test(username);
};

// 비밀번호 유효성 검사
export const validatePassword = (password) => {
  const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  return regex.test(password);
};

// 닉네임 유효성 검사
export const validateNickname = (nickname) => {
  if (!nickname) return false;
  return nickname.length <= 20;
};

// 리뷰 내용 유효성 검사
export const validateReviewContent = (content) => {
  if (!content) return false;
  return content.length >= 10 && content.length < 100;
};

// 이메일 유효성 검사
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
