import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

function CountryCard({ item }) {
  const filteredCountry = {
    name: item.name.common,
    currency: Object.values(item.currencies)
      .map((c) => c.name)
      .join(", "),
    capital: item.capital ? item.capital[0] : "Capital detail not available",
    languages: item.languages
      ? Object.values(item.languages).join(", ")
      : "languages not available",
    flag: `https://flagsapi.com/${item.cca2}/flat/64.png`,
  };
  const { favoriteList, setFavoriteList } = useContext(DataContext);

  const handelClick = (item) => {
    setFavoriteList([...favoriteList, item]);
  };
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      w="250px"
      boxShadow="md"
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Box>
        <Image
          src={filteredCountry.flag}
          alt={`Flag of ${filteredCountry.name}`}
          mb="4"
          borderRadius="md"
        />
        <Text fontSize="xl" fontWeight="bold" mb="2">
          {filteredCountry.name}
        </Text>
        <Text mb="2">{filteredCountry.currency}</Text>
        <Text mb="2">{filteredCountry.capital}</Text>
        <Text mb="4">{filteredCountry.languages}</Text>
      </Box>

      <Button backgroundColor={"black"} color={"white"} _hover={{ background: "#428dfc" }} onClick={() => handelClick(item)}>
        Add To Favorite
      </Button>
    </Box>
  );
}

export { CountryCard };