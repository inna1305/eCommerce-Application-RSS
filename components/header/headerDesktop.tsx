import NextLink from "next/link";
import Image from "next/image";
import Search from "../search";
import logoSVG from "../../public/assets/icons/logo.svg";
import cartSVG from "../../public/assets/icons/cart.svg";
import profileSVG from "../../public/assets/icons/profile.svg";
import wishlistSVG from "../../public/assets/icons/wishlist.svg";
import { Stack, Tab, Tabs, Link } from "@mui/material";
import localFont from "next/font/local";
import React, { useState } from "react";
import { IconSX, montserrat } from "components/stylesSX";
import { headerLinkSX, tabsHeader, headerLinkCategoriesSX } from "./headerSX";
import { categoriesHeader } from "components/categories";

const helveticaReg = localFont({
  src: "../../public/assets/fonts/helvetica.ttf",
});

export default function HeaderDesktop() {
  const [selectedTab, setSelectedTab] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: boolean) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Stack
        direction="row"
        padding="18px 0"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px solid rgba(255, 255, 255, 0.40)"
      >
        <Link href="/" component={NextLink}>
          <Image src={logoSVG} alt="logo" />
        </Link>
        <Search />

        <Stack direction="row" gap="40px">
          <Link
            href="/about-us"
            sx={headerLinkSX}
            className={montserrat.className}
            component={NextLink}
          >
            About us
          </Link>
          <Link
            href="/contacts"
            sx={headerLinkSX}
            component={NextLink}
            className={montserrat.className}
          >
            Contacts
          </Link>
        </Stack>
        <Stack direction="row" spacing={{ md: 2, xl: 4 }}>
          <Link href="/auth/login" sx={IconSX} component={NextLink}>
            <Image src={profileSVG} alt="button entrie" />
          </Link>
          <Link href="/wishlist" sx={IconSX} component={NextLink}>
            <Image src={wishlistSVG} alt="button wishlist" />
          </Link>
          <Link href="/cart" sx={IconSX} component={NextLink}>
            <Image src={cartSVG} alt="button cart" />
          </Link>
        </Stack>
      </Stack>

      <Tabs
        value={selectedTab}
        onChange={handleChange}
        sx={tabsHeader}
        TabIndicatorProps={{ style: { background: "transparent" } }}
      >
        {categoriesHeader.map((category, index) => (
          <Tab
            href={`/${category.toLowerCase()}`}
            key={`category_${index}`}
            label={category}
            sx={headerLinkCategoriesSX}
            className={helveticaReg.className}
          />
        ))}
      </Tabs>
    </>
  );
}
