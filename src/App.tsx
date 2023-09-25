import {
  ColorSchemeProvider,
  MantineProvider,
  AppShell,
  BackgroundImage,
} from "@mantine/core";
import MainPage from "./MainPage";
import Background from "../public/magic_8_ball.png";
import BackgroundResult from "../public/magic_8_ball_result.png";
import { useRecoilValue } from "recoil";
import { resultState } from "./atoms/resultAtoms";

export default function App() {
  const state = useRecoilValue(resultState);

  return (
    <ColorSchemeProvider colorScheme={"dark"} toggleColorScheme={() => {}}>
      <MantineProvider
        theme={{
          colorScheme: "dark",
          fontFamily: "Sawarabi Mincho, serif",
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell
          padding="md"
          header={<></>}
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
              // backgroundImage: Background,
              padding: 0,
              minHeight: "initial",
              display: "flex",
              justifyContent: "space-around",
            },
          })}
        >
          {state === "QUESTION" || state === 'LOADING' ? (
            <BackgroundImage src={Background} radius={0} w="100vw" h="100vh"
              sx={{
                animation: state === 'LOADING' ? 'image_blur 3s infinite' : undefined, 
              }}
            >
              <MainPage />
            </BackgroundImage>
          ) : (
            <BackgroundImage
              src={BackgroundResult}
              radius={0}
              w="100vw"
              h="100vh"
            >
              <MainPage />
            </BackgroundImage>
          )}
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
