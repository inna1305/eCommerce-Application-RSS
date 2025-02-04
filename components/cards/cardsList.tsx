import CardItem from "./cardItem";
import { Grid } from "@mui/material";

import { useAppSelector } from "app/redux/hooks/customHooks";
import CatalogSkeletonLoading from "app/sale/loading";
import { cardSkeleton } from "app/sale/loading";

export const CardsList = () => {
  const products = useAppSelector((state) => state.product.list);
  const loading = useAppSelector((state) => state.product.status);

  return (
    <Grid container spacing={2}>
      {loading !== "products received"
        ? cardSkeleton.map((_, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <CatalogSkeletonLoading />
            </Grid>
          ))
        : products.map((product) => (
            <Grid key={product.key} item xs={12} sm={6} md={4} lg={3}>
              <CardItem {...product} key={product.key} />
            </Grid>
          ))}
    </Grid>
  );
};
