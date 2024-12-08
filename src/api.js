import { BASE_URL } from "./config";
export async function getDepartments(
  errorHandler = () => {},
  successHandler = () => {}
) {
  const url = new URL("university-entities/department", BASE_URL);
  const response = await fetch(url);
  const result = response.json();
  if (response.ok) {
    successHandler(result);
  } else {
    errorHandler(result);
    return;
  }
  return result;
}

export async function getFaculties(
  errorHandler = () => {},
  successHandler = () => {}
) {
  const url = new URL("university-entities/faculty", BASE_URL);
  const response = await fetch(url);
  const result = response.json();
  if (response.ok) {
    successHandler(result);
  } else {
    errorHandler(result);
    return;
  }
  return result;
}
export async function signupApi(
  data,
  errorHandler = () => {},
  successHandler = () => {}
) {
  const url = new URL("auth/signup", BASE_URL);
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (!response.ok) {
    errorHandler(result.message);
    return;
  }
  successHandler(result.message);
  return result;
}
export async function loginApi(
  data,
  errorHandler = () => {},
  successHandler = () => {}
) {
  const url = new URL("auth/login", BASE_URL);
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = response.json();
  if (!response.ok) {
    errorHandler(result.message);
    return;
  }
  successHandler(result.message);
  return result;
}
export async function getUserProfile(
  accessToken,
  errorHandler = () => {},
  successHandler = () => {}
) {
  const url = new URL("student/profile", BASE_URL);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = response.json();
  if (!response.ok) {
    errorHandler(result.message);
    return;
  }
  return result;
}
