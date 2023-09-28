import { HttpErrorType } from "@commercetools/sdk-client-v2";
import { getAnonymousApiRoot, getAuthApiRoot } from "../../apiRoot";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { encodeToBase64 } from "../../helpers/encodeToBase64";
import process from "process";
import { LoginInputs, RegistrationInputs } from "../../types";
import { notify } from "../../components/notify";

export const handleCustomerCreating = async (
  data: RegistrationInputs,
  redirectFunc: () => void,
) => {
  return getAnonymousApiRoot()
    .me()
    .signup()
    .post({
      body: {
        email: data.email,
        password: data.password,
      },
    })
    .execute()
    .then(() => {
      notify("Регистрация выполнена успешно!", "success");
      setTimeout(() => {
        redirectFunc();
      }, 2000);
    })
    .catch((error) => handleRegistrationError(error));
};

export const handleRegistrationError = (error: HttpErrorType) => {
  //todo проверить тип ошибки
  if (error.statusCode === 400) {
    notify("Такой пользователь уже существует!", "error");
    console.error(
      "Ошибка регистрации (400). Такой пользователь уже существует!",
    );
  } else {
    console.error("An unknown error occurred:", error);
    notify("Ошибка регистрации", "error");
  }
};

export const handleLoginUser = async (
  data: LoginInputs,
  router: AppRouterInstance,
) => {
  const apiRoot = getAuthApiRoot(data.email, data.password);
  return apiRoot
    .me()
    .login()
    .post({
      body: {
        email: data.email,
        password: data.password,
      },
    })
    .execute()
    .then(() => {
      handleAccessToken(data.email, data.password);
      notify("Вход выполнен успешно!", "success");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    })
    .catch((error: HttpErrorType) => {
      if (
        error.message ==
        "Customer account with the given credentials not found."
      ) {
        console.log(error.statusCode);
        notify("Такой пользователь не найден!", "error");
        console.error("Ошибка входа (400) Такой пользователь не найден!");
      } else {
        notify("Ошибка входа", "error");
        console.error("An unknown error occurred:", error);
      }
    });
};

export const handleAccessToken = async (login: string, password: string) => {
  const myHeaders = new Headers();
  const value = encodeToBase64(
    process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET,
  );
  myHeaders.append("Authorization", `Basic ${value}`);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "password");
  urlencoded.append("username", login);
  urlencoded.append("password", password);
  // myHeaders.append("Content-Length", urlencoded.size.toString());

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  fetch(
    "https://auth.europe-west1.gcp.commercetools.com/oauth/specialized-api/customers/token",
    requestOptions,
  )
    .then((response) => response.text())
    .then((result) => {
      const objResponse = JSON.parse(result);
      localStorage.setItem("access-token", objResponse["access_token"]);
      localStorage.setItem("refresh-token", objResponse["refresh_token"]);
    })
    .catch((error) => console.log("error", error));
};

//const handleUserErrors = (error: HttpErrorType) => {
// если токен не найден, предупреждение пользователю (всплывающее окно), переход на страницу логина

export const createFilters = (categories: string) => {
  switch (categories) {
    case "mountain":
      return 'categories.id: "ad61e3bc-ab60-4d0b-bbc6-27c1979849e6"';
    case "active":
      return 'categories.id: "ae38c9e1-d8f8-432c-985e-4212b15f2c86"';
    case "kids":
      return 'categories.id: "ed96a7ee-a86b-410d-a753-f0145657b8f9"';
    case "city":
      return 'categories.id: "12e8730b-cc80-410b-8f85-ab6c6d182256"';
    case "accessories":
      return 'categories.id: "d288c419-ba2b-4e37-a9f8-92651cd9249b"';
  }
};

export const createQueryArgs = (categories: string) => {
  return {
    filter: createFilters(categories),
  };
};
