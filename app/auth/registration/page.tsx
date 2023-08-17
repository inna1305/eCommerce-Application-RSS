"use client";
import { ReactElement } from "react";
import SocialNetwork from "components/socialNetwork/socialNetwork";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { apiRoot } from "../../../apiRoot";
type RegistrationInputs = {
  email: string;
  name: string;
  lastname: string;
  password: string;
};
export default function Registration(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationInputs>();

  const onSubmit = async (data: RegistrationInputs) => {
    console.log(data, errors);

    const createCustomer = () => {
      return apiRoot
        .customers()
        .post({
          body: {
            email: data.email,
            password: data.password,
          },
        })
        .execute();
    };
    createCustomer()
      .then(({ body }) => {
        console.log(body.customer.id);
        reset();
      })
      .catch(console.error);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          height: "auto",
          width: "auto",
          p: "10px 0",
        }}
      >
        <SocialNetwork description="зарегистрироваться через" />
      </Container>
      <Typography variant="subtitle2" color="inherit" sx={{ pl: 5, pr: 5 }}>
        Регистрация через профиль социальной сети выполняется очень быстро. Вам
        не придется запоминать новые пароли - никакой перегрузки для памяти. Не
        беспокойтесь, мы никогда не передадим ваши данные третьим лицам и не
        будем публиковать информацию от вашего имени
      </Typography>
      <Typography variant="h5" color="inherit" sx={{ pl: 0.5, pr: 0.5 }}>
        или зарегистрируйся с помощью электронной почты
      </Typography>
      <Container
        maxWidth="xs"
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Box component="form" sx={{ p: "20px" }}>
          <TextField
            id="E-mail"
            label="E-mail"
            variant="filled"
            fullWidth={true}
            helperText="Мы вышлем на него подтверждение заказа"
            autoComplete="email"
            placeholder="example@email.ru"
            margin="normal"
            {...register("email", { required: true })}
          />
          <TextField
            id="name"
            label="Имя"
            variant="filled"
            fullWidth={true}
            autoComplete="given-name"
            margin="normal"
            {...register("name", { required: true })}
          />
          <TextField
            id="lastname"
            label="Фамилия"
            variant="filled"
            fullWidth={true}
            autoComplete="family-name"
            margin="normal"
            {...register("lastname", { required: true })}
          />
          <TextField
            id="password"
            label="Пароль"
            variant="filled"
            fullWidth={true}
            type="password"
            autoComplete="new-password"
            helperText="Должно быть 10 символов или более"
            margin="normal"
            {...register("password", { required: true })}
          />
          <Button
            sx={{ p: 2 }}
            variant="contained"
            fullWidth={true}
            color="secondary"
            onClick={handleSubmit(onSubmit)}
          >
            Зарегистрироваться
          </Button>
        </Box>
      </Container>
    </Stack>
  );
}
