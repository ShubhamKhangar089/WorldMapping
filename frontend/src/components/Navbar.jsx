import { Box, Flex, Button, useToast, useDisclosure, Image } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../util/vars";
import { HStack, IconButton, Stack } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import img from '../Images/worldlogo.jpg'
const Navbar = () => {
  const Links = [
    { name: "Country", path: "/" },
    { name: "Favourite", path: "/favorite" },
    { name: "History", path: "/history" },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      const result = await response.json();
      setAuth({
        isAuth: false,
        username: "",
        accessToken: "",
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      toast({
        title: `${result.message}`,
        status: "success",
        duration: 4000,
        position: "top-right",
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: `${error.message}`,
        status: "error",
        duration: 4000,
        position: "top-right",
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Box
        bg={"black"}
        px={{ base: 4, md: 16 }}
        borderBottom={"1px solid gray"}
        position={"fixed"}
        top={0}
        w={"100%"}
        color={"white"}
        zIndex={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Box
      onClick={() => {
        navigate("/");
      }}
      _hover={{ cursor: "pointer" }}
    >
      <Image src={img} spacing={16} width={"50px"} height={"50px"} borderRadius={"50%"}alt="WorldApp Logo" />
    </Box>

    <HStack as={"nav"} spacing={16} display={{ base: "none", md: "flex" }}>
      {Links.map((link) => (
        <Box
          key={link.name}
          as={NavLink}
          to={link.path}
          _hover={{ color: "#428dfc" }}
          sx={{ textDecoration: "none" }}
        >
          {link.name}
        </Box>
      ))}
    </HStack>
          {/* <HStack as={"nav"} spacing={16}  display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.name} to={link.path} _hover={{ color: "#428dfc" }} >
                {link.name}
              </NavLink>
            ))}
          </HStack> */}
          <Flex gap={{ base: "5px", md: "10px" }}>
            {auth.isAuth ? (
              <Button
              bg={"white"}
              _hover={{ bg: "#428dfc" }}
              color={"black"}
                size={"sm"}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  bg={"white"}
                  _hover={{ bg: "#428dfc" }}
                  color={"black"}
                  size={"sm"}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
                <Button
                  bg={"white"}
                  _hover={{ bg: "#428dfc" }}
                  color={"black"}
                  size={"sm"}
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} to={link.path}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export { Navbar };
