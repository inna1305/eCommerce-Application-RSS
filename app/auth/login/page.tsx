"use client";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import {
  FormControl,
  InputLabel,
  FilledInput,
  FormHelperText,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginInputs } from "../../../types";
import { handleLoginUser } from "../../controllers/controller";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInputs>({
    mode: "onBlur",
  });

  const handleLogin = async (data: LoginInputs) => {
    handleLoginUser(data, router);
  };

  return (
    <Box component="form">
      <ToastContainer />
      <Container
        disableGutters={true}
        maxWidth="xs"
        sx={{
          maxWidth: "480px",
          width: "480px",
          height: "auto",
          alignItems: "center",
          justifyContent: "center",
          p: "40px 0",
        }}
      >
        <Stack spacing={3} sx={{ textAlign: "center" }}>
          <FormControl variant="filled">
            <InputLabel htmlFor="component-helper">E-mail</InputLabel>
            <FilledInput
              fullWidth
              autoComplete="current-email"
              {...register("email", {
                required: {
                  value: true,
                  message: "E-mail не может быть пустым",
                },
                validate: {
                  hasSpace: (value) =>
                    /^[^\s]+(\s+[^\s]+)*$/.test(value) ||
                    "Адрес электронной почты не должен содержать начальные или конечные пробелы",
                  hasDomain: (value) =>
                    /[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) ||
                    "Адрес электронной почты должен содержать доменное имя (например, example.com)",
                  hasDogSymbol: (value) =>
                    /@/.test(value) ||
                    "Адрес электронной почты должен содержать @",
                  hasIncorrect: (value) =>
                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                      value,
                    ) || "Некорректный e-mail",
                },
              })}
            />
            <FormHelperText error id="component-helper-text">
              {errors?.email && (
                <Typography variant="body1" component="span">
                  {errors.email?.message || "Error"}
                </Typography>
              )}
            </FormHelperText>
          </FormControl>

          <FormControl variant="filled">
            <InputLabel htmlFor="component-helper">Password</InputLabel>
            <FilledInput
              autoComplete="current-password"
              fullWidth
              aria-describedby="component-helper-text"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                validate: {
                  isUpper: (value) =>
                    /[A-ZА-Я]/.test(value) ||
                    "Пароль должен содержать хотя бы одну заглавную букву (A-Z, А-Я)",
                  isLower: (value) =>
                    /[a-zа-я]/.test(value) ||
                    "Пароль должен содержать хотя бы одну строчную букву (a-z, а-я)",
                  isNumber: (value) =>
                    /[0-9]/.test(value) ||
                    "Пароль должен содержать как минимум одну цифру (0-9)",
                  hasSpace: (value) =>
                    /^[-a-zA-Zа-яА-я0-9-()!@#$%^&*_]+(\s+[-a-zA-Zа-яА-я0-9-()!@#$%^&*_]+)*$/.test(
                      value,
                    ) ||
                    "Пароль не должен содержать начальные или конечные пробелы",
                  hasSpecial: (value) =>
                    /[!@#$%^&*_]/.test(value) ||
                    "Пароль должен содержать хотя бы один специальный символ (например, ! @ # $ % ^ & * _ )",
                },
                minLength: {
                  value: 8,
                  message: "Пароль должен содержать минимум 8 символов",
                },
                required: {
                  value: true,
                  message: "Пароль не может быть пустым",
                },
              })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error id="component-helper-text">
              {errors?.password && (
                <Typography variant="body1" component="span">
                  {errors.password?.message}
                </Typography>
              )}
            </FormHelperText>
          </FormControl>
          <Button
            type="submit"
            sx={{ p: 2, mt: "25px", backgroundColor: "#8933CC" }}
            variant="contained"
            fullWidth={true}
            color="secondary"
            className={montserrat.className}
            onClick={handleSubmit(handleLogin)}
          >
            Войти
          </Button>
          <Link href="/" component={NextLink} underline="none" color="inherit">
            Забыли пароль?
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
