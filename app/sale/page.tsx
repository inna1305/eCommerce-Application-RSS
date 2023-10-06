"use client";
import Header from "components/header/header";
import Footer from "components/footer/footer";
import {
  Box,
  Container,
  Typography,
  Stack,
  ThemeProvider,
} from "@mui/material";
import CustomBreadcrumbs from "components/breadcrumbs";
import { theme } from "../../theme";
import { useEffect } from "react";
import { CardsList } from "components/cards/cardsList";
import { loadProducts } from "app/redux/features/products/productsSlice";
import { useAppDispatch } from "app/redux/hooks/customHooks";
import { Provider } from "react-redux";
import { store } from "app/redux/store";

export default function Sale() {
  const dispatch = useAppDispatch();
  const HandleLoadingProducts = () => {
    dispatch(loadProducts());
  };
  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  return (
    <>
      <Provider store={store}>
        <Header />
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              backgroundColor: "#D8D8D8",
              fontFamily: "Montserrat",
              paddingTop: 7,
              paddingBottom: 7,
            }}
          >
            <Container maxWidth="xl">
              <Stack>
                <CustomBreadcrumbs />
                <Typography
                  variant="h3"
                  color="common.black"
                  sx={{ pt: 2, pb: 4 }}
                >
                  каталог specialized
                </Typography>
                <CardsList />
              </Stack>
            </Container>
          </Box>
        </ThemeProvider>
        <Footer />
      </Provider>
    </>
  );
}
